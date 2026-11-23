(function() {
    /* CONFIG now comes from config.php (printed by includes/scripts.php) */
    const CONFIG = window.INVITE_CONFIG || {};
    /* =========================================== */

    // a title like 'Dr.' is split off: initials skip it ('Dr. Ravi' gives R) and the opening sets it smaller
    const HON = /^\s*((?:dr|mr|mrs|ms|er|prof)\.?)\s+(.+)$/i;
    const bare = (n) => {
        const m = String(n || '').match(HON);
        return m ? m[2] : String(n || '');
    };
    CONFIG.groomInitial = bare(CONFIG.groom).charAt(0);
    CONFIG.brideInitial = bare(CONFIG.bride).charAt(0);
    const $ = (s) => document.querySelector(s);
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
    document.documentElement.classList.add('js');
    document.querySelectorAll('[data-c]').forEach((el) => {
        const v = CONFIG[el.dataset.c];
        if (v != null) el.textContent = v;
    });
    const nameHtml = (n) => {
        const m = String(n || '').match(HON);
        return m ? '<span class="hon">' + esc(m[1]) + '</span> ' + esc(m[2]) : esc(n);
    };
    document.querySelectorAll('[data-c="groom"], [data-c="bride"]').forEach((el) => {
        el.innerHTML = nameHtml(CONFIG[el.dataset.c]);
    });

    /* ---------- families: in the order listed, a thin line between the parents and anyone else ---------- */
    const PARENT = /^(father|mother)$/i;

    function famCard(el, who, list) {
        list = (list || []).filter((p) => p && p.name);
        const isParent = (p) => PARENT.test(p.role || '');
        const line = (p) => '<div class="fam-p">' + (p.role ? '<p class="fam-rel">' + esc(p.role) + '</p>' : '') + '<p class="fam-name">' + esc(p.name) + '</p>' + (p.note ? '<p class="fam-note">' + esc(p.note) + '</p>' : '') + '</div>';
        let body = '',
            prev = null;
        list.forEach((p) => {
            const g = isParent(p);
            if (prev !== null && g !== prev) body += '<span class="fam-sep" aria-hidden="true"></span>';
            body += line(p);
            prev = g;
        });
        el.innerHTML = '<p class="fam-role">' + nameHtml(CONFIG[who]) + (list.some((p) => !isParent(p)) ? "'s family" : "'s parents") + '</p>' + body;
    }
    famCard($('#fam-groom'), 'groom', CONFIG.groomFamily);
    famCard($('#fam-bride'), 'bride', CONFIG.brideFamily);
    document.title = CONFIG.bride + ' & ' + CONFIG.groom + (CONFIG.sample ? ' · Sample invitation' : '');
    // Directions links: Google Maps starts the route from the guest's current location by itself
    const dirUrl = (q) => 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q || CONFIG.city);
    const placeUrl = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q || CONFIG.city);
    // 'Get directions' starts the route straight away; 'View map' opens the shared pin when there is one
    $('#map-link').href = CONFIG.mapQuery ? dirUrl(CONFIG.mapQuery) : (CONFIG.mapUrl || dirUrl(''));
    $('#vn-chip').href = CONFIG.mapUrl || placeUrl(CONFIG.mapQuery);
    document.querySelectorAll('[data-img]').forEach((el) => {
        const v = CONFIG[el.dataset.img];
        if (v) el.src = v;
    });
    if (CONFIG.albumUrl) $('#album-link').href = CONFIG.albumUrl;
    else $('#album-link').remove();
    $('#b-insta').href = 'https://instagram.com/' + CONFIG.brandInstagram.replace(/^@/, '');
    $('#b-phone').href = 'tel:+91' + CONFIG.brandPhone.replace(/\D/g, '').slice(-10);
    $('#b-mail').href = 'mailto:' + CONFIG.brandEmail;
    $('#b-web').href = 'https://' + CONFIG.brandWebsite.replace(/^https?:\/\//, '').toLowerCase();

    /* ---------- gallery: a stack of photos to swipe or tap ---------- */
    const shots = CONFIG.gallery || [];
    if (!shots.length) $('#gallery').remove(); // no photos: the Gallery section is left out
    else {
        const deck = $('#deck'),
            gal = $('#gal'),
            deckStatus = $('#deck-status');
        const reduceDeck = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        deck.innerHTML = shots.map((g) => '<div class="pc"><img src="' + esc(g.src) + '" alt="' + esc(g.alt || '') + '" style="object-position:' + esc(g.pos || 'center') + '" loading="lazy" draggable="false"></div>').join('');
        const cards = Array.from(deck.children);
        let order = cards.map((_, i) => i),
            busy = false;
        const SPOT = [{
            r: -3,
            x: 0,
            y: 0
        }, {
            r: 4,
            x: 12,
            y: 6
        }, {
            r: -5,
            x: -10,
            y: 10
        }];

        function layout() {
            order.forEach((ci, k) => {
                const c = cards[ci],
                    p = SPOT[Math.min(k, SPOT.length - 1)];
                c.style.zIndex = String(cards.length - k);
                c.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px) rotate(' + p.r + 'deg)';
                c.style.opacity = k < SPOT.length ? '1' : '0';
                c.classList.toggle('top', k === 0);
                c.setAttribute('aria-hidden', k === 0 ? 'false' : 'true');
            });
            if (cards.length) deckStatus.textContent = 'Photo ' + (order[0] + 1) + ' of ' + cards.length + ': ' + (shots[order[0]].alt || '');
        }

        function stopHint() {
            gal.classList.remove("hinting");
        }

        function next(dir) {
            if (busy || cards.length < 2) return;
            busy = true;
            stopHint();
            const top = cards[order[0]];
            top.style.transition = 'transform .42s cubic-bezier(.4, 0, .2, 1), opacity .42s ease';
            top.style.transform = 'translate(' + (dir * 125) + '%, -3%) rotate(' + (dir * 16) + 'deg)';
            setTimeout(() => {
                order.push(order.shift());
                top.style.zIndex = '0';
                top.style.transition = '';
                layout();
                setTimeout(() => {
                    busy = false;
                }, 260);
            }, reduceDeck ? 0 : 360);
        }

        function prev() {
            if (busy || cards.length < 2) return;
            stopHint();
            order.unshift(order.pop());
            layout();
        }
        let sx = null,
            sy = 0,
            dx = 0,
            t0 = 0,
            dragging = false;
        deck.addEventListener('pointerdown', (e) => {
            if (busy || e.button > 0) return;
            sx = e.clientX;
            sy = e.clientY;
            dx = 0;
            t0 = Date.now();
            dragging = false;
        });
        deck.addEventListener('pointermove', (e) => {
            if (sx === null) return;
            dx = e.clientX - sx;
            const dy = e.clientY - sy;
            if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
                dragging = true;
                stopHint();
                try {
                    deck.setPointerCapture(e.pointerId);
                } catch (err) {}
                cards[order[0]].style.transition = 'none';
            }
            if (dragging) cards[order[0]].style.transform = 'translate(' + dx + 'px,' + (Math.abs(dx) * -0.04) + 'px) rotate(' + (-3 + dx / 16) + 'deg)';
        });

        function endDrag(cancel) {
            if (sx === null) return;
            const top = cards[order[0]];
            if (dragging) {
                top.style.transition = '';
                if (!cancel && Math.abs(dx) > 70) next(Math.sign(dx));
                else layout();
            } else if (!cancel && Date.now() - t0 < 500) {
                next(-1);
            }
            sx = null;
            dragging = false;
        }
        deck.addEventListener('pointerup', () => endDrag(false));
        deck.addEventListener('pointercancel', () => endDrag(true));
        deck.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                next(-1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
            }
        });
        layout();
        if (reduceDeck) stopHint();
    }

    /* ---------- events ---------- */
    const MEDAL = '<svg class="medal" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="20" cy="20" r="18"/><circle cx="20" cy="20" r="6.5"/><path d="M20 4.5v6M20 29.5v6M4.5 20h6M29.5 20h6M9 9l4.2 4.2M26.8 26.8L31 31M31 9l-4.2 4.2M13.2 26.8L9 31"/><circle cx="20" cy="20" r="1.7" fill="currentColor" stroke="none"/></svg>';
    const CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
    const SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>';
    // no events: the Wedding Events section is left out
    if (!(CONFIG.events && CONFIG.events.length)) $('#events').remove();
    else $('#tl').innerHTML = CONFIG.events.map((ev, i) => {
        const side = i % 2 ? 'r' : 'l';
        const label = side === 'l' ? 'Directions ' + SEND : SEND + ' Directions';
        return '<li class="ev ev-' + side + ' reveal"><span class="ev-dot" aria-hidden="true">' + MEDAL + '</span><div class="ev-card">' +
            '<h3 class="ev-name">' + esc(ev.name) + '</h3>' +
            (ev.date ? '<p class="ev-date">' + esc(ev.date) + '</p>' : '') +
            (ev.time ? '<p class="ev-time">' + CLOCK + esc(ev.time) + '</p>' : '') +
            (ev.venue === '' ? '' : '<p class="ev-place">' + esc(ev.venue || CONFIG.city) + '</p>') +
            '<a class="ev-dir" href="' + esc(ev.map || dirUrl(ev.mapQuery || CONFIG.mapQuery)) + '" target="_blank" rel="noopener" aria-label="Directions to ' + esc(ev.name) + '">' + label + '</a>' +
            '</div></li>';
    }).join('');

    // the gold line fills down the timeline as the guest scrolls
    const tl = $('#tl');
    let tlQueued = false;

    function tlFill() {
        tlQueued = false;
        if (!tl) return;
        const r = tl.getBoundingClientRect();
        const p = reduceMotion ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.72 - r.top) / r.height));
        tl.style.setProperty('--p', p.toFixed(3));
    }
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('scroll', () => {
        if (!tlQueued) {
            tlQueued = true;
            requestAnimationFrame(tlFill);
        }
    }, {
        passive: true
    });
    window.addEventListener('resize', tlFill);
    tlFill();

    /* ---------- reveal on scroll (from a visible resting state) ---------- */
    const io = 'IntersectionObserver' in window ? new IntersectionObserver((list) => {
        list.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, {
        rootMargin: '0px 0px -8% 0px'
    }) : null;
    document.querySelectorAll('.reveal').forEach((el) => io ? io.observe(el) : el.classList.add('in'));

    /* ---------- wedding date shown on the page, taken from the muhurtham setting ---------- */
    const mDay = new Date(CONFIG.muhurtham);
    if (!isNaN(mDay) && window.Intl) {
        const f = (o) => new Intl.DateTimeFormat('en-IN', Object.assign({
            timeZone: 'Asia/Kolkata'
        }, o)).format(mDay);
        $('#d-wd').textContent = f({
            weekday: 'long'
        });
        $('#d-day').textContent = f({
            day: 'numeric'
        });
        $('#d-mon').textContent = f({
            month: 'long'
        });
        $('#d-yr').textContent = f({
            year: 'numeric'
        });
        $('#cd-date').textContent = f({
            weekday: 'short'
        }) + ', ' + f({
            day: 'numeric'
        }) + ' ' + f({
            month: 'short'
        }) + ' ' + f({
            year: 'numeric'
        });
    }

    /* ---------- countdown ---------- */
    const target = new Date(CONFIG.muhurtham).getTime();
    const pad = (n) => String(n).padStart(2, '0');

    function tick() {
        const d = Math.max(0, (target - Date.now()) || 0);
        const days = Math.floor(d / 864e5),
            h = Math.floor(d / 36e5) % 24,
            m = Math.floor(d / 6e4) % 60,
            sec = Math.floor(d / 1e3) % 60;
        $('#cd-d').textContent = pad(days);
        $('#cd-h').textContent = pad(h);
        $('#cd-m').textContent = pad(m);
        $('#cd-s').textContent = pad(sec);
        $('#cd-done').hidden = d > 0;
    }
    tick();
    setInterval(tick, 1000);


    /* ---------- music: the couple's song (CONFIG.music), looped, fading in as the invitation opens ---------- */
    function Song(src) {
        const a = new Audio();
        a.src = src;
        a.loop = true;
        a.preload = 'auto';
        let on = false,
            timer = null;
        const VOL = 0.9;

        function fade(to, sec, done) { // iPhones fix the volume, so there the song simply starts and stops
            clearInterval(timer);
            const from = a.volume,
                t0 = performance.now();
            timer = setInterval(() => {
                const k = Math.min(1, (performance.now() - t0) / (sec * 1000));
                try {
                    a.volume = from + (to - from) * k;
                } catch (e) {}
                if (k === 1) {
                    clearInterval(timer);
                    if (done) done();
                }
            }, 40);
        }
        return {
            get on() {
                return on;
            },
            start() {
                on = true;
                try {
                    a.volume = 0;
                } catch (e) {}
                const p = a.play();
                if (p && p.catch) p.catch(() => {
                    on = false;
                    paintSound();
                });
                fade(VOL, 1.5);
            },
            stop() {
                on = false;
                fade(0, 0.4, () => {
                    if (!on) a.pause();
                });
            },
            pause() {
                if (on) a.pause();
            },
            resume() {
                if (on) {
                    const p = a.play();
                    if (p && p.catch) p.catch(() => {});
                }
            },
        };
    }
    /* no song set: a soft tanpura drone with veena-like notes */
    const Music = CONFIG.music ? Song(CONFIG.music) : (function() {
        let ctx, master, bus, timer = null,
            next = 0,
            step = 0,
            on = false;
        const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
        const TAN = [57, 62, 62, 50];
        const MEL = [74, 76, 78, 81, 78, 76, 74, 0, 71, 74, 76, 78, 76, 74, 0, 0, 81, 83, 81, 78, 76, 78, 74, 0];

        function impulse(sec) {
            const len = Math.floor(ctx.sampleRate * sec),
                b = ctx.createBuffer(2, len, ctx.sampleRate);
            for (let c = 0; c < 2; c++) {
                const d = b.getChannelData(c);
                for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
            }
            return b;
        }

        function pluck(f, t, dur, vol, type, cut) {
            const o = ctx.createOscillator(),
                g = ctx.createGain(),
                fl = ctx.createBiquadFilter();
            o.type = type;
            o.frequency.value = f;
            fl.type = 'lowpass';
            fl.frequency.setValueAtTime(cut, t);
            fl.frequency.exponentialRampToValueAtTime(380, t + dur);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
            g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
            o.connect(fl);
            fl.connect(g);
            g.connect(bus);
            o.start(t);
            o.stop(t + dur + 0.05);
        }

        function schedule() {
            while (next < ctx.currentTime + 0.6) {
                pluck(hz(TAN[step % 4]), next, 3.4, 0.045, 'sawtooth', 1300);
                if (step % 2 === 0) {
                    const m = MEL[(step / 2) % MEL.length];
                    if (m) pluck(hz(m), next + 0.03, 1.8, 0.06, 'triangle', 3400);
                }
                next += 0.85;
                step++;
            }
        }
        return {
            get on() {
                return on;
            },
            start() {
                try {
                    if (!ctx) {
                        ctx = new(window.AudioContext || window.webkitAudioContext)();
                        master = ctx.createGain();
                        master.gain.value = 0.0001;
                        bus = ctx.createGain();
                        const rev = ctx.createConvolver();
                        rev.buffer = impulse(2.8);
                        const wet = ctx.createGain();
                        wet.gain.value = 0.4;
                        bus.connect(master);
                        bus.connect(rev);
                        rev.connect(wet);
                        wet.connect(master);
                        master.connect(ctx.destination);
                        next = ctx.currentTime + 0.15;
                    }
                    ctx.resume();
                    next = Math.max(next, ctx.currentTime + 0.1);
                    master.gain.cancelScheduledValues(ctx.currentTime);
                    master.gain.setTargetAtTime(0.85, ctx.currentTime, 0.9);
                    if (!timer) timer = setInterval(schedule, 150);
                    on = true;
                } catch (e) {
                    on = false;
                }
            },
            stop() {
                if (!ctx) return;
                on = false;
                master.gain.cancelScheduledValues(ctx.currentTime);
                master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.25);
                clearInterval(timer);
                timer = null;
            },
            pause() {
                if (ctx && on) ctx.suspend();
            },
            resume() {
                if (ctx && on) ctx.resume();
            },
        };
    })();
    const soundBtn = $('#sound');

    function paintSound() {
        soundBtn.setAttribute('aria-pressed', Music.on ? 'true' : 'false');
        soundBtn.setAttribute('aria-label', Music.on ? 'Turn music off' : 'Turn music on');
    }
    soundBtn.addEventListener('click', () => {
        Music.on ? Music.stop() : Music.start();
        paintSound();
    });
    document.addEventListener('visibilitychange', () => document.hidden ? Music.pause() : Music.resume());

    /* ---------- video ---------- */
    // (the venue map is set up just below, once the preview check exists)
    const ytId = (u) => {
        const m = String(u || '').match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
        return m ? m[1] : null;
    };
    const vid = ytId(CONFIG.youtubeUrl);
    const watchUrl = vid ? 'https://www.youtube.com/watch?v=' + vid : (CONFIG.youtubeUrl || 'https://www.youtube.com/');
    // no video: the song block in the closing section is left out
    if (!vid) document.querySelectorAll('#closing .eyebrow, #closing [data-c="videoTitle"], #closing .film, #yt-link').forEach((el) => el.remove());
    else $('#yt-link').href = watchUrl;
    const inPreview = /claude/.test(location.hostname) || /claude\.ai/.test(document.referrer || '');

    /* ---------- venue map ---------- */
    if (!inPreview && CONFIG.mapQuery) { // the preview cannot load Google maps: it keeps the picture
        const mf = document.createElement('iframe');
        mf.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(CONFIG.mapQuery) + '&z=' + (CONFIG.mapZoom || 14) + '&output=embed';
        mf.title = 'Map of ' + (CONFIG.venueName || 'the venue');
        mf.loading = 'lazy';
        mf.referrerPolicy = 'no-referrer-when-downgrade';
        $('#vn-map').appendChild(mf);
    }
    if (vid) $('#film-play').addEventListener('click', () => {
        if (!vid) return;
        if (inPreview) {
            $('#film-note').hidden = false;
            return;
        } // the Claude preview blocks YouTube players
        if (Music.on) {
            Music.stop();
            paintSound();
        }
        const f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + vid + '?autoplay=1&rel=0&playsinline=1';
        f.title = CONFIG.videoTitle || 'Video';
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        f.allowFullscreen = true;
        $('#film-play').replaceWith(f);
    });

    /* ---------- the stage ---------- */
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pin = $('#pin'),
        stage = $('#stage'),
        story = $('#story');
    const lg = $('#lg'),
        lw = $('#lw'),
        dl = $('#dl'),
        dr = $('#dr'),
        seam = $('#seam'),
        spill = $('#spill');
    const shades = Array.from(document.querySelectorAll('.door .shut'));
    const lamps = Array.from(document.querySelectorAll('.lamp')),
        glows = Array.from(document.querySelectorAll('.lampglow'));
    const trees = Array.from(document.querySelectorAll('.tree'));
    const nA = $('#n-a'),
        nB = $('#n-b'),
        nC = $('#n-c'),
        nD = $('#n-d'),
        nE = $('#n-e');
    const hintEnd = $('#hint-end'),
        petalsBox = $('#petals');

    // little oil lamps along the path to the gopuram
    let diyaSvg = '';
    [0.12, 0.42, 0.78].forEach((u) => {
        const sc = 0.7 + 1.1 * u,
            y = 1728 + 202 * u;
        [505 - 165 * u - 22 * sc, 575 + 165 * u + 22 * sc].forEach((x) => {
            diyaSvg += '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + sc.toFixed(2) + ')"><path d="M-12 0 C-10 8 10 8 12 0 Z" style="fill:var(--main)"/><path class="diya" d="M0 -18 C3 -11 4 -6 4 -3 C4 0 2 1 0 1 C-2 1 -4 0 -4 -3 C-4 -6 -3 -11 0 -18 Z" style="fill:var(--second)"/></g>';
        });
    });
    $('#ground').insertAdjacentHTML('beforeend', diyaSvg);
    const diyas = Array.from(document.querySelectorAll('.diya'));

    // rose petals
    const FILES = ['petal-red-1', 'petal-rose-1', 'petal-red-2', 'petal-pink-1', 'petal-rose-2', 'petal-pink-2'];
    let seed = 23;
    const rnd = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    };
    const petals = [];
    const PETALS = reduce ? 0 : 30;
    for (let i = 0; i < PETALS; i++) {
        const depth = 0.45 + 0.55 * rnd(),
            size = Math.round(30 + 52 * depth);
        const img = document.createElement('img');
        img.src = 'assets/' + FILES[i % 6] + '.webp';
        img.alt = '';
        img.width = size;
        img.height = size;
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        petalsBox.appendChild(img);
        petals.push({
            el: img,
            x: -40 + 1160 * rnd(),
            off: 2200 * rnd(),
            v: 120 + 190 * depth,
            a: 20 + 50 * rnd(),
            w: 0.6 + 0.9 * rnd(),
            ph: 6.28 * rnd(),
            spin: (rnd() < 0.5 ? -1 : 1) * (30 + 90 * rnd()),
            tf: 1.6 + 2.2 * rnd(),
            ph2: 6.28 * rnd(),
            drift: 10 + 30 * rnd(),
            half: size / 2,
            op: 0.75 + 0.25 * depth
        });
    }

    const clamp = (x, a, b) => Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, x));
    const seg = (t, a, b) => clamp((t - a) / (b - a));
    const lerp = (a, b, k) => a + (b - a) * k;
    const eo = (x) => 1 - Math.pow(1 - x, 3);
    const eio = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const eoq = (x) => 1 - Math.pow(1 - x, 4);
    const eob = (x, s) => {
        s = s || 1.6;
        const c = s + 1;
        return 1 + c * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
    };
    const noise = (x) => 0.5 * Math.sin(x * 1.7) + 0.3 * Math.sin(x * 2.9 + 1.3) + 0.2 * Math.sin(x * 5.1 + 2.1);
    const PUSH = 1.025,
        ZOOM = 1.935,
        LIFT = 322.8;

    function fit() {
        const W = pin.clientWidth,
            H = pin.clientHeight,
            s = Math.max(W / 1080, H / 1920);
        stage.style.transform = 'translate(' + ((W - 1080 * s) / 2).toFixed(2) + 'px,' + ((H - 1920 * s) / 2).toFixed(2) + 'px) scale(' + s.toFixed(5) + ')';
    }

    // The opening, in seconds after "Open the invitation": doors 0-4.5, then the walk and the rise 4.5-15
    const DOORS = 2.4,
        END = 8;

    function intro(t) {
        const u = t - DOORS;
        const z1 = lerp(1, PUSH, eio(seg(t, 0, DOORS)));
        const open = 84 * eio(seg(t, 0.35, 1.75)) - 1.5 * Math.sin(Math.PI * seg(t, 0.15, 0.38));
        dl.style.transform = 'perspective(1800px) rotateY(' + open.toFixed(2) + 'deg)';
        dr.style.transform = 'perspective(1800px) rotateY(' + (-open).toFixed(2) + 'deg)';
        shades.forEach((s) => {
            s.style.opacity = clamp(open / 84).toFixed(3);
        });
        spill.style.opacity = (0.5 * eio(seg(t, 0.4, 1.9))).toFixed(3);
        const wz = u <= 0 ? z1 : PUSH * Math.pow(3.4, eio(seg(u, 0.05, 1.05)));
        lw.style.transform = 'scale(' + wz.toFixed(4) + ')';
        lw.style.visibility = u > 1.08 ? 'hidden' : 'visible';
        const k = eio(seg(u, 0.3, 3.9));
        const gz = u <= 0 ? z1 : lerp(PUSH, ZOOM, k) * (1 + 0.015 * seg(u, 3.9, 5.6));
        lg.style.transform = 'translate(0px,' + (LIFT * k).toFixed(2) + 'px) scale(' + gz.toFixed(4) + ')';
        const glide = (el, a, b, from) => {
            const q = eoq(seg(u, a, b));
            el.style.opacity = seg(u, a, a + 0.25).toFixed(3);
            el.style.transform = 'translateY(' + ((1 - q) * from).toFixed(1) + 'px)';
        };
        glide(nB, 2.4, 3.6, 1740);
        glide(nD, 2.7, 3.9, 1520);
        const m = seg(u, 3.5, 3.85);
        nC.style.opacity = eo(m).toFixed(3);
        nC.style.transform = 'scale(' + lerp(0.6, 1, eob(m)).toFixed(3) + ')';
        const fade = (el, a, b) => {
            const q = eo(seg(u, a, b));
            el.style.opacity = q.toFixed(3);
            el.style.transform = 'translateY(' + ((1 - q) * 16).toFixed(1) + 'px)';
        };
        fade(nA, 3.9, 4.35);
        fade(nE, 4.05, 4.5);
        petalsBox.style.opacity = seg(u, 0.4, 0.9).toFixed(3);
        hintEnd.style.opacity = seg(t, END - 0.2, END + 0.6).toFixed(3);
    }

    function life(T, t) {
        const w = 6.2832,
            amp = reduce ? 0 : 1;
        seam.style.opacity = ((0.3 + 0.12 * Math.sin(T * 2.2) * amp + 0.6 * eo(seg(t, 0.05, 0.3))) * (1 - seg(t, 0.38, 0.7))).toFixed(3);
        if (t < DOORS + 2) {
            lamps.forEach((el, i) => {
                el.style.transform = 'rotate(' + (2.2 * amp * Math.sin(w * T / 3.6 + i * 1.9)).toFixed(2) + 'deg)';
            });
            glows.forEach((el, i) => {
                el.style.opacity = (0.75 + 0.25 * amp * noise(T * 2.1 + i * 9)).toFixed(3);
            });
        }
        trees.forEach((el, i) => {
            el.style.transform = 'rotate(' + (0.7 * amp * Math.sin(w * T / 5.2 + i * 2.3)).toFixed(2) + 'deg)';
        });
        diyas.forEach((el, i) => {
            el.setAttribute('transform', 'scale(1 ' + (1 + 0.14 * amp * noise(T * 3 + i * 4)).toFixed(3) + ')');
        });
        if (t > DOORS + 0.3) {
            for (const q of petals) {
                const y = ((T * q.v + q.off) % 2200) - 140 + 14 * Math.sin(T * q.tf * 1.3 + q.ph2);
                const x = ((q.x + q.drift * T) % 1240) - 80 + q.a * Math.sin(q.w * T * 2 + q.ph);
                const flip = Math.cos(T * q.tf + q.ph2),
                    sx = Math.abs(flip) < 0.12 ? (flip < 0 ? -0.12 : 0.12) : flip;
                const sy = 0.82 + 0.18 * Math.sin(T * q.tf * 0.7 + q.ph),
                    rot = q.ph * 57 + q.spin * T + 18 * Math.sin(T * 1.7 + q.ph2);
                q.el.style.opacity = q.op.toFixed(2);
                q.el.style.transform = 'translate(' + (x - q.half).toFixed(1) + 'px,' + (y - q.half).toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) scale(' + sx.toFixed(3) + ',' + sy.toFixed(3) + ')';
            }
        }
    }

    const html = document.documentElement,
        btn = $('#open-btn'),
        skipBtn = $('#skip');
    let startedAt = null,
        finished = false;

    function finish() {
        finished = true;
        html.classList.remove('locked');
        html.classList.add('done');
        skipBtn.style.opacity = '0';
        setTimeout(() => {
            skipBtn.hidden = true;
        }, 600);
    }

    function frame(now) {
        const t = startedAt === null ? 0 : Math.min(END + 1, (now - startedAt) / 1000);
        if (story.getBoundingClientRect().bottom > 0) {
            intro(t);
            life(now / 1000, t);
        }
        if (startedAt !== null && !finished && t >= END) finish();
        requestAnimationFrame(frame);
    }

    fit();
    intro(0);
    life(0, 0);
    html.classList.add('ready');
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(pin);
    else window.addEventListener('resize', fit);
    requestAnimationFrame(frame);

    /* ---------- long names stay on one line: shrink to fit, stack when side by side is too tight ---------- */
    function shrink(els, maxW) { // gives every name the same size: the largest at which all of them fit their box
        els.forEach((el) => {
            el.style.fontSize = '';
        });
        const k = Math.min.apply(null, els.map((el) => Math.min(1, (maxW || el.parentElement.clientWidth) / el.scrollWidth)));
        if (k < 1) els.forEach((el) => {
            el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * k * 0.97).toFixed(2) + 'px';
        });
        return k;
    }

    function fitNames() {
        // the opening scene is cropped at the sides on tall narrow phones: fit the names to the part that shows
        const S = Math.max(pin.clientWidth / 1080, pin.clientHeight / 1920);
        shrink([nB, nD], Math.min(920, pin.clientWidth / S - 90));
        const pair = $('.pair'),
            who = Array.from(pair.querySelectorAll('.who-name'));
        pair.classList.remove('stack');
        if (shrink(who) < 0.8) {
            pair.classList.add('stack');
            shrink(who);
        }
        const sign = $('.sign'),
            parts = Array.from(sign.querySelectorAll('[data-c]'));
        sign.classList.remove('stack');
        parts.forEach((el) => {
            el.style.fontSize = '';
        });
        if (sign.scrollWidth > sign.parentElement.clientWidth + 1) {
            sign.classList.add('stack');
            shrink(parts);
        }
    }
    fitNames();
    if (document.fonts) {
        document.fonts.ready.then(fitNames);
        document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', fitNames);
    }
    let fitQueued = false;
    window.addEventListener('resize', () => {
        if (!fitQueued) {
            fitQueued = true;
            requestAnimationFrame(() => {
                fitQueued = false;
                fitNames();
            });
        }
    });

    /* ---------- the gate ---------- */
    html.classList.add('locked');
    window.scrollTo(0, 0);
    const stopTouch = (e) => {
        if (html.classList.contains('locked')) e.preventDefault();
    };
    document.addEventListener('touchmove', stopTouch, {
        passive: false
    });
    const imgs = Array.from(stage.querySelectorAll('img'));
    const loaded = Promise.all(imgs.map((im) => im.decode ? im.decode().catch(() => {}) : Promise.resolve()));
    const ready = () => {
        btn.disabled = false;
        btn.textContent = 'Open the invitation';
    };
    Promise.race([loaded, new Promise((r) => setTimeout(r, 7000))]).then(ready);
    btn.addEventListener('click', () => {
        startedAt = performance.now() - (reduce ? END * 1000 : 0);
        $('#gate').classList.add('gone');
        Music.start();
        soundBtn.hidden = false;
        paintSound();
        if (!reduce) skipBtn.hidden = false;
        setTimeout(() => {
            $('#gate').hidden = true;
        }, 950);
    });
    skipBtn.addEventListener('click', () => {
        startedAt = performance.now() - END * 1000;
    });
    $('#replay').addEventListener('click', () => {
        window.scrollTo(0, 0);
        html.classList.remove('done');
        html.classList.add('locked');
        finished = false;
        startedAt = performance.now() - (reduce ? END * 1000 : 0);
        if (!reduce) {
            skipBtn.hidden = false;
            skipBtn.style.opacity = '1';
        }
    });
})();
