<?php

namespace App\Console\Commands;

use App\Support\Markdown;
use DOMDocument;
use DOMNode;
use Illuminate\Console\Command;

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

        $markdown = Markdown::fromJsx($page);

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
                        $url = url($url) . '.md';
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
