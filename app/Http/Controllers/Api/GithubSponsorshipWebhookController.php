<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GithubWebhookRequest;
use App\Jobs\SynchronizeSponsorStatus;
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
     * @param GithubWebhookRequest $request
     * @return \Illuminate\Http\Response
     * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#sponsorship
     */
    public function store(GithubWebhookRequest $request)
    {
        $action = $request->input('action');

        abort_if($action !== 'created' && $action !== 'cancelled', 422, 'Unsupported Hook Type.');

        $hasStartedSponsoring = $action === 'created';
        $isOneTimeSponsorship = $request->input('sponsorship.tier.is_one_time');

        $sponsor = Sponsor::firstOrNew([
            'github_api_id' => $request->input('sponsorship.sponsor.id'),
        ]);

        if (! $hasStartedSponsoring && ! $sponsor->exists) {
            return response()->noContent();
        }

        if ($hasStartedSponsoring && $isOneTimeSponsorship) {
            $sponsor->expires_at = now()->addMonth();
        } elseif ($hasStartedSponsoring) {
            $sponsor->expires_at = null;
        } else {
            $sponsor->expires_at = now();
        }

        $sponsor->save();

        if (! $hasStartedSponsoring) {
            $sponsor->users->each(fn (User $user) => SynchronizeSponsorStatus::dispatch($user));
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
