<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Str;
use LogicException;
use Storage;

class InstallSponsorsContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inertia-sponsors:install';

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
        $this->ensureVendorPackageInstalled();
        $this->prepareDisk();

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
     * Ensures that this command is only ran when the package is installed.
     */
    protected function ensureVendorPackageInstalled(): void
    {
        $vendorPath = base_path('vendor/inertiajs/inertiajs.com-sponsors/src');

        if (! file_exists($vendorPath)) {
            throw new LogicException('Sponsors content package is not installed.');
        }
    }
}
