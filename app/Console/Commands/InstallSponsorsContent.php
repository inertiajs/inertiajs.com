<?php

namespace App\Console\Commands;

use Composer\InstalledVersions;
use Illuminate\Console\Command;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use LogicException;
use RuntimeException;
use Symfony\Component\Process\Process;

class InstallSponsorsContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inertia-sponsors:install {--from-autoloader}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Copies the sponsor-only front-end assets into the application.';

    /**
     * @var Filesystem
     */
    protected Filesystem $disk;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->prepareDisk();

        // We only want to require-install automatically on production.
        // Otherwise, we'll still allow the user to install it manually.
        // Until then, we'll install some stubs to make the app compile.
        if ($this->option('from-autoloader') && ! App::environment('production')) {
            $this->createStubComponent('resources/js/Components/Sponsors/SponsorNav.js', 'SponsorNav');

            return 0;
        }

        $this->requirePrivateComposerPackage();
        $this->ensureVendorPackageInstalled();

        $this->copyDirectory('Components', 'Components/Sponsors');
        $this->copyDirectory('Pages', 'Pages/sponsors');

        return 0;
    }

    /**
     * Prepare a temporary disk that represents the application folder.
     * Used to copy assets from the Vendor folder into the Application.
     */
    protected function prepareDisk(): void
    {
        $diskName = 'inertia_sponsors_install_command_base_path_disk';

        config([
            "filesystems.disks.$diskName" => [
                'driver' => 'local',
                'root' => base_path(),
            ],
        ]);

        $this->disk = Storage::disk($diskName);
    }

    /**
     * Copies a Sponsors-only vendor directory into the resources/js folder.
     *
     * @param string $source
     * @param string $target
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    protected function copyDirectory(string $source, string $target): void
    {
        $sourcePath = 'vendor/inertiajs/inertiajs.com-sponsors/src/'.$source;
        $targetPath = 'resources/js/'.$target;

        if (! $this->disk->exists($sourcePath)) {
            throw new LogicException("Source [$source] does not exist at path [$sourcePath].");
        }

        if ($this->disk->exists($targetPath)) {
            $this->disk->deleteDirectory($targetPath);
        }

        $this->disk->makeDirectory($targetPath);

        foreach ($this->disk->allFiles($sourcePath) as $sourceFile) {
            $relativeFilePath = Str::after($sourceFile, "$source/");
            $targetFile = $targetPath.'/'.$relativeFilePath;

            $this->disk->put($targetFile, $this->disk->get($sourceFile));
        }
    }

    /**
     * Configure our composer.json to require the sponsors package.
     */
    protected function requirePrivateComposerPackage(): void
    {
        if ($this->runConsoleCommand(['composer', 'config', 'repositories.sponsors'])) {
            $this->runConsoleCommand(['composer', 'config', 'repositories.sponsors', 'vcs', 'https://github.com/inertiajs/inertiajs.com-sponsors.git']);
        }

        if (! in_array("inertiajs/inertiajs.com-sponsors", InstalledVersions::getInstalledPackages())) {
            $this->runConsoleCommand(['composer', 'require', 'inertiajs/inertiajs.com-sponsors'], true);
        }
    }

    /**
     * Ensures that this command is only ran when the package is installed.
     */
    protected function ensureVendorPackageInstalled(): void
    {
        $vendorPath = base_path('vendor/inertiajs/inertiajs.com-sponsors/src');

        if (! file_exists($vendorPath)) {
            throw new LogicException('Sponsors content package is not installed.');
        }
    }

    /**
     * Executes a console command.
     *
     * @param  array  $command
     * @param  bool  $throws
     * @return int
     */
    protected function runConsoleCommand(array $command, bool $throws = false): int
    {
        $exitCode = (new Process($command, base_path(), ['COMPOSER_MEMORY_LIMIT' => '-1']))
            ->setTimeout(null)
            ->run(function ($type, $output) {
                if ($this->option('verbose')) {
                    $this->output->write($output);
                }
            });

        if ($exitCode !== 0 && $throws) {
            throw new RuntimeException('Error running command: '.implode(' ', $command));
        }

        return $exitCode;
    }

    /**
     * Create a stub component at the given path.
     *
     * @param  string  $path
     * @param  string  $name
     */
    protected function createStubComponent(string $path, string $name = 'SponsorContent'): void
    {
        $stub = "export const " . $name . " = () => <div className=\"text-orange-500\">Sponsors content unavailable</div>";

        if (! $this->disk->exists($path)) {
            $this->disk->put($path, $stub);
        }
    }
}
