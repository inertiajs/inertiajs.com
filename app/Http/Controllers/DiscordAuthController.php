<?php

namespace App\Http\Controllers;

use App\Jobs\UpdateDiscordUserConnections;
use App\Models\DiscordUser;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

class DiscordAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        abort_if($request->has('error'), 400, $request->get('error_description'));

        try {
            $credentials = Socialite::driver('discord')->user();
        } catch (InvalidStateException | ClientException $exception) {
            return redirect()->route('discord.auth');
        }

        try {
            $user = DiscordUser::where('discord_id', $credentials->id)->firstOrFail();
        } catch (ModelNotFoundException $exception) {
            $user = DiscordUser::make(['discord_id' => $credentials->id]);
        }

        $user->nickname = $credentials->getNickname();
        $user->access_token = $credentials->token;
        $user->refresh_token = $credentials->refreshToken;
        $user->save();

        $this->dispatch(new UpdateDiscordUserConnections($user));

        return redirect()->to('https://discord.com/channels/592327939920494592/592327939920494594');
    }

    /**
     * Display the specified resource.
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function show()
    {
        return Socialite::driver('discord')
            ->setScopes(['identify', 'connections'])
            ->redirect();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
