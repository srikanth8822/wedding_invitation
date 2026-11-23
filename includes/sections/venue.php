<section class="sec" id="venue">
    <div class="sec-in reveal">
        <h2 class="h2 ttl">The Venue</h2>
        <p class="vn-name" data-c="venueName"><?= e($c['venueName']) ?></p>
        <p class="vn-addr" data-c="venueLine"><?= e($c['venueLine']) ?></p>
        <div class="vn-map" id="vn-map">
            <img class="vn-cover" data-img="venuePhoto" src="<?= e($c['venuePhoto']) ?>" alt="The temple gopuram framed by banana trees at dusk" width="1000" height="700">
            <a class="vn-chip" id="vn-chip" href="<?= e($c['mapViewUrl']) ?>" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg><span data-c="venueName"><?= e($c['venueName']) ?></span><span class="vn-chip-go">View map</span></a>
        </div>
        <a class="cta vn-btn" id="map-link" href="<?= e($c['mapDirectionsUrl']) ?>" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l19-9-9 19-2-8z"/></svg> Get directions</a>
        <p class="vn-hint">Opens Google Maps with the route from where you are</p>
    </div>
</section>
