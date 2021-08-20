<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscordUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discord_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('discord_api_id')->index();
            $table->string('discord_api_access_token')->nullable()->default(null);
            $table->string('discord_api_refresh_token')->nullable()->default(null);
            $table->string('discord_api_nickname');
            $table->string('github_login')->nullable()->default(null);
            $table->boolean('has_sponsor_role')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discord_users');
    }
}
