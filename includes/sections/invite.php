<section class="sec invite" id="invite">
    <svg class="arch" viewBox="0 0 480 90" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 90 V58 C80 58 140 50 180 34 C205 22 225 10 240 4 C255 10 275 22 300 34 C340 50 400 58 480 58 V90 Z" style="fill:var(--paper)"/>
      <path d="M0 58 C80 58 140 50 180 34 C205 22 225 10 240 4 C255 10 275 22 300 34 C340 50 400 58 480 58" style="fill:none;stroke:var(--gold-2);stroke-width:1.5" vector-effect="non-scaling-stroke"/>
    </svg>
    <div class="sec-in reveal">
        <figure class="gan"><img data-img="ganeshaPhoto" src="<?= e($c['ganeshaPhoto']) ?>" alt="Lord Vinayaka" width="340" height="440"></figure>
        <p class="mantra" lang="te" data-c="mantra"><?= e($c['mantra']) ?></p>
        <p class="grace" data-c="graceLine"><?= e($c['graceLine']) ?></p>
        <div class="divider" aria-hidden="true"><span></span><svg class="medal" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="20" cy="20" r="18"/><circle cx="20" cy="20" r="6.5"/><path d="M20 4.5v6M20 29.5v6M4.5 20h6M29.5 20h6M9 9l4.2 4.2M26.8 26.8L31 31M31 9l-4.2 4.2M13.2 26.8L9 31"/><circle cx="20" cy="20" r="1.7" fill="currentColor" stroke="none"/></svg><span></span></div>
    </div>
    <div class="sec-in reveal">
        <figure class="polaroid">
            <div class="pol-photo"><img data-img="heroPhoto" src="<?= e($c['heroPhoto']) ?>" alt="<?= e($c['bride']) ?> and <?= e($c['groom']) ?> with their garlands" width="900" height="900"></div>
            <figcaption class="pol-cap" data-c="heroCaption"><?= e($c['heroCaption']) ?></figcaption>
            <svg class="heart heart-big" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.4 2.6 4.5 6.3 4.1c2.2-.2 4 .9 5.7 3 1.7-2.1 3.5-3.2 5.7-3 3.7.4 5.4 4.3 3.9 7.6C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>
            <svg class="heart heart-small" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.4 2.6 4.5 6.3 4.1c2.2-.2 4 .9 5.7 3 1.7-2.1 3.5-3.2 5.7-3 3.7.4 5.4 4.3 3.9 7.6C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>
        </figure>
    </div>
    <div class="sec-in reveal">
        <div class="pair">
            <div class="who">
                <p class="who-role">The Bride</p>
                <p class="who-name" data-c="bride"><?= e($c['bride']) ?></p>
            </div>
            <p class="pair-amp" aria-hidden="true">&amp;</p>
            <div class="who">
                <p class="who-role">The Groom</p>
                <p class="who-name" data-c="groom"><?= e($c['groom']) ?></p>
            </div>
        </div>
        <div class="divider" aria-hidden="true"><span></span><svg class="medal" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="20" cy="20" r="18"/><circle cx="20" cy="20" r="6.5"/><path d="M20 4.5v6M20 29.5v6M4.5 20h6M29.5 20h6M9 9l4.2 4.2M26.8 26.8L31 31M31 9l-4.2 4.2M13.2 26.8L9 31"/><circle cx="20" cy="20" r="1.7" fill="currentColor" stroke="none"/></svg><span></span></div>
        <div class="dblock" id="dblock">
            <span class="db-side db-l" id="d-wd">Friday</span>
            <span class="db-day" id="d-day">20</span>
            <span class="db-side db-r"><span id="d-mon">November</span><span id="d-yr">2026</span></span>
        </div>
        <p class="tpill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span>Muhurtham</span><b data-c="muhurthamText"><?= e($c['muhurthamText']) ?></b></p>
        <p class="where" data-c="city"><?= e($c['city']) ?></p>
        <a class="scroll-cue" href="#countdown">Scroll to discover <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg></a>
    </div>
</section>
