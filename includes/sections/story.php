<section class="story" id="story" aria-label="Opening of the invitation">
    <div class="pin" id="pin">
        <div class="stage" id="stage" aria-hidden="true">
            <div class="layer" id="lg">
                <img class="pic" src="assets/sky-evening.webp" alt="" style="left:0;top:0;width:1080px;height:1920px">
                <img class="pic" src="assets/gopuram.webp" alt="" style="left:220px;top:760px;width:640px;height:980px">
                <div class="tree" style="left:-60px;top:1116px;width:422px;height:629px;transform-origin:211px 629px"><img class="pic" src="assets/banana-left.webp" alt="" style="left:0;top:0;width:422px;height:629px"></div>
                <div class="tree" style="left:744px;top:1112px;width:396px;height:633px;transform-origin:198px 633px"><img class="pic" src="assets/banana-right.webp" alt="" style="left:0;top:0;width:396px;height:633px"></div>
                <svg class="art" id="ground" viewBox="0 0 1080 1920"><rect x="-10" y="1728" width="1100" height="210" style="fill:var(--earth)"/><path d="M505 1728 H575 L740 1930 H340 Z" style="fill:var(--path)"/></svg>
            </div>
            <div class="layer" id="lw">
                <div class="door" id="dl" style="left:306px;top:705px;width:233px;height:885px;transform-origin:0 442px"><img class="pic" src="assets/door-left.webp" alt="" style="left:0;top:0;width:233px;height:885px">
                    <div class="shut"></div>
                </div>
                <div class="door" id="dr" style="left:539px;top:705px;width:232px;height:885px;transform-origin:232px 442px"><img class="pic" src="assets/door-right.webp" alt="" style="left:0;top:0;width:232px;height:885px">
                    <div class="shut"></div>
                </div>
                <div class="seam" id="seam"></div>
                <img class="pic" src="assets/frame.webp" alt="" style="left:0;top:0;width:1080px;height:1920px">
                <div class="glow spill" id="spill"></div>
                <div class="tree" style="left:-110px;top:1240px;width:470px;height:700px;transform-origin:235px 700px"><img class="pic" src="assets/banana-left.webp" alt="" style="left:0;top:0;width:470px;height:700px"></div>
                <div class="tree" style="left:707px;top:1236px;width:441px;height:704px;transform-origin:220px 704px"><img class="pic" src="assets/banana-right.webp" alt="" style="left:0;top:0;width:441px;height:704px"></div>
                <div class="lamp" style="left:4px;width:104px;transform-origin:52px 0">
                    <div class="glow lampglow"></div><img class="pic" src="assets/lamp-left.webp" alt="" style="left:0;top:0;width:104px;height:893px"></div>
                <div class="lamp" style="left:970px;width:105px;transform-origin:52px 0">
                    <div class="glow lampglow"></div><img class="pic" src="assets/lamp-right.webp" alt="" style="left:0;top:0;width:105px;height:893px"></div>
                <div class="words" style="left:80px;top:56px;width:920px">
                    <p class="s-bless">Sri Rastu · Shubhamastu</p>
                </div>
            </div>
            <div class="petals" id="petals"></div>
            <div class="words" id="names" style="left:80px;top:196px;width:920px">
                <p class="s-sub" id="n-a">Together with their families</p>
                <p class="s-line" id="n-b" data-c="bride"><?= e($c['bride']) ?></p>
                <p class="s-amp" id="n-c">&amp;</p>
                <p class="s-line" id="n-d" data-c="groom"><?= e($c['groom']) ?></p>
                <p class="s-sub" id="n-e">invite you to their wedding</p>
            </div>
        </div>

        <button class="skip" id="skip" type="button" hidden>Skip intro</button>
        <div class="hint" id="hint-end">Scroll for the celebrations <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6l5 5 5-5"/></svg></div>

        <div class="gate" id="gate">
            <div class="gate-card">
                <p class="gate-kicker" lang="te">శ్రీరస్తు · శుభమస్తు</p>
                <h1 class="gate-title">Wedding Invitation</h1>
                <p class="gate-mono"><span data-c="brideInitial"><?= e($c['brideInitial']) ?></span><span class="amp">&amp;</span><span data-c="groomInitial"><?= e($c['groomInitial']) ?></span></p>
                <p class="gate-date"><span class="gd-date" data-c="dateText"><?= e($c['dateText']) ?></span><span class="gd-city" data-c="city"><?= e($c['city']) ?></span></p>
                <button class="cta" id="open-btn" type="button" disabled>Preparing the invitation…</button>
                <p class="gate-small">Best enjoyed with sound on</p>
            </div>
        </div>
    </div>
</section>
