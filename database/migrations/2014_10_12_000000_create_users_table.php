<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sponsor_id')->nullable()->default(null);
            $table->unsignedBigInteger('github_api_id');
            $table->string('github_api_login');
            $table->string('github_api_access_token');
            $table->unsignedBigInteger('discord_api_id')->nullable();
            $table->string('discord_api_nickname')->nullable();
            $table->string('discord_api_access_token')->nullable();
            $table->string('discord_api_refresh_token')->nullable();
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
        Schema::dropIfExists('users');
    }
}
