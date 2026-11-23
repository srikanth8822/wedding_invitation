<section class="sec closing" id="closing">
    <div class="sec-in reveal">
        <p class="eyebrow">Can't be there? Join us live</p>
        <h2 class="h2" data-c="videoTitle"><?= e($c['videoTitle']) ?></h2>
        <div class="film">
            <button class="film-poster" id="film-play" type="button" aria-label="Play the wedding live stream">
  <img data-img="closingPhoto" src="<?= e($c['closingPhoto']) ?>" alt="<?= e($c['bride']) ?> and <?= e($c['groom']) ?> cutting their engagement cake" width="1280" height="720">
  <span class="film-btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
</button>
            <p class="film-note" id="film-note" hidden>The live stream plays right here in the frame on your published site. This preview cannot load YouTube players, so use Watch on YouTube to open it.</p>
        </div>
        <a class="yt-link" id="yt-link" href="<?= e($c['youtubeWatchUrl']) ?>" target="_blank" rel="noopener">Watch on YouTube <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h7v7M13 3L4 12"/></svg></a>
        <p class="lead">Your presence and blessings will make our day complete</p>
        <p class="sign"><span data-c="bride"><?= e($c['bride']) ?></span><span class="sign-amp">&amp;</span><span data-c="groom"><?= e($c['groom']) ?></span></p>
        <p class="cdate" data-c="dateShort"><?= e($c['dateShort']) ?></p>
        <button class="ghost" id="replay" type="button">Watch the opening again</button>
    </div>
</section>
