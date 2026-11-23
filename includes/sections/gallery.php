<section class="sec" id="gallery">
    <div class="sec-in reveal">
        <p class="eyebrow kick">moments</p>
        <h2 class="h2 ttl">Gallery</h2>
        <div class="gal hinting" id="gal">
            <div class="deck" id="deck" tabindex="0" role="group" aria-roledescription="photo stack" aria-label="Photo gallery. Tap, swipe or use the arrow keys for the next photo."></div>
            <p class="swipe-hint"><span class="sh-l"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg></span>Swipe or tap<span class="sh-r"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg></span></p>
            <p class="sr-only" id="deck-status" aria-live="polite"></p>
        </div>
        <a class="ghost drive" id="album-link" href="<?= e($c['albumUrl'] ?: '#') ?>" target="_blank" rel="noopener">View all photos on Google Drive <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></a>
    </div>
</section>
