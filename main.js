function e(e, r) { const t = null === r[0]; let o = new RegExp(""); null !== r[0] && (o = "string" == typeof r[0] ? new RegExp(r[0].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g") : r[0], o.test(e) || console.warn("Nothing to inject.")); const n = /(\)[^{]*{)/, c = /(}?)$/; switch (r[2]) { case "before": e = t ? e.replace(n, `$1${r[1]}`) : e.replace(o, `${r[1]}${r[0]}`); break; case "replace": e = t ? r[1] : e.replace(o, r[1]); break; case "after": e = t ? e.replace(c, `${r[1]}$1`) : e.replace(o, `${r[0]}${r[1]}`); break; default: throw new Error('where Parameter must be "before", "replace" or "after"') }return e } function injectCodes(r, t, o = {}) { let n = r.toString(); for (const r of t) n = e(n, r); const c = Function(...Object.keys(o), `return (${n})`)(...Object.values(o)); return c.prototype = r.prototype, c }

const BASE_ASSETS = {
    COOKIE: 'perfectCookie.png',
    COOKIE_GOLD: 'goldCookie.png',
    COOKIE_WRATH: 'wrathCookie.png',
    WRINKLER: 'wrinkler.png',
    WRINKLER_WINTER: 'winterWrinkler.png',
    WRINKLER_SHINY: 'shinyWrinkler.png',
    WRINKLER_BLINK: 'wrinklerBlink.png',
    WRINKLER_GOOGLIES: 'wrinklerGooglies.png',
    WRINKLER_SHADOW: 'wrinklerShadow.png'
}

const ASSETS = {
    ICON: 'icon.png',
    BOCCHI_COOKIE: 'bocchi_cookie.png',
    BOCCHI_GOLD_COOKIE: 'bocchi_goldCookie.png',
    BOCCHI_WRATH_COOKIE: 'bocchi_wrathCookie.png',
    BOCCHI_WRINKLER: 'bocchi_wrinkler.png',
    BOCCHI_SHINY_WRINKLER: 'bocchi_shinyWrinkler.png',
    BOCCHI_WINTER_WRINKLER: 'bocchi_winterWrinkler.png',
    BOCCHI_WRINKLER_BLINK: 'bocchi_wrinklerBlink.png',
    BOCCHI_WRINKLER_GOOGLIES: 'bocchi_wrinklerGooglies.png',
    BOCCHI_WRINKLER_SHADOW: 'bocchi_wrinklerShadow.png'
}

if (!BocchiTheCookie) var BocchiTheCookie = {
    name: 'BocchiTheCookie',
    version: '1.2',
    isLoaded: false,

    getAssets: function (asset) {
        return `${this.dir}/assets/${asset}`;
    },

    replace: function (dest, asset) {
        Game.Loader.Replace(dest, this.getAssets(asset));
    },

    init: function () {
        // Cookie replacements.
        this.replace(BASE_ASSETS.COOKIE, ASSETS.BOCCHI_COOKIE);
        // TODO: Maybe add seasonal specific sprites.
        switch (Game.baseSeason) {
            default:
                this.replace(BASE_ASSETS.COOKIE_GOLD, ASSETS.BOCCHI_GOLD_COOKIE);
                Game.shimmerTypes.golden.initFunc = injectCodes(
                    Game.shimmerTypes.golden.initFunc,
                    [
                        ['img/goldCookie.png', `"${this.getAssets(ASSETS.BOCCHI_GOLD_COOKIE)}"`, 'replace'],
                    ]
                );
        }

        Game.Loader.Replace('wrathCookie.png', this.getAssets(ASSETS.BOCCHI_WRATH_COOKIE));
        this.replace(BASE_ASSETS.COOKIE_WRATH, ASSETS.BOCCHI_WRATH_COOKIE);
        Game.shimmerTypes.golden.initFunc = injectCodes(
            Game.shimmerTypes.golden.initFunc,
            [
                ['img/wrathCookie.png', `"${this.getAssets(ASSETS.BOCCHI_WRATH_COOKIE)}"`, 'replace'],
            ]
        );

        // Wrinkler replacements.
        this.replace(BASE_ASSETS.WRINKLER, ASSETS.BOCCHI_WRINKLER);
        this.replace(BASE_ASSETS.WRINKLER_SHINY, ASSETS.BOCCHI_SHINY_WRINKLER);
        this.replace(BASE_ASSETS.WRINKLER_WINTER, ASSETS.BOCCHI_WINTER_WRINKLER);

        // FIXME: wrinklers googlies are empty at the moment :(
        this.replace(BASE_ASSETS.WRINKLER_BLINK, ASSETS.BOCCHI_WRINKLER_BLINK);
        this.replace(BASE_ASSETS.WRINKLER_GOOGLIES, ASSETS.BOCCHI_WRINKLER_GOOGLIES);

        // TODO: Bocchi wrinkler shadows could look better.
        this.replace(BASE_ASSETS.WRINKLER_SHADOW, ASSETS.BOCCHI_WRINKLER_SHADOW);

        Game.Notify(`Bocchi The Cookie! loaded`, 'You can now give some headpats!', [0, 0, this.getAssets(ASSETS.ICON)], 7);
        this.isLoaded = true;

        // TODO: Add options menu.
    },

    register: function () {
        Game.registerMod(this.name, this);
    },
}

if (!BocchiTheCookie.isLoaded) {
    BocchiTheCookie.register();
}