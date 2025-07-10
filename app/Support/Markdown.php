<?php

namespace App\Support;

use Illuminate\Support\Str;
use League\HTMLToMarkdown\Converter\ConverterInterface;
use League\HTMLToMarkdown\ElementInterface;
use League\HTMLToMarkdown\HtmlConverter;

class Markdown
{
    public static function fromJsx(string $jsx): string
    {
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
        $currentCodeBlockId = '';
        $tabbedCodeBlocks = [];
        $codeBlocks = [];

        $page = str($jsx)
            ->after('return (')
            ->beforeLast(')')
            ->replace(array_keys($replace), array_values($replace))
            ->replaceMatches('/className=\{[^}]*\}/', '')
            ->explode(PHP_EOL)
            ->map(function ($line) use (&$codeBlockType, &$inFencedCodeBlock, &$currentCodeBlockId, &$tabbedCodeBlocks, &$codeBlocks) {
                if (str_contains($line, '<TabbedCode')) {
                    $codeBlockType = 'tabbedcode';

                    $currentCodeBlockId = Str::random(10);
                    $tabbedCodeBlocks[$currentCodeBlockId] = $line;

                    return '<p><tabbedcode>' . $currentCodeBlockId . '</tabbedcode></p>';
                }

                if (str_contains($line, '<CodeBlock')) {
                    $codeBlockType = 'codeblock';

                    $currentCodeBlockId = Str::random(10);
                    $codeBlocks[$currentCodeBlockId] = $line;

                    return '<p><codeblock>' . $currentCodeBlockId . '</codeblock></p>';
                }

                if ($codeBlockType === null) {
                    return str($line)->replaceMatches('/\s+/', ' ')->replaceMatches('/\{\'<(.+)>\'\}/', '&lt;$1&gt;')->trim()->toString();
                }

                if (str_contains($line, '`')) {
                    $inFencedCodeBlock = !$inFencedCodeBlock;
                }

                if ($codeBlockType === 'tabbedcode') {
                    $tabbedCodeBlocks[$currentCodeBlockId] .= $line;
                } else {
                    $codeBlocks[$currentCodeBlockId] .= $line;
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
        $converter->getEnvironment()->addConverter(new class($tabbedCodeBlocks, $codeBlocks) implements ConverterInterface {
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

        return $converter->convert($page);
    }
}
