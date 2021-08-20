<?php

namespace App\Http\Controllers;

use App\Models\GithubUser;
use GuzzleHttp\Exception\BadResponseException;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

class GithubAuthController extends Controller
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        abort_if($request->has('error'), 400, $request->get('error_description'));

        try {
            $credentials = Socialite::driver('github')->user();
        } catch (InvalidStateException | BadResponseException $exception) {
            return redirect()->route('github.auth');
        }

        $user = GithubUser::firstOrNew(['github_api_id' => $credentials->id]);
        $user->github_api_login = $credentials->getNickname();
        $user->github_api_access_token = $credentials->token;
        $user->save();

        return redirect()->to('https://inertiajs.com');
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return Socialite::driver('github')
            ->setScopes(['read:org'])
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
