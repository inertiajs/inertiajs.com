<?php

namespace App\Http\Controllers\Api;

use App\Events\UserStartedSponsoring;
use App\Events\UserStoppedSponsoring;
use App\Http\Controllers\Controller;
use App\Models\Sponsor;
use App\Models\User;
use Illuminate\Http\Request;

class GithubSponsorshipWebhookController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#sponsorship
     */
    public function store(Request $request)
    {
        $sponsor = Sponsor::firstOrNew([
            'github_api_id' => $request->input('sponsorship.sponsor.id'),
        ]);

        $sponsor->has_expired = $request->input('action') === 'cancelled';
        $sponsor->save();

        if (! $user = User::where('sponsor_id', $sponsor->id)->first()) {
            return response()->noContent();
        }

        if ($sponsor->has_expired) {
            UserStoppedSponsoring::dispatch($user);
        } else {
            UserStartedSponsoring::dispatch($user);
        }

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
