<?php

namespace App\Console\Commands;

use DOMDocument;
use DOMNode;
use Illuminate\Console\Command;
use League\HTMLToMarkdown\Converter\ConverterInterface;
use League\HTMLToMarkdown\ElementInterface;
use League\HTMLToMarkdown\HtmlConverter;
use Illuminate\Support\Str;
use SebastianBergmann\CodeCoverage\Report\PHP;

class GenerateLlmsTxt extends Command
{
    protected $signature = 'generate:llms-txt';

    protected $description = 'Generate llms.txt and llms-full.txt files';

    protected array $pages = [];

    protected array $full = [];

    protected array $tabbedCodeBlocks = [];

    protected array $codeBlocks = [];

    protected string $currentCodeBlockId = '';

    public function handle()
    {
        $this->writeNav();

        foreach ($this->pages as $page) {
            $this->writePage($page);
        }

        file_put_contents(
            public_path('llms-full.txt'),
            collect(explode(PHP_EOL, implode(PHP_EOL, $this->full)))->map(fn($line) => trim($line))->implode(PHP_EOL),
        );
    }

    public function writePage(string $url)
    {
        $url = ltrim($url, '/');

        if ($url === '') {
            return;
        }

        $page = file_get_contents(resource_path('js/Pages/' . $url . '.jsx'));

        $replace = [
            '<>' => '',
            '</>' => '',
            "{' '}" => ' ',
            '<Link' => '<a',
            '</Link>' => '</a>',
            '<Notice>' => '<p>',
            '</Notice>' => '</p>',
        ];

        $codeBlockType = null;
        $inFencedCodeBlock = false;

        $page = str($page)
            ->after('return (')
            ->beforeLast(')')
            ->replace(array_keys($replace), array_values($replace))
            ->replaceMatches('/className=\{[^}]*\}/', '')
            ->explode(PHP_EOL)
            ->map(function ($line) use (&$codeBlockType, &$inFencedCodeBlock) {
                if (str_contains($line, '<TabbedCode')) {
                    $codeBlockType = 'tabbedcode';

                    $this->currentCodeBlockId = Str::random(10);
                    $this->tabbedCodeBlocks[$this->currentCodeBlockId] = $line;

                    return '<p><tabbedcode>' . $this->currentCodeBlockId . '</tabbedcode></p>';
                }

                if (str_contains($line, '<CodeBlock')) {
                    $codeBlockType = 'codeblock';

                    $this->currentCodeBlockId = Str::random(10);
                    $this->codeBlocks[$this->currentCodeBlockId] = $line;

                    return '<p><codeblock>' . $this->currentCodeBlockId . '</codeblock></p>';
                }

                if ($codeBlockType === null) {
                    return str($line)->replaceMatches('/\s+/', ' ')->replaceMatches('/\{\'<(.+)>\'\}/', '&lt;$1&gt;')->trim()->toString();
                }

                if (str_contains($line, '`')) {
                    $inFencedCodeBlock = !$inFencedCodeBlock;
                }

                try {
                    if ($codeBlockType === 'tabbedcode') {
                        $this->tabbedCodeBlocks[$this->currentCodeBlockId] .= $line;
                    } else {
                        $this->codeBlocks[$this->currentCodeBlockId] .= $line;
                    }
                } catch (\Exception $e) {
                    dd($this->tabbedCodeBlocks, $this->codeBlocks, $codeBlockType, $line);
                }

                if ($inFencedCodeBlock) {
                    // Don't look for ending tag inside fenced code blocks
                    return null;
                }

                if (str_contains($line, '/>')) {
                    $codeBlockType = null;
                }

                return null;
            })
            ->filter(fn($line) => $line !== null && trim($line) !== '')
            ->implode(PHP_EOL);

        $converter = new HtmlConverter(['header_style' => 'atx', 'hard_break' => true, 'remove_nodes' => 'div']);
        $converter->getEnvironment()->addConverter(new class($this->tabbedCodeBlocks, $this->codeBlocks) implements ConverterInterface {
            public function __construct(protected array $tabbedBlocks, protected array $codeBlocks)
            {
                //
            }

            public function convert(ElementInterface $node): string
            {
                if ($node->getTagName() === 'tabbedcode') {
                    $content = $this->tabbedBlocks[$node->getValue()];

                    return str($content)->after('examples={')->beforeLast('}')->explode('`,')->map(function ($example) {
                        if (!str_contains($example, 'code:')) {
                            return null;
                        }

                        preg_match("/language: '([^']+)'/", $example, $matches);
                        $language = $matches[1];

                        preg_match("/name: '([^']+)'/", $example, $matches);
                        $name = $matches[1];

                        preg_match("/description: '([^']+)'/m", $example, $matches);
                        $description = $matches[1] ?? null;

                        $code = str($example)->after('dedent`')->beforeLast('`,')->trim()->replaceMatches('/\s{7,}/', PHP_EOL)->toString();

                        return sprintf("%s%s:\n\n```%s\n%s\n```", $name, $description ? ' (' . $description . ')' : '', $language, $code);
                    })->filter()->implode(PHP_EOL . PHP_EOL);
                }

                $content = $this->codeBlocks[$node->getValue()];
                preg_match('/language="([^"]+)"/', $content, $matches);
                $language = $matches[1];
                preg_match('/dedent`([^`]+)`/', $content, $matches);
                $code = str($matches[1])->trim()->replaceMatches('/\s{7,}/', PHP_EOL)->toString();

                return sprintf("```%s\n%s\n```", $language, $code);
            }

            public function getSupportedTags(): array
            {
                return [
                    'tabbedcode',
                    'codeblock',
                ];
            }
        });

        $markdown = $converter->convert($page);

        $this->full[] = $markdown;
    }

    public function writeNav()
    {
        $nav = file_get_contents(resource_path('js/Components/Nav.jsx'));

        $nav = str($nav)
            ->afterLast('return (')
            ->beforeLast(')')
            ->replaceMatches('/className=\{[^}]*\}/', '')
            ->replace(['<Link', '</Link>'], ['<a', '</a>'])
            ->toString();

        $doc = new DOMDocument();

        libxml_use_internal_errors(true);
        $doc->loadHTML($nav);
        libxml_clear_errors();

        $md = [];

        $inList = false;

        $walk = function (DOMNode $node) use (&$walk, &$md, &$inList) {
            if ($node->nodeType === XML_ELEMENT_NODE) {
                if ($inList === false && $node->nodeName === 'ul') {
                    $inList = true;
                }

                if ($node->nodeName === 'a') {
                    $url = $node->attributes->getNamedItem('href')->nodeValue;

                    if (!str_starts_with($url, 'http')) {
                        $this->pages[] = $url;
                        $url = url($url);
                        $md[] = sprintf('- [%s](%s)', trim($node->textContent), $url);
                    }
                }

                if ($inList === true && $node->nodeName === 'div') {
                    $md[] = '';
                    $md[] = '## ' . trim($node->textContent);
                }
            }

            foreach ($node->childNodes as $child) {
                $walk($child);
            }
        };

        $walk($doc->documentElement);

        file_put_contents(public_path('llms.txt'), implode(PHP_EOL, $md));

        return Command::SUCCESS;
    }
}
