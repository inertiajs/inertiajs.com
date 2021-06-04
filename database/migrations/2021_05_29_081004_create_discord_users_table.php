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
            $table->unsignedBigInteger('discord_id')->index();
            $table->string('nickname');
            $table->string('access_token')->nullable()->default(null);
            $table->string('refresh_token')->nullable()->default(null);
            $table->string('github_account')->nullable()->default(null);
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
