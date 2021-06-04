<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GithubWebhookRequest;
use App\Jobs\ProcessSponsorshipChanges;
use App\Models\GithubSponsor;
use Illuminate\Support\Carbon;

class GithubWebbhooksController extends Controller
{
    /**
     * @param GithubWebhookRequest $request
     * @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#sponsorship
     */
    public function sponsorship(GithubWebhookRequest $request)
    {
        $action = $request->input('action', 'cancelled');

        $sponsor = GithubSponsor::firstOrNew(
            ['login' => $request->input('sponsorship.sponsor.login')],
            ['is_organization' => $request->input('sponsorship.sponsor.type') === 'Organization'],
        );

        $oneTimeDonation = $request->input('sponsorship.tier.is_one_time', false);
        $effectiveDate = Carbon::parse($request->input('effective_date', 'now'));

        if ($action === 'created' || $action === 'edited' || $action === 'tier_changed') {
            $sponsor->cancelled_at = $oneTimeDonation ? now()->addMonth() : null;
        } elseif ($action === 'cancelled') {
            $sponsor->cancelled_at = now();
        } elseif ($action === 'pending_cancellation') {
            $sponsor->cancelled_at = $effectiveDate;
        } elseif ($action === 'pending_tier_change') {
            $sponsor->cancelled_at = $oneTimeDonation ? $effectiveDate->addMonth() : null;
        }

        if ($sponsor->isDirty()) {
            $sponsor->save();

            dispatch(new ProcessSponsorshipChanges($sponsor));
        }
    }
}
