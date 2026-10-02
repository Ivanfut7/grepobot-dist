// ==UserScript==
// @name         grepo-helper
// @namespace    grepo-helper.local
// @version      0.2.3.217
// @description  Ayudante personal para Grepolis
// @license      UNLICENSED
// @downloadURL  https://raw.githubusercontent.com/Ivanfut7/grepobot-dist/dist/grepo-helper.user.js
// @updateURL    https://raw.githubusercontent.com/Ivanfut7/grepobot-dist/dist/grepo-helper.meta.js
// @match        https://*.grepolis.com/game/*
// @grant        none
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var BUILDING_IDS = [
		"main",
		"lumber",
		"stoner",
		"ironer",
		"storage",
		"farm",
		"docks",
		"academy",
		"barracks",
		"temple",
		"market",
		"wall",
		"hide",
		"theater",
		"thermal",
		"library",
		"lighthouse",
		"tower",
		"statue",
		"oracle",
		"trade_office"
	];
	var UNIT_IDS = [
		"sword",
		"slinger",
		"archer",
		"hoplite",
		"rider",
		"chariot",
		"catapult",
		"big_transporter",
		"small_transporter",
		"bireme",
		"attack_ship",
		"demolition_ship",
		"trireme",
		"colonize_ship",
		"godsent",
		"minotaur",
		"manticore",
		"zyklop",
		"sea_monster",
		"harpy",
		"medusa",
		"centaur",
		"pegasus",
		"cerberus",
		"fury",
		"griffin",
		"calydonian_boar",
		"siren",
		"satyr",
		"spartoi",
		"ladon"
	];
	var NAVAL_UNIT_IDS = [
		"big_transporter",
		"small_transporter",
		"bireme",
		"attack_ship",
		"demolition_ship",
		"trireme",
		"colonize_ship",
		"sea_monster",
		"siren"
	];
	function isNavalUnit(unit) {
		return NAVAL_UNIT_IDS.includes(unit);
	}
	var UNIT_ROLES = {
		sword: "defense",
		slinger: "offense",
		archer: "defense",
		hoplite: "mixed",
		rider: "offense",
		chariot: "mixed",
		catapult: "offense",
		big_transporter: "transport",
		small_transporter: "transport",
		bireme: "defense",
		attack_ship: "offense",
		demolition_ship: "defense",
		trireme: "mixed",
		colonize_ship: "never",
		godsent: "mixed",
		minotaur: "mixed",
		manticore: "offense",
		zyklop: "mixed",
		sea_monster: "mixed",
		harpy: "offense",
		medusa: "mixed",
		centaur: "offense",
		pegasus: "defense",
		cerberus: "defense",
		fury: "offense",
		griffin: "offense",
		calydonian_boar: "offense",
		siren: "mixed",
		satyr: "offense",
		spartoi: "defense",
		ladon: "mixed"
	};
	var FLYING_UNIT_IDS = [
		"manticore",
		"harpy",
		"pegasus",
		"griffin"
	];
	var GOD_IDS = [
		"zeus",
		"poseidon",
		"hera",
		"athena",
		"hades",
		"artemis",
		"aphrodite",
		"ares"
	];
	var RECRUIT_POWERS = {
		fertility_improvement: {
			lane: "barracks",
			god: "hera",
			favor: 80
		},
		spartan_training: {
			lane: "barracks",
			god: "ares",
			favor: 80
		},
		call_of_the_ocean: {
			lane: "docks",
			god: "poseidon",
			favor: 60
		}
	};
	var RECRUIT_POWER_IDS = Object.keys(RECRUIT_POWERS);
	function isRecruitPowerId(value) {
		return typeof value === "string" && RECRUIT_POWER_IDS.includes(value);
	}
	var MYTH_UNIT_GODS = {
		minotaur: "zeus",
		manticore: "zeus",
		zyklop: "poseidon",
		sea_monster: "poseidon",
		harpy: "hera",
		medusa: "hera",
		centaur: "athena",
		pegasus: "athena",
		cerberus: "hades",
		fury: "hades",
		griffin: "artemis",
		calydonian_boar: "artemis",
		siren: "aphrodite",
		satyr: "aphrodite",
		spartoi: "ares",
		ladon: "ares"
	};
	var BARRACKS_UNIT_IDS = [
		"sword",
		"archer",
		"hoplite",
		"slinger",
		"rider",
		"chariot",
		"catapult"
	];
	var DOCKS_UNIT_IDS = [
		"small_transporter",
		"big_transporter",
		"bireme",
		"attack_ship",
		"demolition_ship",
		"trireme",
		"colonize_ship"
	];
	var MYTH_UNIT_IDS = ["godsent", ...Object.keys(MYTH_UNIT_GODS)];
	var BANDIT_UNIT_IDS = [
		"slinger",
		"hoplite",
		"rider",
		"chariot",
		"catapult",
		"godsent",
		"minotaur",
		"manticore",
		"zyklop",
		"harpy",
		"medusa",
		"centaur",
		"pegasus",
		"cerberus",
		"fury",
		"griffin",
		"calydonian_boar",
		"satyr",
		"spartoi",
		"ladon"
	];
	var BANDIT_DEFAULT_UNITS = [
		"slinger",
		"hoplite",
		"rider",
		"chariot"
	];
	function isBanditUnitId(value) {
		return typeof value === "string" && BANDIT_UNIT_IDS.includes(value);
	}
	var RESEARCH_IDS = [
		"slinger",
		"archer",
		"town_guard",
		"hoplite",
		"diplomacy",
		"espionage",
		"booty",
		"pottery",
		"rider",
		"architecture",
		"instructor",
		"bireme",
		"building_crane",
		"meteorology",
		"chariot",
		"attack_ship",
		"conscription",
		"shipwright",
		"demolition_ship",
		"catapult",
		"cryptography",
		"democracy",
		"colonize_ship",
		"small_transporter",
		"plow",
		"berth",
		"trireme",
		"phalanx",
		"breach",
		"mathematics",
		"ram",
		"cartography",
		"take_over",
		"divine_selection",
		"combat_experience",
		"strong_wine",
		"set_sail",
		"stone_storm",
		"temple_looting"
	];
	var RESEARCH_ACADEMY_LEVELS = {
		slinger: 1,
		archer: 1,
		town_guard: 1,
		hoplite: 1,
		diplomacy: 4,
		meteorology: 4,
		espionage: 7,
		booty: 7,
		pottery: 7,
		rider: 10,
		architecture: 10,
		instructor: 10,
		colonize_ship: 13,
		bireme: 13,
		building_crane: 13,
		shipwright: 13,
		chariot: 16,
		attack_ship: 16,
		conscription: 16,
		demolition_ship: 16,
		catapult: 19,
		cryptography: 19,
		democracy: 19,
		small_transporter: 19,
		plow: 22,
		berth: 22,
		trireme: 22,
		phalanx: 25,
		breach: 25,
		mathematics: 25,
		ram: 25,
		cartography: 28,
		take_over: 28,
		stone_storm: 31,
		temple_looting: 31,
		divine_selection: 31,
		combat_experience: 34,
		strong_wine: 34,
		set_sail: 34
	};
	function isBuildingId(value) {
		return typeof value === "string" && BUILDING_IDS.includes(value);
	}
	function isUnitId(value) {
		return typeof value === "string" && UNIT_IDS.includes(value);
	}
	function isResearchId(value) {
		return typeof value === "string" && RESEARCH_IDS.includes(value);
	}
	var BUILDING_MAX_LEVELS = {
		main: 25,
		lumber: 40,
		stoner: 40,
		ironer: 40,
		storage: 35,
		farm: 45,
		docks: 30,
		academy: 36,
		barracks: 30,
		temple: 30,
		market: 30,
		wall: 25,
		hide: 10,
		theater: 1,
		thermal: 1,
		library: 1,
		lighthouse: 1,
		tower: 1,
		statue: 1,
		oracle: 1,
		trade_office: 1
	};
	var SPECIAL_SLOT_1 = [
		"theater",
		"thermal",
		"library",
		"lighthouse"
	];
	var SPECIAL_SLOT_2 = [
		"tower",
		"statue",
		"oracle",
		"trade_office"
	];
	var SPECIAL_SLOT_KEYS = ["special1", "special2"];
	function isSpecialBuildingId(value) {
		return typeof value === "string" && (SPECIAL_SLOT_1.includes(value) || SPECIAL_SLOT_2.includes(value));
	}
	var FARM_INTERVALS = [
		300,
		1200,
		5400,
		14400
	];
	var LOG_TABS = [
		"activity",
		"market",
		"festivals",
		"missions",
		"errors"
	];
	function createProfileExtras() {
		return {
			specialBuildings: {
				slot1: null,
				slot2: null
			},
			populationFloor: {
				enabled: true,
				minFreePopulation: 30,
				farmLevels: 1
			},
			buildFocus: {
				academy28BeforeConquest: false,
				colonyShipFirst: false
			},
			heroTownIds: [],
			recruitSpells: {},
			sendHeroes: false
		};
	}
	function defaultSpellRule(id) {
		return {
			enabled: false,
			fromFavor: RECRUIT_POWERS[id].favor,
			freeSlots: 1
		};
	}
	function createEmptyProfile(name) {
		return {
			name,
			...createProfileExtras(),
			buildStages: [{ targets: {} }],
			researches: [],
			avoidResearches: [],
			troops: {},
			autoBuild: true,
			autoResearch: true,
			autoRecruit: true
		};
	}
	function createDodgeTown(townId) {
		return {
			townId,
			enabled: false,
			land: true,
			fleet: true,
			separate: false,
			units: "all",
			secondsBefore: 20,
			destination: "nearest",
			destinationTownId: null,
			returnMode: "impact",
			returnOffset: 10,
			backsnipe: false,
			backsnipeOffset: 2
		};
	}
	function createDefaultSettings() {
		return structuredClone({
			schemaVersion: 3,
			enabled: false,
			dryRun: true,
			masters: {
				autoBuild: false,
				autoResearch: false,
				autoRecruit: false,
				heroDispatch: false
			},
			pollIntervalMs: {
				minMs: 1e4,
				maxMs: 2e4
			},
			rest: {
				enabled: false,
				startHour: 2,
				endHour: 7
			},
			buildQueueSlots: 7,
			freeFinish: false,
			farmVillages: {
				enabled: false,
				intervalSeconds: 300,
				collectLongestBeforeRest: true,
				townIds: "all",
				maxClaimsPerCycle: 30
			},
			autoTrade: {
				enabled: false,
				minDonorFillRatio: .75,
				reserveRatio: .05,
				minSendAmount: 500,
				maxTransfersPerCycle: 3,
				poolEnabled: false,
				poolTownId: null,
				poolAllied: false
			},
			villageTrade: {
				enabled: false,
				minRatio: .65,
				minAmount: 500
			},
			villageExpansion: {
				enabled: false,
				maxLevel: 6,
				reservePoints: 0
			},
			market: {
				enabled: false,
				balance: false,
				maxDeliveryMinutes: 60,
				maxPayRatio: 1.2,
				overflowPayRatio: 1.5,
				minTrade: 500,
				withdrawAfterHours: 24,
				tradesPerRound: 3,
				partners: "notEnemies"
			},
			hide: {
				enabled: false,
				amount: 5e3,
				excludedTownIds: []
			},
			festivals: {
				enabled: false,
				party: false,
				theater: false,
				triumph: false,
				triumphMinPoints: 300,
				townIds: []
			},
			bandits: {
				enabled: false,
				townId: null,
				units: [...BANDIT_DEFAULT_UNITS]
			},
			missions: {
				enabled: false,
				beginner: true,
				islandRewards: true
			},
			scheduledSpells: {
				enabled: false,
				items: []
			},
			timedCommands: {
				enabled: false,
				items: [],
				done: [],
				defaultEarly: 1,
				defaultLate: 1
			},
			defense: {
				enabled: false,
				ignorePlayers: [],
				ignoreAlliances: [],
				ignoreOwnAlliance: true,
				militiaSeconds: 900,
				militiaTownIds: [],
				mixedUnits: "both",
				dodgeTowns: [],
				spellEnabled: false,
				spellPowerId: null,
				spellWhen: "end",
				spellSeconds: 60,
				spellTownIds: []
			},
			cityFarm: {
				enabled: false,
				templates: [],
				targets: [],
				search: {
					radius: 10,
					minInactiveDays: 3,
					maxPlayerPoints: null,
					maxTownPoints: null,
					includeGhosts: true,
					excludeOwnAlliance: true
				}
			},
			intel: {
				worldRefreshHours: 1,
				ghostRadius: 20,
				watch: {
					enabled: false,
					autoRadius: 10,
					inactiveDays: 3,
					pinned: []
				},
				monitor: {
					enabled: false,
					allianceIds: [],
					maFactor: 3
				},
				alerts: {
					enabled: false,
					webhook: "",
					types: {
						attacks: {
							enabled: true,
							webhook: ""
						},
						conquest: {
							enabled: true,
							webhook: ""
						},
						combat: {
							enabled: true,
							webhook: ""
						},
						finished: {
							enabled: false,
							webhook: ""
						},
						monitor: {
							enabled: true,
							webhook: ""
						}
					}
				}
			},
			language: "es",
			profiles: {},
			townProfiles: {},
			townQueues: {},
			logs: []
		});
	}
	function stage(...entries) {
		const targets = {};
		entries.forEach(([building, level], i) => {
			targets[building] = {
				level,
				priority: (i + 1) * 10
			};
		});
		return { targets };
	}
	function troops(entries) {
		const out = {};
		entries.forEach(([unit, target], i) => {
			out[unit] = {
				enabled: false,
				target,
				priority: (i + 1) * 10,
				minBatch: 10
			};
		});
		return out;
	}
	function template(p) {
		return {
			name: p.name,
			buildStages: p.buildStages,
			specialBuildings: p.specialBuildings,
			populationFloor: {
				enabled: true,
				minFreePopulation: 30,
				farmLevels: 1
			},
			buildFocus: {
				academy28BeforeConquest: false,
				colonyShipFirst: false
			},
			researches: [...p.researches],
			avoidResearches: [...p.avoidResearches],
			troops: p.troops ?? {},
			autoBuild: true,
			autoResearch: true,
			autoRecruit: true,
			heroTownIds: [],
			recruitSpells: {},
			sendHeroes: false
		};
	}
	var LAND_UNIT_RESEARCHES = [
		"slinger",
		"archer",
		"hoplite",
		"rider",
		"chariot",
		"catapult"
	];
	var firstCity = template({
		name: "Primera ciudad (hasta barco colono)",
		buildStages: [
			stage(["main", 5], ["farm", 8], ["storage", 8], ["lumber", 10], ["stoner", 10], ["ironer", 10], ["barracks", 5], ["academy", 5], ["temple", 3], ["hide", 3]),
			stage(["main", 15], ["farm", 25], ["storage", 13], ["lumber", 25], ["stoner", 25], ["ironer", 25], ["academy", 13], ["market", 10], ["barracks", 10], ["docks", 10], ["wall", 10], ["temple", 5], ["hide", 5]),
			stage(["storage", 20], ["farm", 25], ["docks", 20], ["academy", 28])
		],
		specialBuildings: {
			slot1: null,
			slot2: null
		},
		researches: [
			"slinger",
			"diplomacy",
			"hoplite",
			"archer",
			"booty",
			"pottery",
			"town_guard",
			"rider",
			"instructor",
			"colonize_ship",
			"bireme",
			"attack_ship",
			"plow"
		],
		avoidResearches: ["espionage", "cryptography"],
		troops: troops([
			["sword", 150],
			["slinger", 150],
			["archer", 100],
			["hoplite", 150],
			["rider", 40],
			["big_transporter", 10],
			["bireme", 50]
		])
	});
	var navalOffensive = template({
		name: "Naval ofensiva (barcos ligeros)",
		buildStages: [
			stage(["farm", 20], ["storage", 20], ["lumber", 25], ["ironer", 20], ["docks", 15], ["academy", 13], ["main", 10], ["hide", 5], ["market", 5], ["barracks", 1], ["temple", 1]),
			stage(["farm", 40], ["storage", 30], ["lumber", 35], ["ironer", 28], ["docks", 30], ["academy", 30], ["market", 10], ["hide", 10]),
			stage(["lumber", 40], ["ironer", 30], ["stoner", 20], ["main", 24], ["special1", 1])
		],
		specialBuildings: {
			slot1: "thermal",
			slot2: null
		},
		researches: [
			"attack_ship",
			"shipwright",
			"booty",
			"pottery",
			"plow",
			"mathematics",
			"cartography",
			"ram",
			"bireme"
		],
		avoidResearches: [
			...LAND_UNIT_RESEARCHES,
			"espionage",
			"cryptography",
			"breach"
		],
		troops: troops([["attack_ship", 300]])
	});
	var navalDefensive = template({
		name: "Naval defensiva (birremes)",
		buildStages: [
			stage(["farm", 20], ["storage", 20], ["lumber", 25], ["stoner", 20], ["docks", 15], ["academy", 13], ["main", 10], ["hide", 5], ["market", 5], ["barracks", 1]),
			stage(["farm", 40], ["storage", 30], ["lumber", 35], ["stoner", 30], ["docks", 30], ["academy", 30], ["market", 10], ["hide", 10]),
			stage(["lumber", 40], ["ironer", 20], ["main", 24], ["special1", 1])
		],
		specialBuildings: {
			slot1: "thermal",
			slot2: null
		},
		researches: [
			"bireme",
			"shipwright",
			"booty",
			"pottery",
			"plow",
			"mathematics",
			"cartography",
			"attack_ship",
			"ram"
		],
		avoidResearches: [
			"espionage",
			"cryptography",
			"breach",
			"catapult"
		],
		troops: troops([["bireme", 300]])
	});
	var landOffensive = template({
		name: "Terrestre ofensiva",
		buildStages: [
			stage(["farm", 20], ["storage", 20], ["lumber", 20], ["stoner", 20], ["ironer", 20], ["barracks", 10], ["academy", 13], ["main", 10], ["hide", 5], ["market", 5]),
			stage(["farm", 40], ["storage", 30], ["lumber", 35], ["stoner", 35], ["ironer", 35], ["barracks", 25], ["academy", 30], ["docks", 20], ["wall", 15], ["temple", 10], ["hide", 10], ["market", 10]),
			stage(["barracks", 30], ["lumber", 40], ["stoner", 40], ["ironer", 40], ["wall", 25], ["main", 24], ["special1", 1], ["special2", 1])
		],
		specialBuildings: {
			slot1: "thermal",
			slot2: "tower"
		},
		researches: [
			"slinger",
			"rider",
			"hoplite",
			"pottery",
			"instructor",
			"meteorology",
			"conscription",
			"booty",
			"plow",
			"small_transporter",
			"berth",
			"catapult",
			"colonize_ship",
			"phalanx",
			"ram",
			"breach",
			"take_over"
		],
		avoidResearches: [
			"espionage",
			"cryptography",
			"archer"
		]
	});
	var landDefensive = template({
		name: "Terrestre defensiva",
		buildStages: [
			stage(["farm", 20], ["storage", 20], ["lumber", 20], ["stoner", 20], ["ironer", 15], ["barracks", 10], ["academy", 13], ["wall", 10], ["main", 10], ["hide", 5], ["market", 5]),
			stage(["farm", 40], ["storage", 30], ["lumber", 35], ["stoner", 35], ["ironer", 20], ["barracks", 15], ["academy", 30], ["wall", 25], ["docks", 20], ["temple", 15], ["hide", 10], ["market", 10]),
			stage(["lumber", 40], ["stoner", 40], ["barracks", 25], ["temple", 25], ["main", 15], ["special1", 1], ["special2", 1])
		],
		specialBuildings: {
			slot1: "thermal",
			slot2: "tower"
		},
		researches: [
			"slinger",
			"archer",
			"town_guard",
			"hoplite",
			"diplomacy",
			"booty",
			"pottery",
			"architecture",
			"instructor",
			"bireme",
			"building_crane",
			"shipwright",
			"conscription",
			"meteorology",
			"small_transporter",
			"plow",
			"berth",
			"phalanx",
			"mathematics",
			"ram",
			"cartography"
		],
		avoidResearches: [
			"catapult",
			"breach",
			"take_over",
			"espionage",
			"cryptography"
		],
		troops: troops([
			["sword", 150],
			["archer", 315],
			["hoplite", 255],
			["slinger", 100],
			["bireme", 250],
			["small_transporter", 45]
		])
	});
	function deepFreeze(value) {
		if (typeof value === "object" && value !== null) {
			for (const v of Object.values(value)) deepFreeze(v);
			Object.freeze(value);
		}
		return value;
	}
	var PREDEFINED_PROFILES = deepFreeze({
		inicio_cs: firstCity,
		naval_ofensiva: navalOffensive,
		naval_defensiva: navalDefensive,
		terrestre_ofensiva: landOffensive,
		terrestre_defensiva: landDefensive
	});
	function isPredefinedProfileId(id) {
		return Object.prototype.hasOwnProperty.call(PREDEFINED_PROFILES, id);
	}
	function resolveProfile(settings, id) {
		if (id === void 0) return null;
		if (isPredefinedProfileId(id)) return PREDEFINED_PROFILES[id] ?? null;
		return settings.profiles[id] ?? null;
	}
	function listProfiles(settings) {
		return [...Object.entries(PREDEFINED_PROFILES).map(([id, profile]) => ({
			id,
			profile,
			predefined: true
		})), ...Object.entries(settings.profiles).filter(([id]) => !isPredefinedProfileId(id)).map(([id, profile]) => ({
			id,
			profile,
			predefined: false
		}))];
	}
	function isRecord$4(value) {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}
	function isInt(value, min, max = Number.MAX_SAFE_INTEGER) {
		return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
	}
	function isRatio(value) {
		return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
	}
	var LOG_LEVELS = [
		"info",
		"success",
		"warn",
		"error"
	];
	var LANGUAGES = ["es", "en"];
	var isRegularBuildingId = (k) => isBuildingId(k) && !isSpecialBuildingId(k);
	function parseRules(raw, path, isKey, parseRule, errors) {
		const out = {};
		if (!isRecord$4(raw)) {
			errors.push(`${path}: debe ser un objeto`);
			return out;
		}
		for (const [key, value] of Object.entries(raw)) {
			const rulePath = `${path}.${key}`;
			if (!isKey(key)) {
				errors.push(`${rulePath}: ID desconocido`);
				continue;
			}
			if (!isRecord$4(value)) {
				errors.push(`${rulePath}: debe ser un objeto`);
				continue;
			}
			const rule = parseRule(value, rulePath, errors);
			if (rule) out[key] = rule;
		}
		return out;
	}
	var isStageKey = (k) => isRegularBuildingId(k) || SPECIAL_SLOT_KEYS.includes(k);
	function parseStages(raw, path, errors) {
		if (!Array.isArray(raw)) {
			errors.push(`${path}: debe ser una lista de tramos`);
			return [];
		}
		if (raw.length > 20) errors.push(`${path}: como mucho 20 tramos`);
		return raw.map((stage, i) => {
			const stagePath = `${path}[${i}]`;
			if (!isRecord$4(stage)) {
				errors.push(`${stagePath}: debe ser un objeto`);
				return { targets: {} };
			}
			return { targets: parseRules(stage.targets, `${stagePath}.targets`, isStageKey, (v, rulePath, errs) => {
				const before = errs.length;
				const maxLevel = rulePath.endsWith(".special1") || rulePath.endsWith(".special2") ? 1 : 100;
				if (!isInt(v.level, 0, maxLevel)) errs.push(`${rulePath}.level: entero entre 0 y ${maxLevel}`);
				if (!isInt(v.priority, 0, 1e3)) errs.push(`${rulePath}.priority: entero entre 0 y 1000`);
				if (errs.length > before) return null;
				return {
					level: v.level,
					priority: v.priority
				};
			}, errors) };
		});
	}
	function parseResearchList(raw, path, errors) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			errors.push(`${path}: debe ser una lista de IDs de investigación`);
			return [];
		}
		const out = [];
		raw.forEach((id, i) => {
			if (!isResearchId(id)) errors.push(`${path}[${i}]: ID desconocido`);
			else if (out.includes(id)) errors.push(`${path}[${i}]: ${id} repetida`);
			else out.push(id);
		});
		return out;
	}
	function parseTroopRule(v, path, errors) {
		const before = errors.length;
		if (typeof v.enabled !== "boolean") errors.push(`${path}.enabled: debe ser booleano`);
		if (!isInt(v.target, 0)) errors.push(`${path}.target: entero >= 0`);
		if (!isInt(v.priority, 0, 1e3)) errors.push(`${path}.priority: entero entre 0 y 1000`);
		if (!isInt(v.minBatch, 1)) errors.push(`${path}.minBatch: entero >= 1`);
		if (errors.length > before) return null;
		return {
			enabled: v.enabled,
			target: v.target,
			priority: v.priority,
			minBatch: v.minBatch
		};
	}
	function parseSpellRule(v, path, errors) {
		const before = errors.length;
		if (typeof v.enabled !== "boolean") errors.push(`${path}.enabled: debe ser booleano`);
		if (!isInt(v.fromFavor, 0, 1e4)) errors.push(`${path}.fromFavor: entero entre 0 y 10000`);
		if (!isInt(v.freeSlots, 0, 20)) errors.push(`${path}.freeSlots: entero entre 0 y 20`);
		if (errors.length > before) return null;
		return {
			enabled: v.enabled,
			fromFavor: v.fromFavor,
			freeSlots: v.freeSlots
		};
	}
	function parseProfile(raw, path = "profile") {
		const errors = [];
		if (!isRecord$4(raw)) return {
			profile: null,
			errors: [`${path}: debe ser un objeto`]
		};
		if (typeof raw.name !== "string" || raw.name.trim() === "") errors.push(`${path}.name: texto no vacío`);
		for (const flag of [
			"autoBuild",
			"autoResearch",
			"autoRecruit"
		]) if (typeof raw[flag] !== "boolean") errors.push(`${path}.${flag}: debe ser booleano`);
		const buildStages = parseStages(raw.buildStages, `${path}.buildStages`, errors);
		const researches = parseResearchList(raw.researches, `${path}.researches`, errors);
		const avoidResearches = parseResearchList(raw.avoidResearches, `${path}.avoidResearches`, errors);
		for (const id of avoidResearches) if (researches.includes(id)) errors.push(`${path}.avoidResearches: ${id} no puede estar también en researches`);
		const troops = parseRules(raw.troops, `${path}.troops`, isUnitId, parseTroopRule, errors);
		const extras = createProfileExtras();
		const specialBuildings = extras.specialBuildings;
		if (raw.specialBuildings !== void 0) {
			const sb = raw.specialBuildings;
			if (!isRecord$4(sb)) errors.push(`${path}.specialBuildings: debe ser un objeto`);
			else {
				if (sb.slot1 === null || SPECIAL_SLOT_1.includes(sb.slot1)) specialBuildings.slot1 = sb.slot1 ?? null;
				else if (sb.slot1 !== void 0) errors.push(`${path}.specialBuildings.slot1: ${SPECIAL_SLOT_1.join(", ")} o null`);
				if (sb.slot2 === null || SPECIAL_SLOT_2.includes(sb.slot2)) specialBuildings.slot2 = sb.slot2 ?? null;
				else if (sb.slot2 !== void 0) errors.push(`${path}.specialBuildings.slot2: ${SPECIAL_SLOT_2.join(", ")} o null`);
			}
		}
		const populationFloor = extras.populationFloor;
		if (raw.populationFloor !== void 0) {
			const pf = raw.populationFloor;
			if (!isRecord$4(pf)) errors.push(`${path}.populationFloor: debe ser un objeto`);
			else {
				if (typeof pf.enabled !== "boolean") errors.push(`${path}.populationFloor.enabled: booleano`);
				if (!isInt(pf.minFreePopulation, 0)) errors.push(`${path}.populationFloor.minFreePopulation: entero >= 0`);
				if (!isInt(pf.farmLevels, 1, 45)) errors.push(`${path}.populationFloor.farmLevels: entero entre 1 y 45`);
				Object.assign(populationFloor, {
					enabled: pf.enabled,
					minFreePopulation: pf.minFreePopulation,
					farmLevels: pf.farmLevels
				});
			}
		}
		const buildFocus = extras.buildFocus;
		if (raw.buildFocus !== void 0) {
			const bf = raw.buildFocus;
			if (!isRecord$4(bf)) errors.push(`${path}.buildFocus: debe ser un objeto`);
			else for (const key of ["academy28BeforeConquest", "colonyShipFirst"]) {
				if (bf[key] === void 0) continue;
				if (typeof bf[key] === "boolean") buildFocus[key] = bf[key];
				else errors.push(`${path}.buildFocus.${key}: debe ser booleano`);
			}
		}
		let heroTownIds = extras.heroTownIds;
		if (raw.heroTownIds !== void 0) {
			if (Array.isArray(raw.heroTownIds) && raw.heroTownIds.every((t) => typeof t === "string" && /^\d+$/.test(t))) heroTownIds = [...raw.heroTownIds];
			else errors.push(`${path}.heroTownIds: lista de IDs de ciudad (texto con dígitos)`);
		}
		const recruitSpells = raw.recruitSpells === void 0 ? extras.recruitSpells : parseRules(raw.recruitSpells, `${path}.recruitSpells`, isRecruitPowerId, parseSpellRule, errors);
		let sendHeroes = extras.sendHeroes;
		if (raw.sendHeroes !== void 0) {
			if (typeof raw.sendHeroes === "boolean") sendHeroes = raw.sendHeroes;
			else errors.push(`${path}.sendHeroes: debe ser booleano`);
		}
		if (errors.length > 0) return {
			profile: null,
			errors
		};
		return {
			profile: {
				name: raw.name.trim(),
				autoBuild: raw.autoBuild,
				autoResearch: raw.autoResearch,
				autoRecruit: raw.autoRecruit,
				buildStages,
				specialBuildings,
				populationFloor,
				buildFocus,
				researches,
				avoidResearches,
				troops,
				heroTownIds,
				recruitSpells,
				sendHeroes
			},
			errors
		};
	}
	function pick(raw, key, check, fallback, path, warnings) {
		if (!(key in raw)) return fallback;
		const value = raw[key];
		if (check(value)) return value;
		warnings.push(`${path}${key}: valor no válido, se usa el predeterminado`);
		return fallback;
	}
	var isBool = (v) => typeof v === "boolean";
	var isHour = (v) => isInt(v, 0, 23);
	var isPositiveInt = (v) => isInt(v, 1);
	var isNonNegativeInt = (v) => isInt(v, 0);
	var isTownIdOrNull = (v) => v === null || isInt(v, 1);
	var VILLAGE_RATIO_RANGE = {
		min: .25,
		max: 1.25
	};
	var isVillageRatio = (v) => typeof v === "number" && v >= VILLAGE_RATIO_RANGE.min && v <= VILLAGE_RATIO_RANGE.max;
	var MARKET_DELIVERY_RANGE = {
		min: 5,
		max: 2880
	};
	var MARKET_RATIO_RANGE = {
		min: 1,
		max: 3
	};
	var MARKET_MIN_TRADE_RANGE = {
		min: 0,
		max: 1e5
	};
	var MARKET_WITHDRAW_RANGE = {
		min: 0,
		max: 168
	};
	var MARKET_TRADES_RANGE = {
		min: 1,
		max: 20
	};
	var MARKET_PARTNERS = [
		"notEnemies",
		"all",
		"alliancePacts",
		"alliance"
	];
	var isMarketDelivery = (v) => isInt(v, MARKET_DELIVERY_RANGE.min, MARKET_DELIVERY_RANGE.max);
	var isMarketRatio = (v) => typeof v === "number" && v >= MARKET_RATIO_RANGE.min && v <= MARKET_RATIO_RANGE.max;
	var isMarketMinTrade = (v) => isInt(v, MARKET_MIN_TRADE_RANGE.min, MARKET_MIN_TRADE_RANGE.max);
	var isMarketWithdraw = (v) => isInt(v, MARKET_WITHDRAW_RANGE.min, MARKET_WITHDRAW_RANGE.max);
	var isMarketTrades = (v) => isInt(v, MARKET_TRADES_RANGE.min, MARKET_TRADES_RANGE.max);
	var isMarketPartners = (v) => typeof v === "string" && MARKET_PARTNERS.includes(v);
	var VILLAGE_LEVEL_RANGE = {
		min: 1,
		max: 6
	};
	var isVillageLevel = (v) => isInt(v, VILLAGE_LEVEL_RANGE.min, VILLAGE_LEVEL_RANGE.max);
	var MAX_RESERVE_POINTS = 1e5;
	var isReservePoints = (v) => isInt(v, 0, MAX_RESERVE_POINTS);
	var HIDE_AMOUNT_RANGE = {
		min: 100,
		max: 1e6
	};
	var isHideAmount = (v) => isInt(v, HIDE_AMOUNT_RANGE.min, HIDE_AMOUNT_RANGE.max);
	var isTownIdArray = (v) => Array.isArray(v) && v.every((id) => isInt(id, 1));
	var TRIUMPH_POINTS_RANGE = {
		min: 300,
		max: 1e5
	};
	var isTriumphPoints = (v) => isInt(v, TRIUMPH_POINTS_RANGE.min, TRIUMPH_POINTS_RANGE.max);
	var isBanditUnits = (v) => Array.isArray(v) && v.every(isBanditUnitId);
	var SPELL_REPEAT_RANGE = {
		min: 0,
		max: 10080
	};
	var isPowerId = (v) => typeof v === "string" && /^[a-z_]{1,64}$/.test(v);
	function parseScheduledSpells(raw, warnings) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			warnings.push("scheduledSpells.items: no es una lista, se descarta");
			return [];
		}
		const out = [];
		const ids = new Set();
		raw.forEach((item, i) => {
			const path = `scheduledSpells.items[${String(i)}]`;
			if (out.length >= 50) {
				warnings.push(`${path}: más de ${String(50)}, se descarta`);
				return;
			}
			if (!(isRecord$4(item) && typeof item.id === "string" && /^[\w-]{1,40}$/.test(item.id) && !ids.has(item.id) && typeof item.enabled === "boolean" && isInt(item.targetTownId, 1) && isPowerId(item.powerId) && isInt(item.at, 0) && isInt(item.repeatMinutes, SPELL_REPEAT_RANGE.min, SPELL_REPEAT_RANGE.max))) {
				warnings.push(`${path}: no válido, se descarta`);
				return;
			}
			ids.add(item.id);
			out.push({
				id: item.id,
				enabled: item.enabled,
				targetTownId: item.targetTownId,
				powerId: item.powerId,
				at: item.at,
				repeatMinutes: item.repeatMinutes
			});
		});
		return out;
	}
	var MILITIA_SECONDS_RANGE = {
		min: 30,
		max: 10800
	};
	var isMilitiaSeconds = (v) => isInt(v, MILITIA_SECONDS_RANGE.min, MILITIA_SECONDS_RANGE.max);
	function cleanNames(values) {
		const out = [];
		const seen = new Set();
		for (const value of values) {
			const name = value.trim().slice(0, 60);
			const key = name.toLowerCase();
			if (name === "" || seen.has(key)) continue;
			seen.add(key);
			out.push(name);
			if (out.length >= 100) break;
		}
		return out;
	}
	var isNameList = (v) => Array.isArray(v) && v.every((x) => typeof x === "string");
	var DODGE_BEFORE_RANGE = {
		min: 3,
		max: 600
	};
	var DODGE_OFFSET_RANGE = {
		min: 1,
		max: 3600
	};
	var BACKSNIPE_OFFSET_RANGE = {
		min: 0,
		max: 600
	};
	var DODGE_UNITS = [
		"offense",
		"defense",
		"all"
	];
	var DODGE_MIXED = [
		"offense",
		"defense",
		"both"
	];
	var DODGE_DESTINATIONS = [
		"nearest",
		"random",
		"town"
	];
	var DODGE_RETURNS = [
		"impact",
		"beforeColony",
		"afterColony"
	];
	var oneOf = (list) => (v) => typeof v === "string" && list.includes(v);
	var isDodgeMixed = oneOf(DODGE_MIXED);
	var ATTACK_SPELL_SECONDS_RANGE = {
		min: 10,
		max: 3600
	};
	var isAttackSpellSeconds = (v) => isInt(v, ATTACK_SPELL_SECONDS_RANGE.min, ATTACK_SPELL_SECONDS_RANGE.max);
	var isAttackSpellWhen = oneOf(["midway", "end"]);
	function parseDodgeTowns(raw, warnings) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			warnings.push("defense.dodgeTowns: no es una lista, se descarta");
			return [];
		}
		const out = [];
		const towns = new Set();
		raw.forEach((item, i) => {
			const path = `defense.dodgeTowns[${String(i)}]`;
			if (out.length >= 500) {
				warnings.push(`${path}: más de ${String(500)}, se descarta`);
				return;
			}
			if (!(isRecord$4(item) && isInt(item.townId, 1) && !towns.has(item.townId) && typeof item.enabled === "boolean" && typeof item.land === "boolean" && typeof item.fleet === "boolean" && typeof item.separate === "boolean" && oneOf(DODGE_UNITS)(item.units) && isInt(item.secondsBefore, DODGE_BEFORE_RANGE.min, DODGE_BEFORE_RANGE.max) && oneOf(DODGE_DESTINATIONS)(item.destination) && (item.destinationTownId === null || isInt(item.destinationTownId, 1)) && oneOf(DODGE_RETURNS)(item.returnMode) && isInt(item.returnOffset, DODGE_OFFSET_RANGE.min, DODGE_OFFSET_RANGE.max) && (item.backsnipe === void 0 || typeof item.backsnipe === "boolean") && (item.backsnipeOffset === void 0 || isInt(item.backsnipeOffset, BACKSNIPE_OFFSET_RANGE.min, BACKSNIPE_OFFSET_RANGE.max)))) {
				warnings.push(`${path}: no válido, se descarta`);
				return;
			}
			towns.add(item.townId);
			const fresh = createDodgeTown(item.townId);
			out.push({
				townId: item.townId,
				enabled: item.enabled,
				land: item.land,
				fleet: item.fleet,
				separate: item.separate,
				units: item.units,
				secondsBefore: item.secondsBefore,
				destination: item.destination,
				destinationTownId: item.destinationTownId,
				returnMode: item.returnMode,
				returnOffset: item.returnOffset,
				backsnipe: item.backsnipe ?? fresh.backsnipe,
				backsnipeOffset: item.backsnipeOffset ?? fresh.backsnipeOffset
			});
		});
		return out;
	}
	var TIMED_TOLERANCE_RANGE = {
		min: 0,
		max: 600
	};
	var TIMED_TRAVEL_RANGE = {
		min: 1,
		max: 604800
	};
	var MAX_TIMED_UNITS = 1e6;
	var isEntryId = (v) => typeof v === "string" && /^[\w-]{1,40}$/.test(v);
	var isCommandType = (v) => v === "attack" || v === "support";
	var isTolerance = (v) => isInt(v, TIMED_TOLERANCE_RANGE.min, TIMED_TOLERANCE_RANGE.max);
	function parseTimedUnits(raw) {
		if (!isRecord$4(raw)) return null;
		const out = {};
		for (const [unit, n] of Object.entries(raw)) {
			if (!isUnitId(unit) || !isInt(n, 1, MAX_TIMED_UNITS)) return null;
			out[unit] = n;
		}
		return Object.keys(out).length > 0 ? out : null;
	}
	function parseTimedCommands(raw, warnings) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			warnings.push("timedCommands.items: no es una lista, se descarta");
			return [];
		}
		const out = [];
		const ids = new Set();
		raw.forEach((item, i) => {
			const path = `timedCommands.items[${String(i)}]`;
			if (out.length >= 50) {
				warnings.push(`${path}: más de ${String(50)}, se descarta`);
				return;
			}
			const units = isRecord$4(item) ? parseTimedUnits(item.units) : null;
			if (!(isRecord$4(item) && units !== null && isEntryId(item.id) && !ids.has(item.id) && typeof item.enabled === "boolean" && isCommandType(item.type) && isInt(item.fromTownId, 1) && isInt(item.targetTownId, 1) && isInt(item.arrivalAt, 0) && isTolerance(item.early) && isTolerance(item.late) && (item.travelSeconds === null || isInt(item.travelSeconds, TIMED_TRAVEL_RANGE.min, TIMED_TRAVEL_RANGE.max)) && (item.powerId === null || isPowerId(item.powerId)) && typeof item.tuning === "boolean")) {
				warnings.push(`${path}: no válido, se descarta`);
				return;
			}
			ids.add(item.id);
			out.push({
				id: item.id,
				enabled: item.enabled,
				type: item.type,
				fromTownId: item.fromTownId,
				targetTownId: item.targetTownId,
				units,
				arrivalAt: item.arrivalAt,
				early: item.early,
				late: item.late,
				travelSeconds: item.travelSeconds,
				powerId: item.powerId,
				tuning: item.tuning
			});
		});
		return out;
	}
	function parseTimedRecords(raw, warnings) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			warnings.push("timedCommands.done: no es una lista, se descarta");
			return [];
		}
		const out = [];
		raw.forEach((item, i) => {
			if (!(isRecord$4(item) && isEntryId(item.id) && isCommandType(item.type) && isInt(item.fromTownId, 1) && isInt(item.targetTownId, 1) && isInt(item.arrivalAt, 0) && typeof item.ok === "boolean" && typeof item.text === "string" && typeof item.at === "number" && Number.isFinite(item.at))) {
				warnings.push(`timedCommands.done[${String(i)}]: no válido, se descarta`);
				return;
			}
			out.push({
				id: item.id,
				type: item.type,
				fromTownId: item.fromTownId,
				targetTownId: item.targetTownId,
				arrivalAt: item.arrivalAt,
				ok: item.ok,
				text: item.text.slice(0, 500),
				at: item.at
			});
		});
		return out.slice(-100);
	}
	var MAX_RAID_UNITS = 1e5;
	function parseRaidUnits(raw) {
		if (!isRecord$4(raw)) return null;
		const out = {};
		for (const [unit, n] of Object.entries(raw)) {
			if (!isUnitId(unit) || !isInt(n, 1, 1e5)) return null;
			out[unit] = n;
		}
		return out;
	}
	function parseRaidTemplates(raw, warnings) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			warnings.push("cityFarm.templates: no es una lista, se descarta");
			return [];
		}
		const out = [];
		const ids = new Set();
		raw.forEach((item, i) => {
			const path = `cityFarm.templates[${String(i)}]`;
			if (out.length >= 50) {
				warnings.push(`${path}: más de ${String(50)}, se descarta`);
				return;
			}
			const units = isRecord$4(item) ? parseRaidUnits(item.units) : null;
			const name = isRecord$4(item) && typeof item.name === "string" ? item.name.trim() : "";
			if (!isRecord$4(item) || units === null || !isEntryId(item.id) || ids.has(item.id) || name === "" || name.length > 40) {
				warnings.push(`${path}: no válido, se descarta`);
				return;
			}
			ids.add(item.id);
			out.push({
				id: item.id,
				name,
				units
			});
		});
		return out;
	}
	function parseCityFarmTargets(raw, warnings) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			warnings.push("cityFarm.targets: no es una lista, se descarta");
			return [];
		}
		const out = [];
		const ids = new Set();
		const pairs = new Set();
		raw.forEach((item, i) => {
			const path = `cityFarm.targets[${String(i)}]`;
			if (out.length >= 300) {
				warnings.push(`${path}: más de ${String(300)}, se descarta`);
				return;
			}
			if (!(isRecord$4(item) && isEntryId(item.id) && !ids.has(item.id) && typeof item.enabled === "boolean" && isInt(item.targetTownId, 1) && isInt(item.fromTownId, 1) && item.targetTownId !== item.fromTownId && !pairs.has(`${String(item.fromTownId)}>${String(item.targetTownId)}`) && isEntryId(item.templateId) && (item.ownerId === null || isInt(item.ownerId, 0)) && typeof item.ownerChanged === "boolean" && isInt(item.sends, 0) && (item.lastSentAt === null || isInt(item.lastSentAt, 0)))) {
				warnings.push(`${path}: no válido, se descarta`);
				return;
			}
			ids.add(item.id);
			pairs.add(`${String(item.fromTownId)}>${String(item.targetTownId)}`);
			out.push({
				id: item.id,
				enabled: item.enabled,
				targetTownId: item.targetTownId,
				fromTownId: item.fromTownId,
				templateId: item.templateId,
				ownerId: item.ownerId,
				ownerChanged: item.ownerChanged,
				sends: item.sends,
				lastSentAt: item.lastSentAt
			});
		});
		return out;
	}
	var SEARCH_RADIUS_RANGE = {
		min: 1,
		max: 100
	};
	var SEARCH_INACTIVE_RANGE = {
		min: 0,
		max: 90
	};
	var isSearchRadius = (v) => isInt(v, SEARCH_RADIUS_RANGE.min, SEARCH_RADIUS_RANGE.max);
	var isSearchInactive = (v) => isInt(v, SEARCH_INACTIVE_RANGE.min, SEARCH_INACTIVE_RANGE.max);
	var isPointsLimit = (v) => v === null || isInt(v, 1, 1e8);
	var WORLD_REFRESH_RANGE = {
		min: 1,
		max: 24
	};
	var isWorldRefresh = (v) => isInt(v, WORLD_REFRESH_RANGE.min, WORLD_REFRESH_RANGE.max);
	var WATCH_RADIUS_RANGE = {
		min: 0,
		max: 100
	};
	var WATCH_INACTIVE_RANGE = {
		min: 1,
		max: 90
	};
	var isWatchRadius = (v) => isInt(v, WATCH_RADIUS_RANGE.min, WATCH_RADIUS_RANGE.max);
	var isWatchInactive = (v) => isInt(v, WATCH_INACTIVE_RANGE.min, WATCH_INACTIVE_RANGE.max);
	var DISCORD_WEBHOOK_RE = /^https:\/\/(?:(?:ptb|canary)\.)?discord(?:app)?\.com\/api\/webhooks\/\d{1,25}\/[\w-]{1,100}$/;
	var isDiscordWebhook = (v) => typeof v === "string" && DISCORD_WEBHOOK_RE.test(v);
	var isWebhookOrEmpty = (v) => v === "" || isDiscordWebhook(v);
	var ALERT_TYPES = [
		"attacks",
		"conquest",
		"combat",
		"finished",
		"monitor"
	];
	var MA_FACTOR_RANGE = {
		min: 2,
		max: 20
	};
	var isMaFactor = (v) => isInt(v, MA_FACTOR_RANGE.min, MA_FACTOR_RANGE.max);
	function parseIdList(raw, max, path, warnings) {
		if (raw === void 0) return [];
		if (!Array.isArray(raw)) {
			warnings.push(`${path}: no es una lista, se descarta`);
			return [];
		}
		const out = [];
		for (const [i, v] of raw.entries()) {
			if (!isInt(v, 1) || out.includes(v) || out.length >= max) {
				warnings.push(`${path}[${String(i)}]: no válido, se descarta`);
				continue;
			}
			out.push(v);
		}
		return out;
	}
	var isFarmInterval = (v) => FARM_INTERVALS.includes(v);
	var isTownIdList = (v) => v === "all" || Array.isArray(v) && v.every((id) => isInt(id, 1));
	var isClaimsPerCycle = (v) => isInt(v, 1, 200);
	var isQueueSlots = (v) => isInt(v, 1, 7);
	var isLanguage = (v) => LANGUAGES.includes(v);
	function toLogEntry(v) {
		if (!isRecord$4(v) || typeof v.ts !== "number" || typeof v.message !== "string" || !LOG_LEVELS.includes(v.level)) return null;
		const level = v.level;
		const entry = {
			ts: v.ts,
			level,
			message: v.message,
			tab: LOG_TABS.includes(v.tab) ? v.tab : level === "error" ? "errors" : "activity"
		};
		if (typeof v.town === "string") entry.town = v.town;
		if (typeof v.reason === "string") entry.reason = v.reason;
		if (v.muted === true) entry.muted = true;
		return entry;
	}
	function parseTownQueue(raw, path, warnings) {
		if (!Array.isArray(raw)) {
			warnings.push(`${path}: no es una lista, se descarta`);
			return [];
		}
		const out = [];
		raw.forEach((item, i) => {
			const building = isRecord$4(item) ? item.building : void 0;
			const level = isRecord$4(item) ? item.level : void 0;
			if (!isBuildingId(building) || !isInt(level, 1, BUILDING_MAX_LEVELS[building])) {
				warnings.push(`${path}[${String(i)}]: objetivo no válido, se quita`);
				return;
			}
			if (out.some((o) => o.building === building)) {
				warnings.push(`${path}[${String(i)}]: ${building} repetido, se quita`);
				return;
			}
			out.push({
				building,
				level
			});
		});
		if (out.length > 40) {
			warnings.push(`${path}: más de ${String(40)} objetivos, se recorta`);
			out.length = 40;
		}
		return out;
	}
	function normalizeSettings(raw) {
		const d = createDefaultSettings();
		const warnings = [];
		if (!isRecord$4(raw)) {
			warnings.push("ajustes: no es un objeto, se usan los predeterminados");
			return {
				settings: d,
				warnings
			};
		}
		const sub = (key) => {
			const v = raw[key];
			if (v === void 0) return {};
			if (isRecord$4(v)) return v;
			warnings.push(`${key}: valor no válido, se usa el predeterminado`);
			return {};
		};
		const poll = sub("pollIntervalMs");
		let minMs = pick(poll, "minMs", isPositiveInt, d.pollIntervalMs.minMs, "pollIntervalMs.", warnings);
		let maxMs = pick(poll, "maxMs", isPositiveInt, d.pollIntervalMs.maxMs, "pollIntervalMs.", warnings);
		if (minMs > maxMs) {
			warnings.push("pollIntervalMs: minMs > maxMs, se intercambian");
			[minMs, maxMs] = [maxMs, minMs];
		}
		const rest = sub("rest");
		const farm = sub("farmVillages");
		const trade = sub("autoTrade");
		const village = sub("villageTrade");
		const expansion = sub("villageExpansion");
		const market = sub("market");
		const dMarket = d.market;
		const marketPick = (key, isValid, fallback) => pick(market, key, isValid, fallback, "market.", warnings);
		const maxPayRatio = marketPick("maxPayRatio", isMarketRatio, dMarket.maxPayRatio);
		let overflowPayRatio = marketPick("overflowPayRatio", isMarketRatio, dMarket.overflowPayRatio);
		if (overflowPayRatio < maxPayRatio) {
			warnings.push("market.overflowPayRatio: menor que maxPayRatio, se iguala");
			overflowPayRatio = maxPayRatio;
		}
		const hide = sub("hide");
		const fest = sub("festivals");
		const bandits = sub("bandits");
		const missions = sub("missions");
		const spells = sub("scheduledSpells");
		const timed = sub("timedCommands");
		const defense = sub("defense");
		const cityFarm = sub("cityFarm");
		const search = isRecord$4(cityFarm.search) ? cityFarm.search : {};
		if (cityFarm.search !== void 0 && !isRecord$4(cityFarm.search)) warnings.push("cityFarm.search: valor no válido, se usa el predeterminado");
		const ds = d.cityFarm.search;
		const P = "cityFarm.search.";
		const intel = sub("intel");
		const watch = isRecord$4(intel.watch) ? intel.watch : {};
		if (intel.watch !== void 0 && !isRecord$4(intel.watch)) warnings.push("intel.watch: valor no válido, se usa el predeterminado");
		const dw = d.intel.watch;
		const W = "intel.watch.";
		const monitor = isRecord$4(intel.monitor) ? intel.monitor : {};
		if (intel.monitor !== void 0 && !isRecord$4(intel.monitor)) warnings.push("intel.monitor: valor no válido, se usa el predeterminado");
		const dm = d.intel.monitor;
		const M = "intel.monitor.";
		const alerts = isRecord$4(intel.alerts) ? intel.alerts : {};
		if (intel.alerts !== void 0 && !isRecord$4(intel.alerts)) warnings.push("intel.alerts: valor no válido, se usa el predeterminado");
		const alertTypes = isRecord$4(alerts.types) ? alerts.types : {};
		if (alerts.types !== void 0 && !isRecord$4(alerts.types)) warnings.push("intel.alerts.types: valor no válido, se usa el predeterminado");
		const da = d.intel.alerts;
		const parsedAlertTypes = {};
		for (const type of ALERT_TYPES) {
			const raw = alertTypes[type];
			if (raw !== void 0 && !isRecord$4(raw)) warnings.push(`intel.alerts.types.${type}: valor no válido, se usa el predeterminado`);
			const t = isRecord$4(raw) ? raw : {};
			const P2 = `intel.alerts.types.${type}.`;
			parsedAlertTypes[type] = {
				enabled: pick(t, "enabled", isBool, da.types[type].enabled, P2, warnings),
				webhook: pick(t, "webhook", isWebhookOrEmpty, da.types[type].webhook, P2, warnings)
			};
		}
		const profiles = {};
		const rawProfiles = raw.profiles === void 0 ? d.profiles : raw.profiles;
		if (isRecord$4(rawProfiles)) for (const [id, p] of Object.entries(rawProfiles)) {
			if (isPredefinedProfileId(id)) {
				warnings.push(`profiles.${id}: el ID es de un perfil predefinido, se descarta`);
				continue;
			}
			const result = parseProfile(p, `profiles.${id}`);
			if (result.profile) profiles[id] = result.profile;
			else warnings.push(...result.errors, `profiles.${id}: perfil descartado`);
		}
		else warnings.push("profiles: valor no válido, se descartan");
		const townProfiles = {};
		if (isRecord$4(raw.townProfiles)) for (const [townId, profileId] of Object.entries(raw.townProfiles)) if (typeof profileId === "string" && (profileId in profiles || isPredefinedProfileId(profileId))) townProfiles[townId] = profileId;
		else warnings.push(`townProfiles.${townId}: perfil inexistente, se quita la asignación`);
		const townQueues = {};
		if (isRecord$4(raw.townQueues)) for (const [townId, list] of Object.entries(raw.townQueues)) {
			if (!/^\d+$/.test(townId)) {
				warnings.push(`townQueues.${townId}: ID de ciudad no válido, se descarta`);
				continue;
			}
			const queue = parseTownQueue(list, `townQueues.${townId}`, warnings);
			if (queue.length > 0) townQueues[townId] = queue;
		}
		else if (raw.townQueues !== void 0) warnings.push("townQueues: valor no válido, se descartan");
		const logs = Array.isArray(raw.logs) ? raw.logs.map(toLogEntry).filter((e) => e !== null) : [];
		const masters = sub("masters");
		return {
			settings: {
				schemaVersion: 3,
				enabled: pick(raw, "enabled", isBool, d.enabled, "", warnings),
				dryRun: pick(raw, "dryRun", isBool, d.dryRun, "", warnings),
				masters: {
					autoBuild: pick(masters, "autoBuild", isBool, d.masters.autoBuild, "masters.", warnings),
					autoResearch: pick(masters, "autoResearch", isBool, d.masters.autoResearch, "masters.", warnings),
					autoRecruit: pick(masters, "autoRecruit", isBool, d.masters.autoRecruit, "masters.", warnings),
					heroDispatch: pick(masters, "heroDispatch", isBool, d.masters.heroDispatch, "masters.", warnings)
				},
				pollIntervalMs: {
					minMs,
					maxMs
				},
				rest: {
					enabled: pick(rest, "enabled", isBool, d.rest.enabled, "rest.", warnings),
					startHour: pick(rest, "startHour", isHour, d.rest.startHour, "rest.", warnings),
					endHour: pick(rest, "endHour", isHour, d.rest.endHour, "rest.", warnings)
				},
				buildQueueSlots: pick(raw, "buildQueueSlots", isQueueSlots, d.buildQueueSlots, "", warnings),
				freeFinish: pick(raw, "freeFinish", isBool, d.freeFinish, "", warnings),
				farmVillages: {
					enabled: pick(farm, "enabled", isBool, d.farmVillages.enabled, "farmVillages.", warnings),
					intervalSeconds: pick(farm, "intervalSeconds", isFarmInterval, d.farmVillages.intervalSeconds, "farmVillages.", warnings),
					collectLongestBeforeRest: pick(farm, "collectLongestBeforeRest", isBool, d.farmVillages.collectLongestBeforeRest, "farmVillages.", warnings),
					townIds: pick(farm, "townIds", isTownIdList, d.farmVillages.townIds, "farmVillages.", warnings),
					maxClaimsPerCycle: pick(farm, "maxClaimsPerCycle", isClaimsPerCycle, d.farmVillages.maxClaimsPerCycle, "farmVillages.", warnings)
				},
				autoTrade: {
					enabled: pick(trade, "enabled", isBool, d.autoTrade.enabled, "autoTrade.", warnings),
					minDonorFillRatio: pick(trade, "minDonorFillRatio", isRatio, d.autoTrade.minDonorFillRatio, "autoTrade.", warnings),
					reserveRatio: pick(trade, "reserveRatio", isRatio, d.autoTrade.reserveRatio, "autoTrade.", warnings),
					minSendAmount: pick(trade, "minSendAmount", isNonNegativeInt, d.autoTrade.minSendAmount, "autoTrade.", warnings),
					maxTransfersPerCycle: pick(trade, "maxTransfersPerCycle", isPositiveInt, d.autoTrade.maxTransfersPerCycle, "autoTrade.", warnings),
					poolEnabled: pick(trade, "poolEnabled", isBool, d.autoTrade.poolEnabled, "autoTrade.", warnings),
					poolTownId: pick(trade, "poolTownId", isTownIdOrNull, d.autoTrade.poolTownId, "autoTrade.", warnings),
					poolAllied: pick(trade, "poolAllied", isBool, d.autoTrade.poolAllied, "autoTrade.", warnings)
				},
				villageTrade: {
					enabled: pick(village, "enabled", isBool, d.villageTrade.enabled, "villageTrade.", warnings),
					minRatio: pick(village, "minRatio", isVillageRatio, d.villageTrade.minRatio, "villageTrade.", warnings),
					minAmount: pick(village, "minAmount", isNonNegativeInt, d.villageTrade.minAmount, "villageTrade.", warnings)
				},
				villageExpansion: {
					enabled: pick(expansion, "enabled", isBool, d.villageExpansion.enabled, "villageExpansion.", warnings),
					maxLevel: pick(expansion, "maxLevel", isVillageLevel, d.villageExpansion.maxLevel, "villageExpansion.", warnings),
					reservePoints: pick(expansion, "reservePoints", isReservePoints, d.villageExpansion.reservePoints, "villageExpansion.", warnings)
				},
				market: {
					enabled: marketPick("enabled", isBool, dMarket.enabled),
					balance: marketPick("balance", isBool, dMarket.balance),
					maxDeliveryMinutes: marketPick("maxDeliveryMinutes", isMarketDelivery, dMarket.maxDeliveryMinutes),
					maxPayRatio,
					overflowPayRatio,
					minTrade: marketPick("minTrade", isMarketMinTrade, dMarket.minTrade),
					withdrawAfterHours: marketPick("withdrawAfterHours", isMarketWithdraw, dMarket.withdrawAfterHours),
					tradesPerRound: marketPick("tradesPerRound", isMarketTrades, dMarket.tradesPerRound),
					partners: marketPick("partners", isMarketPartners, dMarket.partners)
				},
				hide: {
					enabled: pick(hide, "enabled", isBool, d.hide.enabled, "hide.", warnings),
					amount: pick(hide, "amount", isHideAmount, d.hide.amount, "hide.", warnings),
					excludedTownIds: [...new Set(pick(hide, "excludedTownIds", isTownIdArray, d.hide.excludedTownIds, "hide.", warnings))]
				},
				festivals: {
					enabled: pick(fest, "enabled", isBool, d.festivals.enabled, "festivals.", warnings),
					party: pick(fest, "party", isBool, d.festivals.party, "festivals.", warnings),
					theater: pick(fest, "theater", isBool, d.festivals.theater, "festivals.", warnings),
					triumph: pick(fest, "triumph", isBool, d.festivals.triumph, "festivals.", warnings),
					triumphMinPoints: pick(fest, "triumphMinPoints", isTriumphPoints, d.festivals.triumphMinPoints, "festivals.", warnings),
					townIds: [...new Set(pick(fest, "townIds", isTownIdArray, d.festivals.townIds, "festivals.", warnings))]
				},
				bandits: {
					enabled: pick(bandits, "enabled", isBool, d.bandits.enabled, "bandits.", warnings),
					townId: pick(bandits, "townId", isTownIdOrNull, d.bandits.townId, "bandits.", warnings),
					units: [...new Set(pick(bandits, "units", isBanditUnits, d.bandits.units, "bandits.", warnings))]
				},
				missions: {
					enabled: pick(missions, "enabled", isBool, d.missions.enabled, "missions.", warnings),
					beginner: pick(missions, "beginner", isBool, d.missions.beginner, "missions.", warnings),
					islandRewards: pick(missions, "islandRewards", isBool, d.missions.islandRewards, "missions.", warnings)
				},
				scheduledSpells: {
					enabled: pick(spells, "enabled", isBool, d.scheduledSpells.enabled, "scheduledSpells.", warnings),
					items: parseScheduledSpells(spells.items, warnings)
				},
				timedCommands: {
					enabled: pick(timed, "enabled", isBool, d.timedCommands.enabled, "timedCommands.", warnings),
					items: parseTimedCommands(timed.items, warnings),
					done: parseTimedRecords(timed.done, warnings),
					defaultEarly: pick(timed, "defaultEarly", isTolerance, d.timedCommands.defaultEarly, "timedCommands.", warnings),
					defaultLate: pick(timed, "defaultLate", isTolerance, d.timedCommands.defaultLate, "timedCommands.", warnings)
				},
				defense: {
					enabled: pick(defense, "enabled", isBool, d.defense.enabled, "defense.", warnings),
					ignorePlayers: cleanNames(pick(defense, "ignorePlayers", isNameList, d.defense.ignorePlayers, "defense.", warnings)),
					ignoreAlliances: cleanNames(pick(defense, "ignoreAlliances", isNameList, d.defense.ignoreAlliances, "defense.", warnings)),
					ignoreOwnAlliance: pick(defense, "ignoreOwnAlliance", isBool, d.defense.ignoreOwnAlliance, "defense.", warnings),
					militiaSeconds: pick(defense, "militiaSeconds", isMilitiaSeconds, d.defense.militiaSeconds, "defense.", warnings),
					militiaTownIds: [...new Set(pick(defense, "militiaTownIds", isTownIdArray, d.defense.militiaTownIds, "defense.", warnings))],
					mixedUnits: pick(defense, "mixedUnits", isDodgeMixed, d.defense.mixedUnits, "defense.", warnings),
					dodgeTowns: parseDodgeTowns(defense.dodgeTowns, warnings),
					spellEnabled: pick(defense, "spellEnabled", isBool, d.defense.spellEnabled, "defense.", warnings),
					spellPowerId: pick(defense, "spellPowerId", (v) => v === null || isPowerId(v), d.defense.spellPowerId, "defense.", warnings),
					spellWhen: pick(defense, "spellWhen", isAttackSpellWhen, d.defense.spellWhen, "defense.", warnings),
					spellSeconds: pick(defense, "spellSeconds", isAttackSpellSeconds, d.defense.spellSeconds, "defense.", warnings),
					spellTownIds: [...new Set(pick(defense, "spellTownIds", isTownIdArray, d.defense.spellTownIds, "defense.", warnings))]
				},
				cityFarm: {
					enabled: pick(cityFarm, "enabled", isBool, d.cityFarm.enabled, "cityFarm.", warnings),
					templates: parseRaidTemplates(cityFarm.templates, warnings),
					targets: parseCityFarmTargets(cityFarm.targets, warnings),
					search: {
						radius: pick(search, "radius", isSearchRadius, ds.radius, P, warnings),
						minInactiveDays: pick(search, "minInactiveDays", isSearchInactive, ds.minInactiveDays, P, warnings),
						maxPlayerPoints: pick(search, "maxPlayerPoints", isPointsLimit, ds.maxPlayerPoints, P, warnings),
						maxTownPoints: pick(search, "maxTownPoints", isPointsLimit, ds.maxTownPoints, P, warnings),
						includeGhosts: pick(search, "includeGhosts", isBool, ds.includeGhosts, P, warnings),
						excludeOwnAlliance: pick(search, "excludeOwnAlliance", isBool, ds.excludeOwnAlliance, P, warnings)
					}
				},
				intel: {
					worldRefreshHours: pick(intel, "worldRefreshHours", isWorldRefresh, d.intel.worldRefreshHours, "intel.", warnings),
					ghostRadius: pick(intel, "ghostRadius", isSearchRadius, d.intel.ghostRadius, "intel.", warnings),
					watch: {
						enabled: pick(watch, "enabled", isBool, dw.enabled, W, warnings),
						autoRadius: pick(watch, "autoRadius", isWatchRadius, dw.autoRadius, W, warnings),
						inactiveDays: pick(watch, "inactiveDays", isWatchInactive, dw.inactiveDays, W, warnings),
						pinned: parseIdList(watch.pinned, 100, "intel.watch.pinned", warnings)
					},
					monitor: {
						enabled: pick(monitor, "enabled", isBool, dm.enabled, M, warnings),
						allianceIds: parseIdList(monitor.allianceIds, 10, "intel.monitor.allianceIds", warnings),
						maFactor: pick(monitor, "maFactor", isMaFactor, dm.maFactor, M, warnings)
					},
					alerts: {
						enabled: pick(alerts, "enabled", isBool, da.enabled, "intel.alerts.", warnings),
						webhook: pick(alerts, "webhook", isWebhookOrEmpty, da.webhook, "intel.alerts.", warnings),
						types: parsedAlertTypes
					}
				},
				language: pick(raw, "language", isLanguage, d.language, "", warnings),
				profiles,
				townProfiles,
				townQueues,
				logs: logs.slice(-200)
			},
			warnings
		};
	}
	function migrateProfileV1toV2(raw) {
		if (!isRecord$4(raw)) return raw;
		const profile = { ...raw };
		const flip = (section) => {
			if (!isRecord$4(section)) return section;
			const out = {};
			for (const [id, rule] of Object.entries(section)) out[id] = isRecord$4(rule) && typeof rule.priority === "number" ? {
				...rule,
				priority: 1e3 - rule.priority
			} : rule;
			return out;
		};
		const specials = [...SPECIAL_SLOT_1, ...SPECIAL_SLOT_2];
		const original = profile.buildings;
		const buildings = isRecord$4(original) ? Object.fromEntries(Object.entries(original).filter(([id]) => !specials.includes(id))) : original;
		const specialBuildings = {
			slot1: null,
			slot2: null
		};
		if (isRecord$4(original)) {
			const pickSlot = (ids) => {
				let best = null;
				for (const id of ids) {
					const rule = original[id];
					if (!isRecord$4(rule) || rule.enabled !== true) continue;
					const priority = typeof rule.priority === "number" ? rule.priority : 0;
					if (!best || priority > best.priority) best = {
						id,
						priority
					};
				}
				return best?.id ?? null;
			};
			specialBuildings.slot1 = pickSlot(SPECIAL_SLOT_1);
			specialBuildings.slot2 = pickSlot(SPECIAL_SLOT_2);
		}
		profile.buildings = flip(buildings);
		profile.researches = flip(profile.researches);
		profile.troops = flip(profile.troops);
		profile.specialBuildings = specialBuildings;
		return profile;
	}
	function nearestFarmInterval(value) {
		if (typeof value !== "number") return FARM_INTERVALS[0];
		let best = FARM_INTERVALS[0];
		for (const option of FARM_INTERVALS) if (Math.abs(option - value) < Math.abs(best - value)) best = option;
		return best;
	}
	function migrateSettingsV1toV2(data) {
		const out = { ...data };
		if (isRecord$4(data.profiles)) {
			const profiles = {};
			for (const [id, p] of Object.entries(data.profiles)) profiles[id] = migrateProfileV1toV2(p);
			out.profiles = profiles;
		}
		if (isRecord$4(data.farmVillages)) out.farmVillages = {
			...data.farmVillages,
			intervalSeconds: nearestFarmInterval(data.farmVillages.intervalSeconds)
		};
		if (isRecord$4(data.autoTrade)) {
			const trade = { ...data.autoTrade };
			if (trade.minDonorFillRatio === .8) trade.minDonorFillRatio = .75;
			if (trade.reserveRatio === .3) trade.reserveRatio = .05;
			out.autoTrade = trade;
		}
		return out;
	}
	function migrateProfileV2toV3(raw) {
		if (!isRecord$4(raw)) return raw;
		const { buildings, ...profile } = { ...raw };
		const targets = {};
		let maxPriority = 0;
		if (isRecord$4(buildings)) for (const [id, rule] of Object.entries(buildings)) {
			if (!isRecord$4(rule) || rule.enabled !== true) continue;
			targets[id] = {
				level: rule.targetLevel,
				priority: rule.priority
			};
			if (typeof rule.priority === "number") maxPriority = Math.max(maxPriority, rule.priority);
		}
		const specials = isRecord$4(profile.specialBuildings) ? profile.specialBuildings : {};
		for (const [slot, key] of [["slot1", "special1"], ["slot2", "special2"]]) {
			if (typeof specials[slot] !== "string") continue;
			maxPriority = Math.min(1e3, maxPriority + 10);
			targets[key] = {
				level: 1,
				priority: maxPriority
			};
		}
		profile.buildStages = Object.keys(targets).length > 0 ? [{ targets }] : [];
		const researches = [];
		if (isRecord$4(profile.researches)) for (const [id, rule] of Object.entries(profile.researches)) {
			if (!isRecord$4(rule) || rule.enabled !== true) continue;
			researches.push({
				id,
				priority: typeof rule.priority === "number" ? rule.priority : 0
			});
		}
		profile.researches = researches.sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id)).map((r) => r.id);
		profile.avoidResearches = [];
		return profile;
	}
	var LEGACY_EXAMPLE_PROFILES = {
		"naval-ofensivo": "naval_ofensiva",
		"defensivo-terrestre": "terrestre_defensiva",
		conquista: "terrestre_ofensiva"
	};
	function migrateSettingsV2toV3(data) {
		const out = { ...data };
		if (isRecord$4(data.profiles)) {
			const profiles = {};
			for (const [id, p] of Object.entries(data.profiles)) {
				if (id in LEGACY_EXAMPLE_PROFILES) continue;
				profiles[id] = migrateProfileV2toV3(p);
			}
			out.profiles = profiles;
		}
		if (isRecord$4(data.townProfiles)) {
			const townProfiles = {};
			for (const [town, id] of Object.entries(data.townProfiles)) townProfiles[town] = typeof id === "string" && id in LEGACY_EXAMPLE_PROFILES ? LEGACY_EXAMPLE_PROFILES[id] : id;
			out.townProfiles = townProfiles;
		}
		return out;
	}
	function settingsKey(host, playerId) {
		return `grepoHelper:${host}:${String(playerId)}`;
	}
	var MIGRATIONS = {
		0: (data) => ({
			...data,
			schemaVersion: 1
		}),
		1: migrateSettingsV1toV2,
		2: migrateSettingsV2toV3
	};
	function migrate(data, targetVersion = 3, migrations = MIGRATIONS) {
		let current = data;
		let version = typeof current.schemaVersion === "number" ? current.schemaVersion : 0;
		if (version > targetVersion) throw new Error(`versión de esquema ${version} más nueva que la soportada (${targetVersion})`);
		while (version < targetVersion) {
			const step = migrations[version];
			if (!step) throw new Error(`falta la migración desde la versión ${version}`);
			current = step(current);
			version += 1;
			current = {
				...current,
				schemaVersion: version
			};
		}
		return current;
	}
	function loadSettings(host, playerId, storage = localStorage) {
		const key = settingsKey(host, playerId);
		let text;
		try {
			text = storage.getItem(key);
		} catch (err) {
			return {
				settings: createDefaultSettings(),
				warnings: [`no se pudo leer ${key}: ${String(err)}`],
				fresh: true
			};
		}
		if (text === null) return {
			settings: createDefaultSettings(),
			warnings: [],
			fresh: true
		};
		try {
			const parsed = JSON.parse(text);
			if (!isRecord$4(parsed)) throw new Error("el contenido no es un objeto");
			const { settings, warnings } = normalizeSettings(migrate(parsed));
			return {
				settings,
				warnings,
				fresh: false
			};
		} catch (err) {
			const backupKey = `${key}:backup`;
			try {
				storage.setItem(backupKey, text);
			} catch {}
			return {
				settings: createDefaultSettings(),
				warnings: [`ajustes ilegibles en ${key} (copia en ${backupKey}), se usan los predeterminados: ${String(err)}`],
				fresh: true
			};
		}
	}
	function saveSettings(host, playerId, settings, storage = localStorage) {
		storage.setItem(settingsKey(host, playerId), JSON.stringify(settings));
	}
	var MINUTE_MS = 6e4;
	function createAttackRate(now = Date.now) {
		const sends = [];
		const prune = (at) => {
			while (sends.length > 0 && at - (sends[0] ?? at) >= MINUTE_MS) sends.shift();
		};
		return {
			wait(limit) {
				const at = now();
				prune(at);
				if (sends.length < limit) return 0;
				const oldest = sends[sends.length - limit] ?? at;
				return Math.max(0, oldest + MINUTE_MS - at);
			},
			note() {
				const at = now();
				prune(at);
				sends.push(at);
			}
		};
	}
	var DISCORD_MIN_GAP_MS = 2e3;
	var DISCORD_TEXT_MAX = 1900;
	var DISCORD_TIMEOUT_MS = 1e4;
	function createDiscordSender(deps) {
		const now = deps.now ?? Date.now;
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const queue = [];
		let running = false;
		let lastAt = -Infinity;
		async function post(webhook, text) {
			const content = text.length > 1900 ? `${text.slice(0, DISCORD_TEXT_MAX)}…` : text;
			const controller = typeof AbortController === "function" ? new AbortController() : null;
			const timer = controller ? setTimeout(() => {
				controller.abort();
			}, DISCORD_TIMEOUT_MS) : null;
			try {
				const res = await deps.fetch(webhook, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						content,
						username: "grepo-helper",
						allowed_mentions: { parse: [] }
					}),
					credentials: "omit",
					referrerPolicy: "no-referrer",
					...controller ? { signal: controller.signal } : {}
				});
				if (res.ok) return true;
				deps.logger.warn(`alertas: Discord respondió HTTP ${String(res.status)}`, { muted: true });
				return false;
			} catch (err) {
				deps.logger.warn(`alertas: no se pudo enviar a Discord (${err instanceof Error ? err.message : String(err)})`, { muted: true });
				return false;
			} finally {
				if (timer !== null) clearTimeout(timer);
			}
		}
		async function drain() {
			running = true;
			try {
				for (let next = queue.shift(); next; next = queue.shift()) {
					const wait = lastAt + DISCORD_MIN_GAP_MS - now();
					if (wait > 0) await sleep(wait);
					lastAt = now();
					next.done(await post(next.webhook, next.text));
				}
			} finally {
				running = false;
			}
		}
		return { send(webhook, text) {
			if (!isDiscordWebhook(webhook)) return Promise.resolve(false);
			if (queue.length >= 30) {
				deps.logger.warn("alertas: demasiados mensajes en espera, se descarta uno", { muted: true });
				return Promise.resolve(false);
			}
			return new Promise((resolve) => {
				queue.push({
					webhook,
					text,
					done: resolve
				});
				if (!running) drain();
			});
		} };
	}
	var pad = (n) => String(n).padStart(2, "0");
	function formatLogTime(ts) {
		const d = new Date(ts);
		return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
	}
	function formatLogText(entry) {
		const town = entry.town !== void 0 ? `${entry.town}: ` : "";
		const reason = entry.reason !== void 0 ? ` (${entry.reason})` : "";
		return `${town}${entry.message}${reason}`;
	}
	function formatLogLine(entry) {
		return `${formatLogTime(entry.ts)} ${formatLogText(entry)}`;
	}
	function pushLog(logs, entry, max = 200) {
		logs.push(entry);
		if (logs.length > max) logs.splice(0, logs.length - max);
	}
	var PREFIX = "[grepo-helper]";
	var Logger = class {
		store = null;
		early = [];
		now;
		out;
		listeners = new Set();
		constructor(options = {}) {
			this.now = options.now ?? Date.now;
			this.out = options.console === void 0 ? console : options.console;
		}
		attach(store) {
			this.store = store;
			if (this.early.length > 0) {
				const pending = this.early.splice(0);
				store.update((s) => {
					for (const entry of pending) pushLog(s.logs, entry);
				});
			}
		}
		onLog(listener) {
			this.listeners.add(listener);
			return () => {
				this.listeners.delete(listener);
			};
		}
		log(level, message, options = {}) {
			const entry = {
				ts: this.now(),
				level,
				message,
				tab: options.tab ?? (level === "error" ? "errors" : "activity")
			};
			if (options.town !== void 0) entry.town = options.town;
			if (options.reason !== void 0) entry.reason = options.reason;
			if (options.muted === true) entry.muted = true;
			if (this.store) this.store.update((s) => {
				pushLog(s.logs, entry);
			});
			else pushLog(this.early, entry);
			if (this.out) {
				const method = level === "error" ? "error" : level === "warn" ? "warn" : "info";
				this.out[method](`${PREFIX} ${formatLogLine(entry)}`);
			}
			for (const listener of this.listeners) try {
				listener(entry, options);
			} catch {}
		}
		info(message, options) {
			this.log("info", message, options);
		}
		success(message, options) {
			this.log("success", message, options);
		}
		warn(message, options) {
			this.log("warn", message, options);
		}
		error(message, options) {
			this.log("error", message, options);
		}
		clear(tab) {
			const keep = (e) => tab !== void 0 && e.tab !== tab;
			const early = this.early.filter(keep);
			this.early.splice(0, this.early.length, ...early);
			this.store?.update((s) => {
				const kept = s.logs.filter(keep);
				s.logs.splice(0, s.logs.length, ...kept);
			});
		}
	};
	var STOP_TEXT = {
		captcha: "el servidor pide un captcha",
		botcheck: "el servidor ha abierto una comprobación antibot",
		verification: "el servidor pide un código de verificación"
	};
	var SafetyStopError = class extends Error {
		stop;
		constructor(stop) {
			super(`pausa de seguridad: ${STOP_TEXT[stop.kind]}`);
			this.stop = stop;
			this.name = "SafetyStopError";
		}
	};
	var RequestOutcomeUnknownError = class extends Error {
		label;
		constructor(label) {
			super(`${label}: sin respuesta; no se reintenta porque pudo aplicarse`);
			this.label = label;
			this.name = "RequestOutcomeUnknownError";
		}
	};
	function isRecord$3(value) {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}
	function signalIn(obj) {
		if (obj.captcha_required === true) return "captcha";
		if (obj.type === "botcheck") return "botcheck";
		if (obj.gpVerificationRequest !== void 0) return "verification";
		return null;
	}
	function detectSafetySignal(body) {
		if (!isRecord$3(body)) return null;
		for (const candidate of [
			body,
			body.json,
			body.plain
		]) {
			if (!isRecord$3(candidate)) continue;
			const kind = signalIn(candidate);
			if (kind !== null) return kind;
		}
		return null;
	}
	function mayContainSafetySignal(text) {
		return text.includes("captcha_required") || text.includes("botcheck") || text.includes("gpVerificationRequest");
	}
	function parseRetryAfter(value, nowMs) {
		if (value === null || value === void 0) return null;
		const text = value.trim();
		if (text === "") return null;
		if (/^\d+$/.test(text)) return Number(text) * 1e3;
		const date = Date.parse(text);
		if (Number.isNaN(date)) return null;
		return Math.max(0, date - nowMs);
	}
	var WINDOW_MS = 6e4;
	var SafetyGuard = class {
		stopState = null;
		cooldownUntil = 0;
		sent = [];
		listeners = new Set();
		logger;
		limit;
		now;
		sleep;
		dryRun;
		constructor(options) {
			this.logger = options.logger;
			this.limit = options.requestsPerMinute ?? 40;
			this.now = options.now ?? Date.now;
			this.sleep = options.sleep ?? ((ms) => new Promise((resolve) => {
				setTimeout(resolve, ms);
			}));
			this.dryRun = options.isDryRun ?? (() => true);
		}
		get stopped() {
			return this.stopState;
		}
		get isDryRun() {
			return this.dryRun();
		}
		cooldownRemainingMs() {
			return Math.max(0, this.cooldownUntil - this.now());
		}
		subscribe(listener) {
			this.listeners.add(listener);
			return () => this.listeners.delete(listener);
		}
		notify() {
			for (const listener of this.listeners) try {
				listener();
			} catch {}
		}
		inspect(body, label) {
			const kind = detectSafetySignal(body);
			if (kind !== null) this.halt(kind, label);
			return kind;
		}
		halt(kind, label) {
			if (this.stopState !== null) return;
			this.stopState = {
				kind,
				label,
				at: this.now()
			};
			this.logger.error(`pausa de seguridad: ${STOP_TEXT[kind]}`, { reason: `visto en ${label}; resuélvelo en el juego y pulsa Reanudar en el panel` });
			this.notify();
		}
		resume() {
			if (this.stopState === null) return;
			this.stopState = null;
			this.logger.info("reanudado tras la pausa de seguridad");
			this.notify();
		}
		noteStatus(status, retryAfter, label) {
			if (status !== 429 && status !== 503) return;
			const now = this.now();
			const waitMs = parseRetryAfter(retryAfter, now) ?? 6e4;
			const until = now + waitMs;
			if (until <= this.cooldownUntil) return;
			this.cooldownUntil = until;
			this.logger.warn(`${label}: HTTP ${status}`, { reason: `se espera ${Math.ceil(waitMs / 1e3)} s antes de la siguiente petición` });
			this.notify();
		}
		assertRunning() {
			if (this.stopState !== null) throw new SafetyStopError(this.stopState);
		}
		async acquire() {
			for (;;) {
				this.assertRunning();
				const now = this.now();
				if (this.cooldownUntil > now) {
					await this.sleep(this.cooldownUntil - now);
					continue;
				}
				let oldest = this.sent[0];
				while (oldest !== void 0 && now - oldest >= WINDOW_MS) {
					this.sent.shift();
					oldest = this.sent[0];
				}
				if (oldest !== void 0 && this.sent.length >= this.limit) {
					await this.sleep(oldest + WINDOW_MS - now);
					continue;
				}
				this.sent.push(now);
				return;
			}
		}
	};
	function labelFromUrl(url, origin) {
		if (url === void 0) return "petición del juego";
		try {
			const parsed = new URL(url, origin);
			const controller = parsed.pathname.replace(/^\/game\//, "");
			const action = parsed.searchParams.get("action");
			return action === null ? controller : `${controller}/${action}`;
		} catch {
			return "petición del juego";
		}
	}
	function observePageAjax(win, guard) {
		const jq = win.jQuery;
		if (typeof jq !== "function" || win.document === void 0) return false;
		let target;
		try {
			target = jq(win.document);
		} catch {
			return false;
		}
		if (!isRecord$3(target) || typeof target.ajaxComplete !== "function") return false;
		target.ajaxComplete((_event, xhr, settings) => {
			try {
				const label = labelFromUrl(settings.url, win.location.origin);
				if (typeof xhr.status === "number") guard.noteStatus(xhr.status, xhr.getResponseHeader?.("Retry-After"), label);
				const text = xhr.responseText;
				if (typeof text === "string" && mayContainSafetySignal(text)) guard.inspect(JSON.parse(text), label);
			} catch {}
		});
		return true;
	}
	function createErrorReporter(logger) {
		return (label, err) => {
			const message = err instanceof Error ? err.message : String(err);
			try {
				if (logger) logger.error(`${label}: ${message}`);
				else console.error(`[grepo-helper] ${label}: ${message}`);
			} catch {}
		};
	}
	function contain(label, fn, report) {
		return (...args) => {
			try {
				const result = fn(...args);
				if (result instanceof Promise) result.catch((err) => {
					report(label, err);
				});
			} catch (err) {
				report(label, err);
			}
		};
	}
	function isRestTime(rest, date) {
		if (!rest.enabled || rest.startHour === rest.endHour) return false;
		const hour = date.getHours();
		if (rest.startHour < rest.endHour) return hour >= rest.startHour && hour < rest.endHour;
		return hour >= rest.startHour || hour < rest.endHour;
	}
	var CYCLE_PHASES = [
		"defense",
		"trade",
		"freeFinish",
		"build",
		"research",
		"recruitSpells",
		"recruit",
		"villages",
		"market",
		"missions",
		"bandits",
		"farming",
		"festivals",
		"hide",
		"heroes"
	];
	var phaseIndex = (task) => CYCLE_PHASES.indexOf(task.phase);
	var Scheduler = class {
		options;
		tasks;
		random;
		now;
		setTimer;
		clearTimer;
		timer = null;
		running = false;
		busy = false;
		resting = false;
		constructor(options) {
			this.options = options;
			this.tasks = [...options.tasks ?? []].sort((a, b) => phaseIndex(a) - phaseIndex(b));
			this.random = options.random ?? Math.random;
			this.now = options.now ?? (() => new Date());
			this.setTimer = options.setTimeout ?? ((fn, ms) => window.setTimeout(fn, ms));
			this.clearTimer = options.clearTimeout ?? ((id) => {
				window.clearTimeout(id);
			});
		}
		get isRunning() {
			return this.running;
		}
		register(task) {
			this.tasks.push(task);
			this.tasks.sort((a, b) => phaseIndex(a) - phaseIndex(b));
		}
		get taskNames() {
			return this.tasks.map((t) => t.name);
		}
		nextDelay() {
			const { minMs, maxMs } = this.options.getSettings().pollIntervalMs;
			return Math.round(minMs + this.random() * (maxMs - minMs));
		}
		start() {
			if (this.running) return;
			this.running = true;
			this.options.logger.info(`scheduler iniciado (${this.tasks.length} módulos)`);
			this.schedule();
		}
		stop() {
			if (!this.running) return;
			this.running = false;
			if (this.timer !== null) this.clearTimer(this.timer);
			this.timer = null;
			this.options.logger.info("scheduler detenido");
		}
		schedule() {
			if (!this.running) return;
			this.timer = this.setTimer(() => {
				this.tick().catch((err) => {
					this.options.logger.error(`ciclo: ${err instanceof Error ? err.message : String(err)}`);
				}).finally(() => {
					this.schedule();
				});
			}, this.nextDelay());
		}
		async tick() {
			const settings = this.options.getSettings();
			if (!settings.enabled) return "disabled";
			if (this.options.isSafetyStopped?.() === true) return "safety";
			if (this.busy) return "busy";
			const { logger } = this.options;
			const resting = isRestTime(settings.rest, this.now());
			if (resting !== this.resting) {
				this.resting = resting;
				logger.info(resting ? "descanso: economía en pausa" : "fin del descanso", { reason: resting ? `hasta las ${settings.rest.endHour}:00; el combate sigue` : "se reanuda la economía" });
			}
			this.busy = true;
			let actions = 0;
			try {
				for (const task of this.tasks) {
					if (resting && task.category === "economy") continue;
					if (task.master !== void 0 && !settings.masters[task.master]) continue;
					try {
						actions += await task.run(settings);
					} catch (err) {
						logger.error(`${task.name}: ${err instanceof Error ? err.message : String(err)}`);
					}
				}
			} finally {
				this.busy = false;
			}
			if (actions > 0) {
				const towns = this.options.getTownCount?.() ?? 0;
				logger.info("ciclo terminado", { reason: `${towns} ciudades, ${actions} acciones` });
			}
			return resting ? "rest" : "ran";
		}
	};
	var SettingsStore = class {
		host;
		playerId;
		storage;
		settings;
		listeners = new Set();
		constructor(initial, host, playerId, storage = localStorage) {
			this.host = host;
			this.playerId = playerId;
			this.storage = storage;
			this.settings = initial;
		}
		get() {
			return this.settings;
		}
		update(mutate) {
			mutate(this.settings);
			try {
				saveSettings(this.host, this.playerId, this.settings, this.storage);
			} catch (err) {
				console.error("[grepo-helper] no se pudieron guardar los ajustes", err);
			}
			for (const listener of this.listeners) listener(this.settings);
		}
		subscribe(listener) {
			this.listeners.add(listener);
			return () => this.listeners.delete(listener);
		}
	};
	function createTabClaims(key, deps) {
		const now = deps.now ?? Date.now;
		function claim(id) {
			let map = {};
			try {
				const raw = JSON.parse(deps.storage.getItem(key) ?? "{}");
				if (isRecord$4(raw)) {
					for (const [k, v] of Object.entries(raw)) if (isRecord$4(v) && typeof v.tab === "string" && typeof v.at === "number") {
						if (now() - v.at < 1728e5) map[k] = {
							tab: v.tab,
							at: v.at
						};
					}
				}
			} catch {
				map = {};
			}
			const current = map[id];
			if (current && current.tab !== deps.tabId) return false;
			map[id] = {
				tab: deps.tabId,
				at: current?.at ?? now()
			};
			deps.storage.setItem(key, JSON.stringify(map));
			return true;
		}
		return async (id) => {
			if (!deps.locks) return claim(id);
			return deps.locks.request(key, () => Promise.resolve(claim(id)));
		};
	}
	var GameContextError = class extends Error {
		missing;
		constructor(missing) {
			super(`no se pudo leer del cliente: ${missing.join(", ")}`);
			this.missing = missing;
			this.name = "GameContextError";
		}
	};
	function toPositiveInt(value) {
		const n = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
		return typeof n === "number" && Number.isInteger(n) && n > 0 ? n : null;
	}
	function readCurrentTownId(win) {
		const fromGame = toPositiveInt(win.Game?.townId);
		if (fromGame !== null) return fromGame;
		const getCurrentTown = win.ITowns?.getCurrentTown;
		if (typeof getCurrentTown === "function") try {
			const town = getCurrentTown.call(win.ITowns);
			if (typeof town === "object" && town !== null && "id" in town) {
				const id = toPositiveInt(town.id);
				if (id !== null) return id;
			}
		} catch {}
		return null;
	}
	function worldFromHost(host) {
		return host.split(".")[0] ?? host;
	}
	function readGameContext(win) {
		const missing = [];
		const game = win.Game;
		const h = typeof game?.csrfToken === "string" && game.csrfToken !== "" ? game.csrfToken : null;
		if (h === null) missing.push("Game.csrfToken (h)");
		const townId = readCurrentTownId(win);
		if (townId === null) missing.push("Game.townId / ITowns.getCurrentTown().id");
		const playerId = toPositiveInt(game?.player_id);
		if (playerId === null) missing.push("Game.player_id");
		if (h === null || townId === null || playerId === null) throw new GameContextError(missing);
		return {
			h,
			townId,
			playerId,
			world: typeof game?.world_id === "string" && game.world_id !== "" ? game.world_id : worldFromHost(win.location.host),
			host: win.location.host
		};
	}
	function isClientReady(win) {
		try {
			readGameContext(win);
			return true;
		} catch {
			return false;
		}
	}
	function resolveClientAjax(win) {
		const ajax = win.gpAjax;
		if (typeof ajax !== "object" || ajax === null) return null;
		const { ajaxGet, ajaxPost } = ajax;
		if (typeof ajaxGet !== "function" || typeof ajaxPost !== "function") return null;
		return ajax;
	}
	function isAdvisorActive(win, advisor) {
		const premium = win.GameDataPremium;
		if (typeof premium !== "object" || premium === null) return false;
		const fn = premium.isAdvisorActivated;
		if (typeof fn !== "function") return false;
		try {
			return fn.call(premium, advisor) === true;
		} catch {
			return false;
		}
	}
	function callMethod(obj, name, ...args) {
		if (typeof obj !== "object" || obj === null) return void 0;
		const fn = obj[name];
		if (typeof fn !== "function") return void 0;
		try {
			return fn.apply(obj, args);
		} catch {
			return;
		}
	}
	function readClientServerTime(win) {
		const value = callMethod(win.Timestamp, "server");
		return typeof value === "number" && Number.isFinite(value) && value > 1e9 ? value : null;
	}
	function readInstantBuyPrice(win, type, secondsLeft) {
		const value = callMethod(win.GameDataInstantBuy, "getPriceForType", type, secondsLeft);
		if (typeof value === "number" && Number.isFinite(value)) return value;
		if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
		return null;
	}
	function isRecord$2(value) {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}
	function num$1(value) {
		if (typeof value === "number" && Number.isFinite(value)) return value;
		if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
		return null;
	}
	function text(value) {
		return typeof value === "string" ? value : null;
	}
	function parseMarketOffers(json) {
		const list = json.offers_array;
		if (!Array.isArray(list)) return [];
		return list.flatMap((o) => {
			if (!isRecord$2(o)) return [];
			const id = num$1(o.id);
			if (id === null) return [];
			return [{
				id,
				offer: num$1(o.offer),
				offerType: text(o.offer_type),
				demand: num$1(o.demand),
				demandType: text(o.demand_type),
				ratio: num$1(o.ratio),
				distance: num$1(o.distance),
				maxDistance: num$1(o.max_distance),
				playerId: num$1(o.player_id),
				playerName: text(o.player_name),
				allianceId: num$1(o.alliance_id),
				allianceName: text(o.alliance_name),
				pactStatus: text(o.pact_status),
				durationSeconds: num$1(o.duration_seconds)
			}];
		});
	}
	function parseOwnMarketOffers(json) {
		return {
			offers: parseMarketOffers(json),
			availableCapacity: num$1(json.available_capacity),
			maxCapacity: num$1(json.max_capacity),
			maxTradeRatio: num$1(json.max_trade_ratio),
			offersTotal: num$1(json.offers_total),
			currentLevel: num$1(json.current_level)
		};
	}
	function parseFarmTownTradeData(json) {
		return {
			claimResourceValues: (Array.isArray(json.claim_resource_values) ? json.claim_resource_values : []).map(num$1),
			tradeDuration: num$1(json.trade_duration),
			maxTradeCapacity: num$1(json.max_trade_capacity),
			availableTradeCapacity: num$1(json.available_trade_capacity)
		};
	}
	function chooseFarmClaimOption(data, choice = {}) {
		const maxOption = choice.maxOption ?? 4;
		let best = null;
		let bestValue = 0;
		for (const option of [
			1,
			2,
			3,
			4
		]) {
			if (option > maxOption) break;
			const value = data.claimResourceValues[option - 1];
			if (value === null || value === void 0 || value <= 0) continue;
			if (choice.freeStorage !== void 0 && value > choice.freeStorage) continue;
			if (value > bestValue) {
				best = option;
				bestValue = value;
			}
		}
		return best;
	}
	function parseIslandQuestStatus(json) {
		return {
			time: num$1(json.time),
			activeIslandQuests: json.active_island_quests ?? null
		};
	}
	function parseIslandSpotInfo(json) {
		return {
			id: num$1(json.id),
			distance: num$1(json.distance),
			name: text(json.name)
		};
	}
	function parseFightSimulation(json) {
		const side = (value) => {
			if (!isRecord$2(value)) return null;
			const out = {};
			for (const [unit, raw] of Object.entries(value)) {
				const n = num$1(raw);
				if (n === null || n < 0) return null;
				out[unit] = n;
			}
			return out;
		};
		const attSurvives = side(json.att_survives);
		const defSurvives = side(json.def_survives);
		return attSurvives && defSurvives ? {
			attSurvives,
			defSurvives
		} : null;
	}
	function parseClaimedTowns(json) {
		const list = json.towns;
		if (!Array.isArray(list)) return [];
		return list.flatMap((t) => {
			if (!isRecord$2(t)) return [];
			const id = num$1(t.id);
			if (id === null) return [];
			const booty = t.booty_researched;
			return [{
				id,
				wood: num$1(t.wood),
				stone: num$1(t.stone),
				iron: num$1(t.iron),
				storageLevel: num$1(t.storage_level),
				population: num$1(t.population),
				farmLevel: num$1(t.farm_level),
				bootyResearched: typeof booty === "boolean" ? booty : num$1(booty) === null ? null : num$1(booty) !== 0,
				raw: t
			}];
		});
	}
	function townIdFromLink(link) {
		const anchor = /href="#([A-Za-z0-9+/=]+)"/.exec(link)?.[1];
		if (!anchor) return null;
		try {
			const data = JSON.parse(atob(anchor));
			return isRecord$2(data) ? num$1(data.id) : null;
		} catch {
			return null;
		}
	}
	function linkText(link) {
		return link.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, "\"").trim();
	}
	function parseTradeMovements(json, ownTowns) {
		const list = json.movements;
		if (!Array.isArray(list)) return null;
		const out = [];
		for (const m of list) {
			if (!isRecord$2(m)) return null;
			const res = isRecord$2(m.res) ? m.res : isRecord$2(m.resources) ? m.resources : null;
			if (res === null) return null;
			const to = isRecord$2(m.to) ? m.to : {};
			let toTownId = num$1(to.id) ?? num$1(to.town_id) ?? num$1(m.to_town_id) ?? num$1(m.target_town_id);
			const link = text(to.link);
			if (toTownId === null && link !== null) {
				toTownId = townIdFromLink(link);
				if (toTownId === null) {
					const name = linkText(link);
					const matches = ownTowns.filter((t) => t.name === name);
					if (matches.length === 1) toTownId = matches[0]?.id ?? null;
				}
			}
			out.push({
				toTownId,
				wood: Math.max(0, num$1(res.wood) ?? 0),
				stone: Math.max(0, num$1(res.stone) ?? 0),
				iron: Math.max(0, num$1(res.iron) ?? 0)
			});
		}
		return out;
	}
	function heroFromRecord(rec) {
		if (!isRecord$2(rec)) return null;
		const id = num$1(rec.id);
		const type = text(rec.type);
		if (id === null || type === null || type === "") return null;
		return {
			id,
			type,
			level: num$1(rec.level),
			assignment: text(rec.assignment_type),
			homeTownId: num$1(rec.home_town_id),
			arrivalAt: num$1(rec.town_arrival_at),
			curedAt: num$1(rec.cured_at)
		};
	}
	function parseHeroesWindow(json) {
		const collections = isRecord$2(json.collections) ? json.collections : null;
		const heroes = collections && isRecord$2(collections.PlayerHeroes) ? collections.PlayerHeroes : null;
		if (!heroes || !Array.isArray(heroes.data)) return null;
		const out = [];
		for (const item of heroes.data) {
			const hero = heroFromRecord(isRecord$2(item) && isRecord$2(item.d) ? item.d : item);
			if (!hero) return null;
			out.push(hero);
		}
		return out;
	}
	function parseHeroNotifications(json) {
		const out = [];
		for (const n of Array.isArray(json.notifications) ? json.notifications : []) {
			if (!isRecord$2(n) || n.subject !== "PlayerHero" || typeof n.param_str !== "string") continue;
			let param;
			try {
				param = JSON.parse(n.param_str);
			} catch {
				continue;
			}
			const hero = heroFromRecord(isRecord$2(param) ? param.PlayerHero : void 0);
			if (hero) out.push(hero);
		}
		return out;
	}
	var defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	var RequestQueue = class {
		tail = Promise.resolve();
		lastEnd = null;
		pending = 0;
		minDelayMs;
		maxDelayMs;
		random;
		sleep;
		now;
		constructor(options = {}) {
			this.minDelayMs = options.minDelayMs ?? 300;
			this.maxDelayMs = options.maxDelayMs ?? 1200;
			this.random = options.random ?? Math.random;
			this.sleep = options.sleep ?? defaultSleep;
			this.now = options.now ?? Date.now;
		}
		get size() {
			return this.pending;
		}
		nextDelay() {
			return Math.round(this.minDelayMs + this.random() * (this.maxDelayMs - this.minDelayMs));
		}
		enqueue(task) {
			this.pending += 1;
			const run = async () => {
				if (this.lastEnd !== null) {
					const wait = this.nextDelay() - (this.now() - this.lastEnd);
					if (wait > 0) await this.sleep(wait);
				}
				try {
					return await task();
				} finally {
					this.lastEnd = this.now();
					this.pending -= 1;
				}
			};
			const result = this.tail.then(run, run);
			this.tail = result.catch(() => void 0);
			return result;
		}
	};
	function decodeName(raw) {
		try {
			return decodeURIComponent(raw.replace(/\+/g, " "));
		} catch {
			return raw;
		}
	}
	function int(raw) {
		if (raw === void 0 || raw.trim() === "") return null;
		const n = Number(raw);
		return Number.isInteger(n) ? n : null;
	}
	function rows(text, fields) {
		return text.split(/\r?\n/).map((line) => line.split(",")).filter((cols) => cols.length === fields);
	}
	function parsePlayers(text) {
		const out = [];
		for (const [id, name, alliance, points, rank, towns] of rows(text, 6)) {
			const p = {
				id: int(id),
				points: int(points),
				rank: int(rank),
				towns: int(towns)
			};
			if (p.id === null || p.points === null || p.rank === null || p.towns === null) continue;
			out.push({
				id: p.id,
				name: decodeName(name ?? ""),
				allianceId: int(alliance),
				points: p.points,
				rank: p.rank,
				towns: p.towns
			});
		}
		return out;
	}
	function parseAlliances(text) {
		const out = [];
		for (const [id, name, points, towns, members, rank] of rows(text, 6)) {
			const a = {
				id: int(id),
				points: int(points),
				towns: int(towns),
				members: int(members),
				rank: int(rank)
			};
			if (Object.values(a).some((v) => v === null)) continue;
			out.push({
				id: a.id ?? 0,
				name: decodeName(name ?? ""),
				points: a.points ?? 0,
				towns: a.towns ?? 0,
				members: a.members ?? 0,
				rank: a.rank ?? 0
			});
		}
		return out;
	}
	function parseKills(text) {
		const out = [];
		for (const [rank, player, points] of rows(text, 3)) {
			const k = {
				rank: int(rank),
				playerId: int(player),
				points: int(points)
			};
			if (k.rank === null || k.playerId === null || k.points === null) continue;
			out.push({
				rank: k.rank,
				playerId: k.playerId,
				points: k.points
			});
		}
		return out;
	}
	function parseConquers(text) {
		const out = [];
		for (const [town, time, newP, oldP, newA, oldA, points] of rows(text, 7)) {
			const townId = int(town);
			const t = int(time);
			const p = int(points);
			if (townId === null || t === null || p === null) continue;
			out.push({
				townId,
				time: t,
				newPlayerId: int(newP),
				oldPlayerId: int(oldP),
				newAllianceId: int(newA),
				oldAllianceId: int(oldA),
				points: p
			});
		}
		return out;
	}
	function parseTowns(text) {
		const out = [];
		for (const line of text.split(/\r?\n/)) {
			const cols = line.split(",");
			const [id, player, name, islandX, islandY, , points] = cols;
			const townId = int(id);
			if (townId === null || player === void 0) continue;
			const full = cols.length === 7;
			out.push({
				id: townId,
				playerId: int(player),
				name: full && name !== void 0 ? decodeName(name) : null,
				islandX: full ? int(islandX) : null,
				islandY: full ? int(islandY) : null,
				points: full ? int(points) : null
			});
		}
		return out;
	}
	var GameApiError = class extends Error {
		details;
		constructor(message, details = {}) {
			super(message);
			this.details = details;
			this.name = "GameApiError";
		}
	};
	var GoldSpendRefusedError = class extends GameApiError {
		remainingSeconds;
		constructor(message, remainingSeconds) {
			super(message);
			this.remainingSeconds = remainingSeconds;
			this.name = "GoldSpendRefusedError";
		}
	};
	var NoResponse = class extends Error {};
	var NetworkError = class extends GameApiError {
		constructor(message) {
			super(message);
			this.name = "NetworkError";
		}
	};
	function describeRequest(req) {
		const base = `${req.method} ${req.controller}/${req.action}`;
		const p = req.payload;
		if (p && typeof p.model_url === "string" && typeof p.action_name === "string") return `${base} ${p.model_url}.${p.action_name}`;
		return base;
	}
	function isRecord$1(value) {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}
	function assertId(name, value) {
		if (!Number.isInteger(value) || value <= 0) throw new GameApiError(`${name} no válido: ${String(value)}`);
	}
	function encodeJsonBody(payload) {
		return `json=${encodeURIComponent(JSON.stringify(payload))}`;
	}
	function buildUrl(origin, controller, query, action, h, extra = {}) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(query)) params.set(key, String(value));
		params.set("action", action);
		params.set("h", h);
		for (const [key, value] of Object.entries(extra)) params.set(key, String(value));
		return `${origin}/game/${controller}?${params.toString()}`;
	}
	function unwrapResponse(body) {
		const json = isRecord$1(body) && isRecord$1(body.json) ? body.json : body;
		if (!isRecord$1(json)) throw new GameApiError("respuesta sin objeto json", { json: body });
		if (typeof json.error === "string" && json.error !== "") throw new GameApiError(json.error, { json });
		return json;
	}
	function toNumber(value) {
		if (typeof value === "number" && Number.isFinite(value)) return value;
		if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
	}
	function toText(value) {
		return typeof value === "string" ? value : void 0;
	}
	function parseNotifications(json) {
		const out = [];
		for (const n of json.notifications ?? []) {
			if (!isRecord$1(n) || typeof n.subject !== "string" || typeof n.param_str !== "string") continue;
			let parsed;
			try {
				parsed = JSON.parse(n.param_str);
			} catch {
				continue;
			}
			if (!isRecord$1(parsed)) continue;
			const data = parsed[n.subject];
			if (isRecord$1(data)) out.push({
				subject: n.subject,
				data
			});
		}
		return out;
	}
	function parseResearchOrders(json) {
		return parseNotifications(json).filter((n) => n.subject === "ResearchOrder").flatMap(({ data }) => {
			const id = toNumber(data.id);
			if (id === void 0) return [];
			const order = { id };
			const researchType = toText(data.research_type);
			const completedAt = toNumber(data.to_be_completed_at);
			if (researchType !== void 0) order.researchType = researchType;
			if (completedAt !== void 0) order.toBeCompletedAt = completedAt;
			return [order];
		});
	}
	function parseUnitOrders(json) {
		return parseNotifications(json).filter((n) => n.subject === "UnitOrder").flatMap(({ data }) => {
			const id = toNumber(data.id);
			if (id === void 0) return [];
			const order = { id };
			const unitType = toText(data.unit_type);
			const kind = toText(data.kind);
			const count = toNumber(data.count);
			const completedAt = toNumber(data.to_be_completed_at);
			if (unitType !== void 0) order.unitType = unitType;
			if (kind !== void 0) order.kind = kind;
			if (count !== void 0) order.count = count;
			if (completedAt !== void 0) order.toBeCompletedAt = completedAt;
			return [order];
		});
	}
	function findMovementRecord(value, depth = 0) {
		if (!isRecord$1(value) || depth > 3) return null;
		if ("arrival_at" in value || "started_at" in value) return value;
		for (const child of Object.values(value)) {
			const found = findMovementRecord(child, depth + 1);
			if (found) return found;
		}
		return null;
	}
	function parseMovementNotifications(json) {
		const out = [];
		for (const n of json.notifications ?? []) {
			if (!isRecord$1(n) || n.subject !== "MovementsUnits") continue;
			let param = n.param_str;
			if (typeof param === "string") try {
				param = JSON.parse(param);
			} catch {
				param = void 0;
			}
			const rec = findMovementRecord(param) ?? findMovementRecord(n);
			if (!rec) continue;
			const id = rec.command_id ?? rec.id;
			const command = {};
			if (typeof id === "number" || typeof id === "string") command.commandId = id;
			const startedAt = toNumber(rec.started_at);
			const arrivalAt = toNumber(rec.arrival_at);
			const cancelableUntil = toNumber(rec.cancelable_until);
			if (startedAt !== void 0) command.startedAt = startedAt;
			if (arrivalAt !== void 0) command.arrivalAt = arrivalAt;
			if (cancelableUntil !== void 0) command.cancelableUntil = cancelableUntil;
			out.push(command);
		}
		return out;
	}
	var FREE_CELEBRATIONS = [
		"party",
		"theater",
		"triumph"
	];
	var FARM_TRADE_MAX = 3e3;
	var WORLD_DATA_REFRESH_MIN_MS = 3e5;
	function assertPowerId(powerId) {
		if (!/^[a-z_]+$/.test(powerId)) throw new GameApiError(`hechizo no válido: ${powerId}`);
	}
	function assertAmount(name, value) {
		if (!Number.isInteger(value) || value <= 0) throw new GameApiError(`${name} no válido: ${String(value)}`);
	}
	function cleanResources(resources) {
		const out = {
			wood: 0,
			stone: 0,
			iron: 0
		};
		for (const key of [
			"wood",
			"stone",
			"iron"
		]) {
			const v = resources[key] ?? 0;
			if (!Number.isInteger(v) || v < 0) throw new GameApiError(`cantidad no válida de ${key}: ${String(v)}`);
			out[key] = v;
		}
		if (out.wood + out.stone + out.iron === 0) throw new GameApiError("no hay recursos que enviar");
		return out;
	}
	var BLOCKED_MODEL_PREFIXES = [
		"PremiumExchange",
		"PremiumFeatures",
		"CashShop",
		"Crm"
	];
	var PURCHASE_PATTERN = /buy|purchase/i;
	var BLOCKED_CONTROLLER_PATTERN = /^(phoenician_salesman|premium|cash_?shop|crm)/i;
	function goldRisk(value, allowInstantBuy, depth = 0) {
		if (depth > 6 || typeof value !== "object" || value === null) return null;
		for (const [key, v] of Object.entries(value)) {
			if (key === "action_name" && typeof v === "string" && PURCHASE_PATTERN.test(v)) {
				if (v !== "buyInstant") return `acción de compra ${v}`;
				if (!allowInstantBuy) return "buyInstant solo desde finishResearchNow o finishBuildingNow";
			}
			if (key === "model_url" && typeof v === "string") {
				if (BLOCKED_MODEL_PREFIXES.some((prefix) => v.startsWith(prefix))) return `model_url ${v}`;
			}
			if (key === "celebration_type" && v === "olympic") return "celebration_type olympic";
			if ((key === "offer_type" || key === "demand_type") && v === "gold") return `${key} gold`;
			if (key === "gold") {
				const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
				if (typeof n !== "number" || Number.isNaN(n) || n > 0) return `gold = ${String(v)}`;
			}
			const nested = goldRisk(v, allowInstantBuy, depth + 1);
			if (nested !== null) return nested;
		}
		return null;
	}
	function assertNoGoldSpend(req, allowInstantBuy) {
		if (BLOCKED_CONTROLLER_PATTERN.test(req.controller)) throw new GoldSpendRefusedError(`${describeRequest(req)}: el controlador ${req.controller} puede cobrar oro; bloqueado`, null);
		if (PURCHASE_PATTERN.test(req.action)) throw new GoldSpendRefusedError(`${describeRequest(req)}: acción de compra ${req.action}; bloqueado`, null);
		const risk = goldRisk(req.payload, allowInstantBuy);
		if (risk !== null) throw new GoldSpendRefusedError(`${describeRequest(req)}: ${risk}; bloqueado`, null);
	}
	function jsonTownId(req) {
		return req.townIdAsString === true ? String(req.townId) : req.townId;
	}
	function cleanUnits(units) {
		const clean = {};
		for (const [unit, amount] of Object.entries(units)) {
			if (!isUnitId(unit)) throw new GameApiError(`unidad desconocida: ${unit}`);
			if (!Number.isInteger(amount) || amount < 0) throw new GameApiError(`cantidad no válida para ${unit}: ${String(amount)}`);
			if (amount > 0) clean[unit] = amount;
		}
		if (Object.keys(clean).length === 0) throw new GameApiError("no hay unidades que enviar");
		return clean;
	}
	var MARKET_OFFERS_DEFAULTS = {
		limit: 12,
		offset: 0,
		demandType: "all_but_gold",
		offerType: "all_but_gold",
		maxRatio: 3,
		maxDeliveryTime: 172800,
		visibility: 2,
		orderBy: "ratio",
		orderDirection: "desc"
	};
	var OWN_MARKET_OFFERS_DEFAULTS = {
		limit: 100,
		offset: 0,
		orderBy: "created_at",
		orderDirection: "desc",
		allTowns: true
	};
	function createGameApi(deps) {
		const { win, logger } = deps;
		const fetchImpl = deps.fetch ?? ((input, init) => fetch(input, init));
		const queue = deps.queue instanceof RequestQueue ? deps.queue : new RequestQueue(deps.queue);
		const now = deps.now ?? Date.now;
		const timeoutMs = deps.timeoutMs ?? 3e4;
		const safety = deps.safety ?? new SafetyGuard({
			logger,
			isDryRun: () => true
		});
		let serverOffset = null;
		const serverNow = () => readClientServerTime(win) ?? (serverOffset === null ? null : now() / 1e3 + serverOffset);
		const clientAjax = deps.fetch === void 0 ? resolveClientAjax(win) : null;
		logger.info(clientAjax ? "peticiones por gpAjax, como el cliente" : "peticiones por fetch (gpAjax no disponible)");
		function buildInit(req, ctx) {
			const query = req.query ?? { town_id: req.townId };
			const payload = {
				...req.payload,
				town_id: jsonTownId(req),
				nl_init: true
			};
			const headers = {
				Accept: "text/plain, */*; q=0.01",
				"X-Requested-With": "XMLHttpRequest"
			};
			const init = {
				method: req.method,
				credentials: "same-origin",
				headers
			};
			if (req.method === "POST") {
				headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
				init.body = encodeJsonBody(payload);
				return {
					url: buildUrl(win.location.origin, req.controller, query, req.action, ctx.h),
					init
				};
			}
			return {
				url: buildUrl(win.location.origin, req.controller, query, req.action, ctx.h, {
					json: JSON.stringify(payload),
					_: now()
				}),
				init
			};
		}
		async function fetchWithTimeout(url, init) {
			const controller = typeof AbortController === "function" ? new AbortController() : null;
			let timer;
			const timeout = new Promise((_, reject) => {
				timer = setTimeout(() => {
					controller?.abort();
					reject(new Error("tiempo de espera agotado"));
				}, timeoutMs);
			});
			try {
				const signal = controller?.signal;
				return await Promise.race([fetchImpl(url, signal ? {
					...init,
					signal
				} : init), timeout]);
			} finally {
				clearTimeout(timer);
			}
		}
		async function viaFetch(req, label) {
			const { url, init } = buildInit(req, readGameContext(win));
			let res;
			try {
				res = await fetchWithTimeout(url, init);
			} catch (err) {
				throw new NoResponse(String(err));
			}
			safety.noteStatus(res.status, res.headers.get("Retry-After"), label);
			if (!res.ok) throw new GameApiError(`HTTP ${res.status}`, { status: res.status });
			try {
				return await res.json();
			} catch {
				throw new GameApiError("la respuesta no es JSON", { status: res.status });
			}
		}
		function viaGpAjax(ajax, req) {
			return new Promise((resolve, reject) => {
				let settled = false;
				const timer = setTimeout(() => {
					settle(() => {
						reject(new NoResponse("tiempo de espera agotado"));
					});
				}, timeoutMs);
				function settle(fn) {
					if (settled) return;
					settled = true;
					clearTimeout(timer);
					fn();
				}
				const callbacks = {
					success: (_layout, json) => {
						settle(() => {
							resolve({ json: isRecord$1(json) ? { ...json } : json });
						});
					},
					error: (_layout, json) => {
						settle(() => {
							if (isRecord$1(json)) resolve({ json: { ...json } });
							else reject(new GameApiError("error HTTP (gpAjax no da el código)"));
						});
					}
				};
				const payload = {
					...req.payload,
					town_id: jsonTownId(req)
				};
				const method = req.method === "POST" ? ajax.ajaxPost : ajax.ajaxGet;
				try {
					deps.ownRequests?.note(req.controller, req.action, req.payload);
					method.call(ajax, req.controller, req.action, payload, false, callbacks);
				} catch (err) {
					settle(() => {
						reject(new GameApiError(`gpAjax: ${err instanceof Error ? err.message : String(err)}`));
					});
				}
			});
		}
		async function send(req, write, label) {
			let body;
			try {
				body = clientAjax ? await viaGpAjax(clientAjax, req) : await viaFetch(req, label);
			} catch (err) {
				if (err instanceof NoResponse) {
					if (write) {
						logger.warn(`${label}: sin respuesta (${err.message})`, { reason: "no se reintenta: la acción pudo aplicarse" });
						throw new RequestOutcomeUnknownError(label);
					}
					throw new NetworkError(`${label}: sin respuesta: ${err.message}`);
				}
				logger.error(`${label}: ${err instanceof Error ? err.message : String(err)}`);
				throw err;
			}
			if (safety.inspect(body, label) !== null && safety.stopped) throw new SafetyStopError(safety.stopped);
			if (isRecord$1(body) && typeof body._srvtime === "number" && Number.isFinite(body._srvtime)) serverOffset = body._srvtime - now() / 1e3;
			try {
				const json = unwrapResponse(body);
				if (typeof json.success === "string" && json.success !== "") logger.success(`${label}: ${json.success}`);
				else logger.info(`${label}: OK`);
				return json;
			} catch (err) {
				logger.error(`${label}: ${err instanceof Error ? err.message : String(err)}`);
				throw err;
			}
		}
		function guardedRequest(req, allowInstantBuy) {
			const write = req.write ?? req.method === "POST";
			const label = describeRequest(req);
			try {
				assertNoGoldSpend(req, allowInstantBuy);
				safety.assertRunning();
			} catch (err) {
				return Promise.reject(err instanceof Error ? err : new Error(String(err)));
			}
			if (write && safety.isDryRun) {
				logger.info(`simulación: ${label}`, { reason: `no enviado; datos ${JSON.stringify(req.payload ?? {})}` });
				return Promise.resolve({ dry_run: true });
			}
			return queue.enqueue(async () => {
				for (let attempt = 1;; attempt++) {
					await safety.acquire();
					try {
						return await send(req, write, label);
					} catch (err) {
						if (!(!write && attempt === 1 && err instanceof NetworkError)) {
							if (err instanceof NetworkError) logger.error(err.message);
							throw err;
						}
						logger.warn(`${err.message}; se reintenta una vez`);
					}
				}
			});
		}
		const worldCache = new Map();
		const worldPending = new Map();
		function worldFile(kind, opts = {}) {
			const maxAge = Math.max(WORLD_DATA_REFRESH_MIN_MS, opts.maxAgeMs ?? 36e5);
			const cached = worldCache.get(kind);
			if (cached && now() - cached.at < maxAge) return Promise.resolve(cached.text);
			const pending = worldPending.get(kind);
			if (pending) return pending;
			const download = downloadWorldFile(kind).finally(() => {
				worldPending.delete(kind);
			});
			worldPending.set(kind, download);
			return download;
		}
		async function downloadWorldFile(kind) {
			safety.assertRunning();
			const label = `GET data/${kind}.txt`;
			const text = await queue.enqueue(async () => {
				await safety.acquire();
				let res;
				try {
					res = await fetchWithTimeout(`${win.location.origin}/data/${kind}.txt`, { credentials: "same-origin" });
				} catch (err) {
					logger.error(`${label}: sin respuesta: ${String(err)}`);
					throw new NetworkError(`${label}: sin respuesta: ${String(err)}`);
				}
				safety.noteStatus(res.status, res.headers.get("Retry-After"), label);
				if (!res.ok) {
					logger.error(`${label}: HTTP ${res.status}`);
					throw new GameApiError(`HTTP ${res.status}`, { status: res.status });
				}
				return res.text();
			});
			worldCache.set(kind, {
				at: now(),
				text
			});
			return text;
		}
		const request = (req) => guardedRequest(req, false);
		const bridgePayload = (modelUrl, actionName, args) => modelUrl === "BuildingMarket" ? {
			model_url: modelUrl,
			action_name: actionName,
			arguments: args
		} : {
			model_url: modelUrl,
			action_name: actionName,
			captcha: null,
			arguments: args
		};
		async function frontendBridge(townId, modelUrl, actionName, args, allowInstantBuy = false) {
			assertId("townId", townId);
			return guardedRequest({
				method: "POST",
				controller: "frontend_bridge",
				action: "execute",
				townId,
				payload: { ...bridgePayload(modelUrl, actionName, args) }
			}, allowInstantBuy);
		}
		async function readBridge(townId, modelUrl, actionName, args, method = "POST") {
			assertId("townId", townId);
			const payload = bridgePayload(modelUrl, actionName, args);
			return request({
				method,
				controller: "frontend_bridge",
				action: "execute",
				townId,
				payload: { ...payload },
				write: false
			});
		}
		async function indexOf(controller, townId, params) {
			assertId("townId", townId);
			const req = {
				method: "GET",
				controller,
				action: "index",
				townId
			};
			if (params !== void 0) req.payload = params;
			return request(req);
		}
		function assertFreeFinish(what, type, toBeCompletedAt) {
			if (!Number.isFinite(toBeCompletedAt)) throw new GoldSpendRefusedError(`${what}: fin de la orden desconocido`, null);
			const nowSec = serverNow();
			if (nowSec === null) throw new GoldSpendRefusedError(`${what}: hora del servidor desconocida`, null);
			const remaining = Math.ceil(toBeCompletedAt - nowSec);
			const limit = 285;
			if (remaining > limit) throw new GoldSpendRefusedError(`${what}: quedan ${remaining} s (límite gratuito ${limit} s), costaría oro`, remaining);
			const price = readInstantBuyPrice(win, type, Math.max(0, remaining));
			if (price !== 0) throw new GoldSpendRefusedError(price === null ? `${what}: el cliente no da el precio (GameDataInstantBuy); no se arriesga` : `${what}: el cliente indica un precio de ${price} de oro`, remaining);
		}
		function assertFestival(type) {
			if (type === "olympic") throw new GoldSpendRefusedError("los Juegos Olímpicos cuestan oro: bloqueados", null);
			if (!FREE_CELEBRATIONS.includes(type)) throw new GameApiError(`festival desconocido: ${type}`);
		}
		function checkNoCost(what, json) {
			const { costs } = json;
			if (hasCost(costs)) logger.error(`${what}: el servidor indica un coste de ${JSON.stringify(costs)}`);
		}
		function hasCost(costs) {
			if (costs === void 0 || costs === null) return false;
			if (typeof costs === "number") return costs !== 0;
			if (typeof costs === "object") return Object.values(costs).some(hasCost);
			return true;
		}
		return {
			context: () => readGameContext(win),
			pendingRequests: () => queue.size,
			serverNow,
			request,
			async research(townId, researchId) {
				if (!isResearchId(researchId)) throw new GameApiError(`investigación desconocida: ${String(researchId)}`);
				const json = await frontendBridge(townId, "ResearchOrder", "research", { id: researchId });
				return {
					orders: parseResearchOrders(json),
					json
				};
			},
			async finishResearchNow(townId, orderId, toBeCompletedAt) {
				assertId("orderId", orderId);
				assertFreeFinish("terminar investigación", "research", toBeCompletedAt);
				const json = await frontendBridge(townId, `ResearchOrder/${orderId}`, "buyInstant", { order_id: orderId }, true);
				checkNoCost("terminar investigación", json);
				return json;
			},
			async cancelResearch(townId, orderId) {
				assertId("orderId", orderId);
				return frontendBridge(townId, `ResearchOrder/${orderId}`, "cancel", {});
			},
			async recruit(townId, unitId, amount) {
				assertId("townId", townId);
				if (!isUnitId(unitId)) throw new GameApiError(`unidad desconocida: ${String(unitId)}`);
				if (!Number.isInteger(amount) || amount <= 0) throw new GameApiError(`cantidad no válida: ${String(amount)}`);
				const json = await request({
					method: "POST",
					controller: isNavalUnit(unitId) ? "building_docks" : "building_barracks",
					action: "build",
					townId,
					payload: {
						unit_id: unitId,
						amount
					}
				});
				return {
					orders: parseUnitOrders(json),
					json
				};
			},
			async getBanditCampRuntimes(townId) {
				const { playerId } = readGameContext(win);
				return frontendBridge(townId, `PlayerAttackSpot/${playerId}`, "getUnitRuntimes", {});
			},
			async attackBanditCamp(townId, units) {
				const clean = cleanUnits(units);
				const { playerId } = readGameContext(win);
				return frontendBridge(townId, `PlayerAttackSpot/${playerId}`, "attack", clean);
			},
			async claimBanditCampReward(townId, mode) {
				const action = {
					stash: "stashReward",
					use: "useReward"
				}[mode];
				if (action === void 0) throw new GameApiError(`recompensa: modo no válido: ${mode}`);
				const { playerId } = readGameContext(win);
				return frontendBridge(townId, `PlayerAttackSpot/${playerId}`, action, {});
			},
			async simulateFight(townId, { attacker, defender, luck }) {
				if (!Number.isInteger(luck) || luck < -30 || luck > 30) throw new GameApiError(`suerte no válida: ${String(luck)}`);
				const fields = [["sim[attack_strategy]", "regular"], ["sim[mods][att][luck]", luck]];
				for (const [side, units] of [["att", attacker], ["def", defender]]) for (const [unit, n] of Object.entries(cleanUnits(units))) fields.push([`sim[units][${side}][${unit}]`, n]);
				const json = await readBridge(townId, "Simulator", "simulate", { params: fields.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&") });
				const sim = parseFightSimulation(json);
				if (sim === null) throw new GameApiError("simulador: la respuesta no trae att_survives y def_survives");
				return {
					...sim,
					json
				};
			},
			getBuildingMainInfo: (townId) => indexOf("building_main", townId),
			async readIslandSpot(townId, { x, y, spot }) {
				for (const [name, v] of [
					["x", x],
					["y", y],
					["spot", spot]
				]) if (!Number.isInteger(v) || v < 0) throw new GameApiError(`${name} no válido: ${String(v)}`);
				const json = await readBridge(townId, "RuntimeSimulator", "read", { island_coordinates: {
					x,
					y,
					spot
				} });
				return {
					...parseIslandSpotInfo(json),
					json
				};
			},
			async createAttackPlan(townId, plan) {
				assertId("townId", townId);
				assertId("targetId", plan.targetId);
				if (plan.name.trim() === "") throw new GameApiError("el plan necesita nombre");
				return request({
					method: "POST",
					controller: "attack_planer",
					action: "create_plan",
					townId,
					payload: {
						name: plan.name,
						description: plan.description,
						target_id: plan.targetId,
						simple_plan_list: plan.simplePlanList ?? 1
					}
				});
			},
			async getAttackPlans(townId) {
				assertId("townId", townId);
				return request({
					method: "GET",
					controller: "attack_planer",
					action: "attacks",
					townId
				});
			},
			async getMarketOffers(townId, query = {}) {
				const q = {
					...MARKET_OFFERS_DEFAULTS,
					...query
				};
				for (const [name, v] of [
					["limit", q.limit],
					["offset", q.offset],
					["max_ratio", q.maxRatio],
					["max_delivery_time", q.maxDeliveryTime]
				]) if (!Number.isFinite(v) || v < 0) throw new GameApiError(`${name} no válido: ${String(v)}`);
				const json = await readBridge(townId, "BuildingMarket", "getData", {
					limit: q.limit,
					offset: q.offset,
					demand_type: q.demandType,
					offer_type: q.offerType,
					max_ratio: q.maxRatio,
					max_delivery_time: q.maxDeliveryTime,
					visibility: q.visibility,
					order_by: q.orderBy,
					order_direction: q.orderDirection
				});
				return {
					offers: parseMarketOffers(json),
					json
				};
			},
			async getOwnMarketOffers(townId, query = {}) {
				const q = {
					...OWN_MARKET_OFFERS_DEFAULTS,
					...query
				};
				const json = await readBridge(townId, "BuildingMarket", "getOwnOffers", {
					limit: q.limit,
					offset: q.offset,
					order_by: q.orderBy,
					order_direction: q.orderDirection,
					all_towns: q.allTowns
				});
				return {
					...parseOwnMarketOffers(json),
					json
				};
			},
			async acceptMarketOffer(townId, offer, amount) {
				const resources = [
					"wood",
					"stone",
					"iron"
				];
				if (!Number.isInteger(offer.id) || offer.id <= 0 || !resources.includes(offer.offerType ?? "") || !resources.includes(offer.demandType ?? "")) throw new GoldSpendRefusedError(`aceptar la oferta ${String(offer.id)} (${String(offer.offerType)} por ${String(offer.demandType)}): solo madera, piedra y plata; bloqueado`, null);
				assertAmount("amount", amount);
				if (offer.demand === null || amount > offer.demand) throw new GameApiError(`como mucho ${String(offer.demand)} por esa oferta (pedido ${String(amount)})`);
				return frontendBridge(townId, "BuildingMarket", "acceptOffer", {
					offer_id: offer.id,
					amount
				});
			},
			async useInventoryItem(townId, inventoryItemId) {
				assertId("inventoryItemId", inventoryItemId);
				return frontendBridge(townId, `InventoryItem/${inventoryItemId}`, "utilize", { inventory_item_id: inventoryItemId });
			},
			async getIslandQuestStatus(townId) {
				const json = await readBridge(townId, "IslandQuests", "getIslandQuestStatus", {});
				return {
					...parseIslandQuestStatus(json),
					json
				};
			},
			async changeGod(townId, godId) {
				assertId("townId", townId);
				if (!/^[a-z_]+$/.test(godId)) throw new GameApiError(`dios no válido: ${godId}`);
				return request({
					method: "POST",
					controller: "building_temple",
					action: "change_god",
					townId,
					payload: { god_id: godId }
				});
			},
			async getHeroes(townId) {
				assertId("townId", townId);
				const json = await request({
					method: "GET",
					controller: "frontend_bridge",
					action: "fetch",
					townId,
					payload: {
						window_type: "heroes",
						tab_type: "overview",
						known_data: {
							models: [],
							collections: [],
							templates: []
						}
					}
				});
				return {
					heroes: parseHeroesWindow(json),
					json
				};
			},
			async assignHeroToTown(townId, heroId, heroType, targetTownId) {
				assertId("heroId", heroId);
				assertId("targetTownId", targetTownId);
				if (!/^[a-z_]+$/.test(heroType)) throw new GameApiError(`héroe no válido: ${heroType}`);
				const json = await frontendBridge(townId, `PlayerHero/${heroId}`, "assignToTown", {
					type: heroType,
					target_town_id: targetTownId
				});
				return {
					heroes: parseHeroNotifications(json),
					json
				};
			},
			async getFarmTownTradeData(townId, farmTownId) {
				assertId("farmTownId", farmTownId);
				const json = await readBridge(townId, "FarmTownPlayerRelation", "getTownSpecificData", { farm_town_id: farmTownId }, "GET");
				return {
					...parseFarmTownTradeData(json),
					json
				};
			},
			async buildUp(townId, buildingId) {
				if (!isBuildingId(buildingId)) throw new GameApiError(`edificio desconocido: ${String(buildingId)}`);
				return frontendBridge(townId, "BuildingOrder", "buildUp", { building_id: buildingId });
			},
			async tearDown(townId, buildingId) {
				if (!isBuildingId(buildingId)) throw new GameApiError(`edificio desconocido: ${String(buildingId)}`);
				return frontendBridge(townId, "BuildingOrder", "tearDown", { building_id: buildingId });
			},
			async castPowerOnTown(townId, powerId, targetTownId = townId) {
				assertPowerId(powerId);
				assertId("targetTownId", targetTownId);
				return frontendBridge(townId, "CastedPowers", "cast", {
					power_id: powerId,
					target_id: targetTownId
				});
			},
			async tradeBetweenTowns(fromTownId, toTownId, resources) {
				assertId("fromTownId", fromTownId);
				assertId("toTownId", toTownId);
				if (fromTownId === toTownId) throw new GameApiError("origen y destino son la misma ciudad");
				return request({
					method: "POST",
					controller: "town_info",
					action: "trade",
					townId: fromTownId,
					payload: {
						id: toTownId,
						...cleanResources(resources)
					}
				});
			},
			async getTradeOverview(townId) {
				assertId("townId", townId);
				return request({
					method: "GET",
					controller: "town_overviews",
					action: "trade_overview",
					townId
				});
			},
			async claimFarmVillage(townId, relationId, farmTownId, option) {
				assertId("relationId", relationId);
				assertId("farmTownId", farmTownId);
				if (![
					1,
					2,
					3,
					4
				].includes(option)) throw new GameApiError(`opción no válida: ${String(option)}`);
				return frontendBridge(townId, `FarmTownPlayerRelation/${relationId}`, "claim", {
					farm_town_id: farmTownId,
					type: "resources",
					option
				});
			},
			async claimFarmVillagesMultiple(townId, townIds, timeOptionBase, timeOptionBooty) {
				assertId("townId", townId);
				if (townIds.length === 0) throw new GameApiError("no hay ciudades");
				for (const id of townIds) assertId("townIds", id);
				assertAmount("time_option_base", timeOptionBase);
				assertAmount("time_option_booty", timeOptionBooty);
				if (!isAdvisorActive(win, "captain")) throw new GameApiError("recoger todas las aldeas requiere el Capitán activo");
				const json = await request({
					method: "POST",
					controller: "farm_town_overviews",
					action: "claim_loads_multiple",
					townId,
					townIdAsString: true,
					payload: {
						towns: townIds,
						time_option_base: timeOptionBase,
						time_option_booty: timeOptionBooty,
						claim_factor: "normal"
					}
				});
				return {
					towns: parseClaimedTowns(json),
					json
				};
			},
			async unlockFarmVillage(townId, relationId, farmTownId) {
				assertId("relationId", relationId);
				assertId("farmTownId", farmTownId);
				return frontendBridge(townId, `FarmTownPlayerRelation/${relationId}`, "unlock", { farm_town_id: farmTownId });
			},
			async upgradeFarmVillage(townId, relationId, farmTownId) {
				assertId("relationId", relationId);
				assertId("farmTownId", farmTownId);
				return frontendBridge(townId, `FarmTownPlayerRelation/${relationId}`, "upgrade", { farm_town_id: farmTownId });
			},
			async tradeWithFarmVillage(townId, relationId, farmTownId, amount) {
				assertId("relationId", relationId);
				assertId("farmTownId", farmTownId);
				assertAmount("amount", amount);
				if (amount > 3e3) throw new GameApiError(`como mucho ${FARM_TRADE_MAX} por operación (pedido ${amount})`);
				return frontendBridge(townId, `FarmTownPlayerRelation/${relationId}`, "trade", {
					farm_town_id: farmTownId,
					amount
				});
			},
			async storeIronInHide(townId, iron) {
				assertAmount("iron", iron);
				return frontendBridge(townId, "BuildingHide", "storeIron", { iron_to_store: iron });
			},
			async claimIslandQuestReward(townId, progressableId) {
				assertId("progressableId", progressableId);
				return frontendBridge(townId, "IslandQuests", "claimReward", {
					reward_action: "stash",
					state: "closed",
					progressable_id: progressableId
				});
			},
			async closeBeginnerQuest(townId, id, progressableId) {
				assertId("id", id);
				if (!(typeof progressableId === "number" && Number.isInteger(progressableId) && progressableId > 0 || typeof progressableId === "string" && /^[\w.-]+$/.test(progressableId))) throw new GameApiError(`progressable_id no válido: ${String(progressableId)}`);
				return frontendBridge(townId, `Progressable/${String(id)}`, "progressTo", {
					progressable_id: progressableId,
					state: "closed"
				});
			},
			getPlayers: async (opts) => parsePlayers(await worldFile("players", opts)),
			getAlliances: async (opts) => parseAlliances(await worldFile("alliances", opts)),
			getWorldTowns: async (opts) => parseTowns(await worldFile("towns", opts)),
			getPlayerKills: async (kind, opts) => parseKills(await worldFile(kind === "att" ? "player_kills_att" : "player_kills_def", opts)),
			getConquers: async (opts) => parseConquers(await worldFile("conquers", opts)),
			worldDataAt: (kind) => worldCache.get(kind)?.at ?? null,
			async sendUnits(fromTownId, targetTownId, units, type) {
				assertId("fromTownId", fromTownId);
				assertId("targetTownId", targetTownId);
				const clean = cleanUnits(units);
				const json = await request({
					method: "POST",
					controller: "town_info",
					action: "send_units",
					townId: fromTownId,
					payload: {
						...clean,
						id: targetTownId,
						type
					}
				});
				return {
					commands: parseMovementNotifications(json),
					json
				};
			},
			async sendUnitsViaBridge(fromTownId, targetTownId, units, type) {
				assertId("targetTownId", targetTownId);
				const clean = cleanUnits(units);
				const json = await frontendBridge(fromTownId, `Town/${fromTownId}`, "sendUnits", {
					id: targetTownId,
					type,
					...clean
				});
				return {
					commands: parseMovementNotifications(json),
					json
				};
			},
			async cancelCommand(townId, commandId) {
				assertId("townId", townId);
				assertId("commandId", commandId);
				return request({
					method: "POST",
					controller: "town_overviews",
					action: "cancel_command",
					townId,
					payload: { id: commandId }
				});
			},
			async getAttackInfo(townId, targetTownId) {
				assertId("townId", townId);
				assertId("targetTownId", targetTownId);
				return request({
					method: "GET",
					controller: "town_info",
					action: "attack",
					townId,
					payload: { id: targetTownId }
				});
			},
			async castPowerOnCommand(townId, commandId, powerId) {
				assertId("commandId", commandId);
				assertPowerId(powerId);
				return frontendBridge(townId, "Commands", "cast", {
					id: commandId,
					power_id: powerId
				});
			},
			async spy(townId, targetTownId, iron) {
				assertId("townId", townId);
				assertId("targetTownId", targetTownId);
				assertAmount("espionage_iron", iron);
				return request({
					method: "POST",
					controller: "town_info",
					action: "spy",
					townId,
					payload: {
						id: targetTownId,
						espionage_iron: iron
					}
				});
			},
			async viewReport(townId, reportId) {
				assertId("townId", townId);
				assertId("reportId", reportId);
				return request({
					method: "POST",
					controller: "report",
					action: "view",
					townId,
					payload: { id: reportId },
					write: false
				});
			},
			async fetchNotifications(townId) {
				assertId("townId", townId);
				return request({
					method: "GET",
					controller: "notify",
					action: "fetch",
					townId,
					payload: { no_sysmsg: false }
				});
			},
			async getCommandOverview(townId) {
				assertId("townId", townId);
				return request({
					method: "GET",
					controller: "town_overviews",
					action: "command_overview",
					townId
				});
			},
			async requestMilitia(townId) {
				assertId("townId", townId);
				return request({
					method: "POST",
					controller: "building_farm",
					action: "request_militia",
					townId
				});
			},
			getIslandInfo: (townId, params) => indexOf("island_info", townId, params),
			getBuildingPlaceInfo: (townId) => indexOf("building_place", townId),
			async finishBuildingNow(townId, orderId, toBeCompletedAt) {
				assertId("orderId", orderId);
				assertFreeFinish("terminar construcción", "building", toBeCompletedAt);
				const json = await frontendBridge(townId, `BuildingOrder/${orderId}`, "buyInstant", { order_id: orderId }, true);
				checkNoCost("terminar construcción", json);
				return json;
			},
			async startFestival(townId, type) {
				assertId("townId", townId);
				assertFestival(type);
				return request({
					method: "POST",
					controller: "building_place",
					action: "start_celebration",
					townId,
					payload: { celebration_type: type }
				});
			},
			async startFestivalFromOverview(townId, type) {
				assertId("townId", townId);
				assertFestival(type);
				return request({
					method: "POST",
					controller: "town_overviews",
					action: "start_celebration",
					townId,
					payload: {
						celebration_type: type,
						no_bar: 1
					}
				});
			},
			async startAllFestivals(townId, type) {
				assertId("townId", townId);
				assertFestival(type);
				return request({
					method: "POST",
					controller: "town_overviews",
					action: "start_all_celebrations",
					townId,
					payload: { celebration_type: type }
				});
			}
		};
	}
	var OWN_REQUEST_TTL_MS = 12e4;
	var key = (controller, action, id) => `${controller}/${action}/${String(id)}`;
	function createOwnRequests(now = Date.now) {
		const pending = new Map();
		const prune = (at) => {
			for (const [k, list] of pending) {
				const alive = list.filter((until) => until > at);
				if (alive.length === 0) pending.delete(k);
				else pending.set(k, alive);
			}
		};
		return {
			note(controller, action, payload) {
				const at = now();
				prune(at);
				const k = key(controller, action, payload?.id);
				pending.set(k, [...pending.get(k) ?? [], at + OWN_REQUEST_TTL_MS]);
			},
			consume(controller, action, id) {
				prune(now());
				const k = key(controller, action, id);
				const list = pending.get(k);
				if (!list) return false;
				list.shift();
				if (list.length === 0) pending.delete(k);
				return true;
			}
		};
	}
	var UNIT_NAMES = {
		es: {
			sword: "Espadachín",
			slinger: "Hondero",
			archer: "Arquero",
			hoplite: "Hoplita",
			rider: "Jinete",
			chariot: "Carro",
			catapult: "Catapulta",
			big_transporter: "Barco de transporte",
			small_transporter: "Barco de transporte rápido",
			bireme: "Birreme",
			attack_ship: "Barco de combate ligero",
			demolition_ship: "Barco incendiario",
			trireme: "Trirreme",
			colonize_ship: "Barco colonizador",
			godsent: "Enviado divino",
			minotaur: "Minotauro",
			manticore: "Mantícora",
			zyklop: "Cíclope",
			sea_monster: "Hidra",
			harpy: "Arpía",
			medusa: "Medusa",
			centaur: "Centauro",
			pegasus: "Pegaso",
			cerberus: "Cerbero",
			fury: "Erinia",
			griffin: "Grifo",
			calydonian_boar: "Jabalí de Calidón",
			siren: "Sirena",
			satyr: "Sátiro",
			spartoi: "Espartos",
			ladon: "Ladón"
		},
		en: {
			sword: "Swordsman",
			slinger: "Slinger",
			archer: "Archer",
			hoplite: "Hoplite",
			rider: "Horseman",
			chariot: "Chariot",
			catapult: "Catapult",
			big_transporter: "Transport boat",
			small_transporter: "Fast transport ship",
			bireme: "Bireme",
			attack_ship: "Light ship",
			demolition_ship: "Fire ship",
			trireme: "Trireme",
			colonize_ship: "Colony ship",
			godsent: "Divine envoy",
			minotaur: "Minotaur",
			manticore: "Manticore",
			zyklop: "Cyclops",
			sea_monster: "Hydra",
			harpy: "Harpy",
			medusa: "Medusa",
			centaur: "Centaur",
			pegasus: "Pegasus",
			cerberus: "Cerberus",
			fury: "Erinys",
			griffin: "Griffin",
			calydonian_boar: "Calydonian boar",
			siren: "Siren",
			satyr: "Satyr",
			spartoi: "Spartoi",
			ladon: "Ladon"
		}
	};
	var GOD_NAMES = {
		es: {
			zeus: "Zeus",
			poseidon: "Poseidón",
			hera: "Hera",
			athena: "Atenea",
			hades: "Hades",
			artemis: "Artemisa",
			aphrodite: "Afrodita",
			ares: "Ares"
		},
		en: {
			zeus: "Zeus",
			poseidon: "Poseidon",
			hera: "Hera",
			athena: "Athena",
			hades: "Hades",
			artemis: "Artemis",
			aphrodite: "Aphrodite",
			ares: "Ares"
		}
	};
	var RESEARCH_NAMES = {
		es: {
			slinger: "Hondero",
			archer: "Arquero",
			town_guard: "Guardia urbana",
			hoplite: "Hoplita",
			diplomacy: "Diplomacia",
			meteorology: "Meteorología",
			espionage: "Espionaje",
			booty: "Botín",
			pottery: "Cerámica",
			rider: "Jinete",
			architecture: "Arquitectura",
			instructor: "Instructor",
			colonize_ship: "Barco colonizador",
			bireme: "Birreme",
			building_crane: "Grúa",
			shipwright: "Constructor naval",
			chariot: "Carro",
			attack_ship: "Barco de combate ligero",
			conscription: "Servicio militar",
			demolition_ship: "Barco incendiario",
			catapult: "Catapulta",
			cryptography: "Criptografía",
			democracy: "Democracia",
			small_transporter: "Barco de transporte rápido",
			plow: "Arado",
			berth: "Jaulas",
			trireme: "Trirreme",
			phalanx: "Falange",
			breach: "Brecha",
			mathematics: "Matemáticas",
			ram: "Ariete",
			cartography: "Cartografía",
			take_over: "Conquista",
			stone_storm: "Lluvia de piedras",
			temple_looting: "Saqueo del templo",
			divine_selection: "Selección divina",
			combat_experience: "Experiencia de combate",
			strong_wine: "Vino fuerte",
			set_sail: "Izar las velas"
		},
		en: {
			slinger: "Slinger",
			archer: "Archer",
			town_guard: "City guard",
			hoplite: "Hoplite",
			diplomacy: "Diplomacy",
			meteorology: "Meteorology",
			espionage: "Espionage",
			booty: "Booty",
			pottery: "Ceramics",
			rider: "Horseman",
			architecture: "Architecture",
			instructor: "Instructor",
			colonize_ship: "Colony ship",
			bireme: "Bireme",
			building_crane: "Crane",
			shipwright: "Shipwright",
			chariot: "Chariot",
			attack_ship: "Light ship",
			conscription: "Conscription",
			demolition_ship: "Fire ship",
			catapult: "Catapult",
			cryptography: "Cryptography",
			democracy: "Democracy",
			small_transporter: "Fast transport ship",
			plow: "Plow",
			berth: "Berth",
			trireme: "Trireme",
			phalanx: "Phalanx",
			breach: "Breakthrough",
			mathematics: "Mathematics",
			ram: "Battering ram",
			cartography: "Cartography",
			take_over: "Conquest",
			stone_storm: "Stone hail",
			temple_looting: "Temple looting",
			divine_selection: "Divine selection",
			combat_experience: "Combat experience",
			strong_wine: "Strong wine",
			set_sail: "Set sail"
		}
	};
	var POWER_NAMES = {
		es: {
			fertility_improvement: "Crecimiento demográfico",
			spartan_training: "Entrenamiento espartano",
			call_of_the_ocean: "Llamada del océano"
		},
		en: {
			fertility_improvement: "Fertility improvement",
			spartan_training: "Spartan training",
			call_of_the_ocean: "Call of the ocean"
		}
	};
	function researchName(lang, id) {
		return RESEARCH_NAMES[lang][id];
	}
	function powerName(lang, id) {
		return POWER_NAMES[lang][id];
	}
	function unitName(lang, unit) {
		return UNIT_NAMES[lang][unit];
	}
	function godName(lang, god) {
		return GOD_NAMES[lang][god] ?? god;
	}
	var BUILDING_NAMES_EN = {
		main: "Senate",
		farm: "Farm",
		storage: "Warehouse",
		lumber: "Timber camp",
		stoner: "Quarry",
		ironer: "Silver mine",
		barracks: "Barracks",
		docks: "Harbor",
		academy: "Academy",
		temple: "Temple",
		market: "Marketplace",
		wall: "City wall",
		hide: "Cave",
		theater: "Theater",
		thermal: "Thermal baths",
		library: "Library",
		lighthouse: "Lighthouse",
		tower: "Tower",
		statue: "Divine statue",
		oracle: "Oracle",
		trade_office: "Merchant shop"
	};
	function buildingNameEn(id) {
		return BUILDING_NAMES_EN[id] ?? id;
	}
	function isRecord(value) {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}
	function call(obj, name, ...args) {
		if (!isRecord(obj) && typeof obj !== "function") return void 0;
		const fn = obj[name];
		if (typeof fn !== "function") return void 0;
		try {
			return fn.apply(obj, args);
		} catch {
			return;
		}
	}
	function attrs(model) {
		if (!isRecord(model)) return null;
		return isRecord(model.attributes) ? model.attributes : model;
	}
	function models(collection) {
		if (!isRecord(collection)) return [];
		return Array.isArray(collection.models) ? collection.models : [];
	}
	function num(value) {
		if (typeof value === "number" && Number.isFinite(value)) return value;
		if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
		return null;
	}
	function numbersOf(rec) {
		const out = {};
		if (!rec) return out;
		for (const [k, v] of Object.entries(rec)) {
			const n = num(v);
			if (n !== null) out[k] = n;
		}
		return out;
	}
	function town(win, townId) {
		const towns = isRecord(win.ITowns) ? win.ITowns.towns : void 0;
		return isRecord(towns) ? towns[townId] : void 0;
	}
	function buildingQueueLength(win) {
		if (call(win.GameDataPremium, "isAdvisorActivated", "curator") === true) return 7;
		const n = num(call(win.GameDataConstructionQueue, "getBuildingOrdersQueueLength"));
		return n !== null && n > 0 ? n : null;
	}
	function unitQueueLength(win) {
		const n = num(call(win.GameDataConstructionQueue, "getUnitOrdersQueueLength"));
		return n !== null && n > 0 ? n : null;
	}
	function orders(collection) {
		const out = [];
		for (const m of models(collection)) {
			const a = attrs(m);
			const id = num(a?.id);
			if (!a || id === null) continue;
			out.push({
				id,
				toBeCompletedAt: num(a.to_be_completed_at),
				attributes: a
			});
		}
		return out;
	}
	function buildingOrders(win, townId) {
		return orders(call(town(win, townId), "buildingOrders"));
	}
	function queuedBuildingLevels(win, townId) {
		const out = {};
		for (const order of buildingOrders(win, townId)) {
			const type = order.attributes.building_type;
			if (typeof type !== "string") continue;
			out[type] = (out[type] ?? 0) + (order.attributes.tear_down === true ? -1 : 1);
		}
		return out;
	}
	function researchOrders(win, townId) {
		return orders(call(town(win, townId), "researchOrders"));
	}
	function unitQueue(win, townId) {
		const collection = call(town(win, townId), "getUnitOrdersCollection");
		if (!isRecord(collection) || !Array.isArray(collection.models)) return null;
		const out = [];
		for (const m of collection.models) {
			const a = attrs(m);
			const unitType = a?.unit_type;
			const left = num(a?.units_left) ?? num(a?.count);
			if (!a || typeof unitType !== "string" || left === null) return null;
			out.push({
				unitType,
				left,
				kind: typeof a.kind === "string" ? a.kind : null
			});
		}
		return out;
	}
	function buildingLevels(win, townId) {
		const a = attrs(call(town(win, townId), "buildings"));
		return a ? numbersOf(a) : null;
	}
	function availablePopulation(win, townId) {
		return num(call(town(win, townId), "getAvailablePopulation"));
	}
	function buildingMaxLevel(win, buildingId) {
		const all = isRecord(win.GameData) ? win.GameData.buildings : void 0;
		const b = isRecord(all) ? all[buildingId] : void 0;
		return isRecord(b) ? num(b.max_level) : null;
	}
	function researchesDone(win, townId) {
		const a = attrs(call(town(win, townId), "researches"));
		if (!a) return null;
		return Object.entries(a).filter(([, v]) => v === true).map(([k]) => k);
	}
	function townUnits(win, townId) {
		const value = call(town(win, townId), "units");
		return isRecord(value) ? numbersOf(attrs(value)) : null;
	}
	function townUnitsOuter(win, townId) {
		const value = call(town(win, townId), "unitsOuter");
		return isRecord(value) ? numbersOf(attrs(value)) : null;
	}
	function townGod(win, townId) {
		const t = town(win, townId);
		for (const value of [
			call(t, "god"),
			call(t, "getGod"),
			attrs(t)?.god
		]) if (typeof value === "string" && value !== "") return value.toLowerCase();
		return null;
	}
	function townGodState(win, townId) {
		const god = townGod(win, townId);
		if (god !== null) return god;
		const t = town(win, townId);
		if (!isRecord(t)) return void 0;
		const a = isRecord(t.attributes) ? t.attributes : null;
		return [
			typeof t.god === "function" ? call(t, "god") : void 0,
			typeof t.getGod === "function" ? call(t, "getGod") : void 0,
			a && "god" in a ? a.god : void 0
		].some((v) => v === null || v === "") ? null : void 0;
	}
	function parseMissingDependencies(raw) {
		const out = [];
		if (Array.isArray(raw)) {
			for (const item of raw) if (typeof item === "string") out.push({
				building: item,
				level: 0
			});
			else if (isRecord(item)) {
				const building = item.building_id ?? item.id ?? item.building;
				if (typeof building === "string") out.push({
					building,
					level: num(item.needed_level ?? item.level) ?? 0
				});
			}
		} else if (isRecord(raw)) for (const [building, v] of Object.entries(raw)) {
			const level = isRecord(v) ? num(v.needed_level ?? v.level) : num(v);
			out.push({
				building,
				level: level ?? 0
			});
		}
		return out;
	}
	var bool = (v) => typeof v === "boolean" ? v : null;
	function buildingBuildData(win, townId) {
		const all = call(win.MM, "getModels");
		const byTown = isRecord(all) ? all.BuildingBuildData : void 0;
		const data = attrs(isRecord(byTown) ? byTown[townId] : void 0)?.building_data;
		if (!isRecord(data)) return null;
		const out = {};
		for (const [building, raw] of Object.entries(data)) {
			if (!isRecord(raw)) continue;
			out[building] = {
				canUpgrade: bool(raw.can_upgrade),
				resourcesFor: isRecord(raw.resources_for) ? numbersOf(raw.resources_for) : {},
				populationFor: num(raw.population_for),
				enoughResources: bool(raw.enough_resources),
				enoughStorage: bool(raw.enough_storage),
				hasMaxLevel: bool(raw.has_max_level),
				groupLocked: bool(raw.group_locked),
				missingDependencies: parseMissingDependencies(raw.missing_dependencies),
				attributes: raw
			};
		}
		return out;
	}
	function playerModel(win, name) {
		return attrs(call(win.MM, "getModelByNameAndPlayerId", name));
	}
	function godFavor(win) {
		const a = playerModel(win, "PlayerGods");
		if (!a) return null;
		const out = {};
		for (const [k, v] of Object.entries(a)) {
			const n = num(v);
			if (k.endsWith("_favor") && k !== "max_favor" && n !== null) out[k.slice(0, -6)] = n;
		}
		return out;
	}
	function godFavorMax(win) {
		const n = num(playerModel(win, "PlayerGods")?.max_favor);
		return n !== null && n > 0 ? n : null;
	}
	function playerKillpoints(win) {
		const a = playerModel(win, "PlayerKillpoints");
		if (!a) return null;
		const att = num(a.att);
		const def = num(a.def);
		const used = num(a.used);
		if (att === null || def === null || used === null) return null;
		return {
			att,
			def,
			used
		};
	}
	function activeCelebrations(win) {
		const all = call(win.MM, "getModels");
		if (!isRecord(all)) return null;
		const raw = all.Celebration;
		const list = isRecord(raw) ? Object.values(raw) : Array.isArray(raw) ? raw : [];
		const out = [];
		for (const m of list) {
			const a = attrs(m);
			const townId = num(a?.town_id);
			if (!a || townId === null || typeof a.celebration_type !== "string") continue;
			out.push({
				type: a.celebration_type,
				townId
			});
		}
		return out;
	}
	function unitCounts(value) {
		if (!isRecord(value)) return null;
		const out = {};
		for (const [unit, raw] of Object.entries(value)) {
			if (!isUnitId(unit) || typeof raw !== "number" || !Number.isInteger(raw) || raw < 0) return null;
			out[unit] = raw;
		}
		return Object.values(out).some((n) => n > 0) ? out : null;
	}
	function attackSpot(win) {
		const model = call(win.MM, "getModelByNameAndPlayerId", "PlayerAttackSpot");
		if (!isRecord(model)) return null;
		const hasReward = call(model, "hasReward");
		return {
			level: num(call(model, "getLevel")),
			cooldownDuration: num(call(model, "getCooldownDuration")),
			hasReward: typeof hasReward === "boolean" ? hasReward : null,
			reward: call(model, "getReward"),
			units: unitCounts(attrs(model)?.units)
		};
	}
	function attackSpotWindowDefenders(win) {
		const doc = win.document;
		if (!isRecord(doc) || typeof doc.querySelectorAll !== "function") return null;
		const boxes = Array.from(doc.querySelectorAll(".attack_spots .defending_units .enemy_units_box"));
		const first = boxes[0];
		if (first === void 0) return null;
		const units = {};
		for (const box of boxes) {
			const unit = box.getAttribute("data-type");
			const amount = box.querySelector(".value")?.textContent.trim() ?? "";
			if (!isUnitId(unit) || !/^\d+$/.test(amount)) return null;
			units[unit] = (units[unit] ?? 0) + Number(amount);
		}
		if (!Object.values(units).some((n) => n > 0)) return null;
		return {
			units,
			node: first
		};
	}
	function farmRelations(win) {
		const out = [];
		for (const m of models(call(win.MM, "getOnlyCollectionByName", "FarmTownPlayerRelation"))) {
			const a = attrs(m);
			const id = num(a?.id);
			if (!a || id === null) continue;
			const lootable = call(m, "isLootable");
			out.push({
				id,
				farmTownId: num(a.farm_town_id),
				relationStatus: num(a.relation_status),
				lootableAt: num(a.lootable_at),
				expansionStage: num(a.expansion_stage),
				expansionAt: num(a.expansion_at),
				isLootable: typeof lootable === "boolean" ? lootable : null,
				tradeRatio: num(a.current_trade_ratio) ?? num(a.trade_ratio),
				upgradeCost: num(a.upgrade_cost)
			});
		}
		return out;
	}
	function townOutgoingMovements(win, townId) {
		const collection = call(win.MM, "getFirstTownAgnosticCollectionByName", "MovementsUnits");
		if (!isRecord(collection)) return null;
		const lists = [];
		const fragment = call(collection, "getFragment", townId);
		if (isRecord(fragment) && Array.isArray(fragment.models)) lists.push(fragment.models);
		if (Array.isArray(collection.models)) lists.push(collection.models);
		if (lists.length === 0) return null;
		const seen = new Set();
		let n = 0;
		for (const m of lists.flat()) {
			if (seen.has(m)) continue;
			seen.add(m);
			const home = num(attrs(m)?.home_town_id);
			if (home === null) return null;
			if (home === townId) n += 1;
		}
		return n;
	}
	function movementsBetween(win, fromTownId, targetTownId) {
		const collection = call(win.MM, "getFirstTownAgnosticCollectionByName", "MovementsUnits");
		if (!isRecord(collection)) return null;
		const lists = [];
		const fragment = call(collection, "getFragment", fromTownId);
		if (isRecord(fragment) && Array.isArray(fragment.models)) lists.push(fragment.models);
		if (Array.isArray(collection.models)) lists.push(collection.models);
		if (lists.length === 0) return null;
		const seen = new Set();
		let n = 0;
		for (const m of lists.flat()) {
			if (seen.has(m)) continue;
			seen.add(m);
			const a = attrs(m);
			if (!a) return null;
			const home = num(call(m, "getHomeTownId")) ?? num(a.home_town_id);
			if (home === null) return null;
			if (home !== fromTownId) continue;
			const target = num(call(m, "getTargetTownId")) ?? num(a.target_town_id);
			if (target === null) return null;
			if (target === targetTownId) n += 1;
		}
		return n;
	}
	var FRIENDLY_MOVEMENTS = new Set([
		"support",
		"support_sea",
		"portal_support_olympus",
		"trade",
		"return",
		"spy",
		"farm",
		"reward",
		"abort"
	]);
	var HOSTILE_MOVEMENT = /^(attack|portal_attack|portal_revolt)(_|$)|^(raid|siege|revolt|colonize|take_over|conquer)$/;
	var TAKEOVER_MOVEMENT = /^(revolt|colonize|take_over|conquer|attack_takeover)$/;
	function incomingAttacks(win, ownIds) {
		const collection = call(win.MM, "getFirstTownAgnosticCollectionByName", "MovementsUnits");
		if (!isRecord(collection)) return null;
		const own = new Set(ownIds);
		const lists = [];
		if (Array.isArray(collection.models)) lists.push(collection.models);
		for (const id of ownIds) {
			const fragment = call(collection, "getFragment", id);
			if (isRecord(fragment) && Array.isArray(fragment.models)) lists.push(fragment.models);
			const incoming = call(collection, "getIncomingAttacks", id);
			if (Array.isArray(incoming)) lists.push(incoming);
		}
		if (lists.length === 0) return null;
		const seenModels = new Set();
		const seenCommands = new Set();
		const out = [];
		for (const m of lists.flat()) {
			if (seenModels.has(m)) continue;
			seenModels.add(m);
			const a = attrs(m);
			if (!a) continue;
			const target = num(call(m, "getTargetTownId")) ?? num(a.target_town_id);
			if (target === null || !own.has(target)) continue;
			if (call(m, "isReturning") === true) continue;
			const type = typeof a.type === "string" ? a.type.toLowerCase() : null;
			const origin = num(call(m, "getHomeTownId")) ?? num(a.home_town_id);
			const flag = call(m, "isIncomingAttack");
			let hostile;
			if (type !== null && FRIENDLY_MOVEMENTS.has(type)) hostile = false;
			else if (typeof flag === "boolean") hostile = flag;
			else if (a.is_attack === true || a.is_attack === 1) hostile = true;
			else if (type !== null && HOSTILE_MOVEMENT.test(type)) hostile = true;
			else hostile = origin !== null && !own.has(origin);
			if (!hostile) continue;
			let arrival = num(call(m, "getArrivalAt")) ?? num(a.arrival_at);
			if (arrival === null) continue;
			if (arrival > 0xe8d4a51000) arrival = Math.floor(arrival / 1e3);
			let started = num(call(m, "getStartedAt")) ?? num(a.started_at);
			if (started !== null && started > 0xe8d4a51000) started = Math.floor(started / 1e3);
			const commandId = num(call(m, "getCommandId")) ?? num(a.command_id);
			if (commandId !== null) {
				if (seenCommands.has(commandId)) continue;
				seenCommands.add(commandId);
			}
			const units = isRecord(a.units) ? a.units : null;
			out.push({
				commandId,
				targetTownId: target,
				originTownId: origin,
				arrivalAt: arrival,
				startedAt: started,
				type,
				colonyShip: (num(units?.colonize_ship) ?? 0) > 0 || type !== null && TAKEOVER_MOVEMENT.test(type)
			});
		}
		return out.sort((x, y) => x.arrivalAt - y.arrivalAt);
	}
	function attackSpotMovements(win) {
		const collection = call(win.MM, "getFirstTownAgnosticCollectionByName", "MovementsUnits");
		let list = null;
		if (isRecord(collection) && Array.isArray(collection.models)) list = collection.models;
		else {
			const all = call(win.MM, "getModels");
			if (isRecord(all) && isRecord(all.MovementsUnits)) list = Object.values(all.MovementsUnits);
			else if (isRecord(all) && all.MovementsUnits === void 0) list = [];
		}
		if (list === null) return null;
		const yes = (v) => v === true || v === 1 || v === "1" || v === "true";
		let n = 0;
		for (const m of list) {
			const a = attrs(m);
			if (a && (yes(a.destination_is_attack_spot) || yes(a.origin_is_attack_spot))) n += 1;
		}
		return n;
	}
	function islandQuests(win) {
		const out = [];
		const collection = call(win.MM, "getOnlyCollectionByName", "IslandQuest") ?? call(win.MM, "getFirstTownAgnosticCollectionByName", "IslandQuest");
		for (const m of models(collection)) {
			const a = attrs(m);
			if (!a) continue;
			const claimable = call(m, "isClaimable");
			const cfg = isRecord(a.configuration) ? a.configuration : {};
			const x = num(cfg.island_x) ?? num(a.island_x);
			const y = num(cfg.island_y) ?? num(a.island_y);
			out.push({
				id: num(a.id),
				progressableId: num(a.progressable_id) ?? num(a.id),
				progress: call(m, "getProgress"),
				isClaimable: typeof claimable === "boolean" ? claimable : null,
				island: x === null || y === null ? null : {
					x,
					y
				},
				attributes: a
			});
		}
		return out;
	}
	function beginnerQuests(win) {
		const all = call(win.MM, "getCollections");
		if (!isRecord(all)) return null;
		const list = all.Progressable;
		if (list === void 0) return [];
		const first = Array.isArray(list) ? list[0] : list;
		const out = [];
		for (const m of models(first)) {
			const a = attrs(m);
			const id = num(a?.id);
			if (!a || id === null) continue;
			const pid = a.progressable_id;
			out.push({
				id,
				progressableId: typeof pid === "string" && pid !== "" ? pid : num(pid),
				state: typeof a.state === "string" ? a.state : null
			});
		}
		return out;
	}
	function castedPower(model) {
		const a = attrs(model);
		if (!a) return null;
		return {
			powerId: typeof a.power_id === "string" && a.power_id !== "" ? a.power_id : null,
			townId: num(a.town_id),
			endAt: num(a.end_at),
			attributes: a
		};
	}
	function townActivePowers(win, townId, nowSec) {
		const collection = call(win.MM, "getFirstTownAgnosticCollectionByName", "CastedPowers");
		if (!isRecord(collection)) return null;
		const lists = [];
		if (isRecord(collection.fragments)) {
			const fragment = collection.fragments[String(townId)];
			if (fragment !== void 0) {
				if (!isRecord(fragment) || !Array.isArray(fragment.models)) return null;
				lists.push({
					models: fragment.models,
					town: townId
				});
			} else lists.push({
				models: [],
				town: townId
			});
		}
		if (Array.isArray(collection.models)) lists.push({
			models: collection.models,
			town: null
		});
		if (lists.length === 0) return null;
		const seen = new Set();
		const out = [];
		for (const list of lists) for (const m of list.models) {
			if (seen.has(m)) continue;
			seen.add(m);
			const power = castedPower(m);
			if (!power || power.powerId === null) return null;
			const town = power.townId ?? list.town;
			if (town === null) return null;
			if (town !== townId) continue;
			if (nowSec !== void 0 && power.endAt !== null && power.endAt <= nowSec) continue;
			if (!out.includes(power.powerId)) out.push(power.powerId);
		}
		return out;
	}
	function powerStatic(win, powerId) {
		const all = isRecord(win.GameData) ? win.GameData.powers : void 0;
		const p = isRecord(all) ? all[powerId] : void 0;
		if (!isRecord(p)) return null;
		const favor = num(p.favor);
		if (favor === null || favor < 0) return null;
		return {
			favor,
			godId: typeof p.god_id === "string" && p.god_id !== "" ? p.god_id.toLowerCase() : null
		};
	}
	function powerList(win) {
		const all = isRecord(win.GameData) ? win.GameData.powers : void 0;
		if (!isRecord(all)) return [];
		return Object.keys(all).filter((id) => /^[a-z_]+$/.test(id)).sort().map((id) => {
			const p = all[id];
			return {
				id,
				name: isRecord(p) && typeof p.name === "string" && p.name !== "" ? p.name : null
			};
		});
	}
	function ownTownIds(win) {
		const towns = isRecord(win.ITowns) ? win.ITowns.towns : void 0;
		if (!isRecord(towns)) return [];
		return Object.keys(towns).map(Number).filter((id) => Number.isInteger(id) && id > 0);
	}
	function townResources(win, townId) {
		const a = attrs(call(town(win, townId), "resources"));
		if (!a) return null;
		const wood = num(a.wood);
		const stone = num(a.stone);
		const iron = num(a.iron);
		const storage = num(a.storage);
		if (wood === null || stone === null || iron === null || storage === null) return null;
		return {
			wood,
			stone,
			iron,
			storage
		};
	}
	function townIsland(win, townId) {
		const t = town(win, townId);
		const x = num(call(t, "getIslandCoordinateX"));
		const y = num(call(t, "getIslandCoordinateY"));
		return x === null || y === null ? null : {
			x,
			y
		};
	}
	function townTradeCapacity(win, townId) {
		const t = town(win, townId);
		const fromMethod = num(call(t, "getAvailableTradeCapacity"));
		if (fromMethod !== null) return Math.max(0, fromMethod);
		const fromAttrs = num(attrs(t)?.available_trade_capacity);
		return fromAttrs === null ? null : Math.max(0, fromAttrs);
	}
	function townHideStorage(win, townId) {
		const t = town(win, townId);
		const fromMethod = num(call(t, "getEspionageStorage"));
		if (fromMethod !== null) return Math.max(0, fromMethod);
		const fromAttrs = num(attrs(t)?.espionage_storage);
		return fromAttrs === null ? null : Math.max(0, fromAttrs);
	}
	function townName(win, townId) {
		const t = town(win, townId);
		const fromMethod = call(t, "getName");
		if (typeof fromMethod === "string" && fromMethod !== "") return fromMethod;
		const a = attrs(t);
		return typeof a?.name === "string" && a.name !== "" ? a.name : String(townId);
	}
	function playerHeroes(win) {
		const list = models(call(win.MM, "getOnlyCollectionByName", "PlayerHeroes"));
		if (list.length === 0) return null;
		const out = [];
		for (const m of list) {
			const hero = heroFromRecord(attrs(m));
			if (!hero) return null;
			out.push(hero);
		}
		return out;
	}
	function heroesPerTown(win) {
		const n = num(call(win.GameDataHeroes, "getMaxHeroesPerTown"));
		return n !== null && Number.isInteger(n) && n > 0 ? n : 1;
	}
	function heroName(win, type) {
		const all = isRecord(win.GameData) ? win.GameData.heroes : void 0;
		const hero = isRecord(all) ? all[type] : void 0;
		return isRecord(hero) && typeof hero.name === "string" && hero.name !== "" ? hero.name : type;
	}
	function farmTowns(win) {
		const out = [];
		for (const m of models(call(win.MM, "getOnlyCollectionByName", "FarmTown"))) {
			const a = attrs(m);
			const id = num(a?.id);
			if (!a || id === null) continue;
			out.push({
				id,
				islandX: num(a.island_x),
				islandY: num(a.island_y),
				name: typeof a.name === "string" ? a.name : null,
				resourceOffer: typeof a.resource_offer === "string" ? a.resource_offer : null,
				resourceDemand: typeof a.resource_demand === "string" ? a.resource_demand : null
			});
		}
		return out;
	}
	function researchStatic(win, researchId) {
		const all = isRecord(win.GameData) ? win.GameData.researches : void 0;
		const r = isRecord(all) ? all[researchId] : void 0;
		if (!isRecord(r)) return null;
		const points = num(r.research_points);
		const res = isRecord(r.resources) ? r.resources : null;
		const wood = num(res?.wood);
		const stone = num(res?.stone);
		const iron = num(res?.iron);
		if (points === null || wood === null || stone === null || iron === null) return null;
		const deps = r.research_dependencies;
		const researchDependencies = Array.isArray(deps) ? deps.filter((d) => typeof d === "string") : isRecord(deps) ? Object.keys(deps) : [];
		return {
			buildingDependencies: isRecord(r.building_dependencies) ? numbersOf(r.building_dependencies) : {},
			researchDependencies,
			points,
			resources: {
				wood,
				stone,
				iron
			}
		};
	}
	function researchPointsPerLevel(win) {
		const academy = num(call(win.GameDataResearches, "getResearchPointsPerAcademyLevel"));
		const library = num(call(win.GameDataResearches, "getResearchPointsPerLibraryLevel"));
		if (academy === null || library === null) return null;
		return {
			academy,
			library
		};
	}
	function unitStatic(win, unitId) {
		const all = isRecord(win.GameData) ? win.GameData.units : void 0;
		const u = isRecord(all) ? all[unitId] : void 0;
		if (!isRecord(u)) return null;
		const res = isRecord(u.resources) ? u.resources : null;
		const wood = num(res?.wood);
		const stone = num(res?.stone);
		const iron = num(res?.iron);
		const population = num(u.population);
		const godId = typeof u.god_id === "string" && u.god_id !== "" ? u.god_id.toLowerCase() : null;
		const favor = num(u.favor) ?? (godId === null ? 0 : null);
		if (wood === null || stone === null || iron === null || population === null || favor === null) return null;
		const deps = u.research_dependencies;
		const researchDependencies = Array.isArray(deps) ? deps.filter((d) => typeof d === "string") : isRecord(deps) ? Object.keys(deps) : [];
		const buildingDependencies = isRecord(u.building_dependencies) ? numbersOf(u.building_dependencies) : {};
		return {
			resources: {
				wood,
				stone,
				iron
			},
			favor,
			population,
			godId,
			buildingDependencies,
			researchDependencies
		};
	}
	function unitCostFactor(win, townId, unitId) {
		const all = isRecord(win.GameData) ? win.GameData.units : void 0;
		const u = isRecord(all) ? all[unitId] : void 0;
		if (!isRecord(u)) return null;
		const n = num(call(win.GeneralModifications, "getUnitBuildResourcesModification", townId, u));
		return n !== null && n > 0 ? n : null;
	}
	var BUILDING_NAMES_ES = {
		main: "Senado",
		farm: "Granja",
		storage: "Almacén",
		lumber: "Aserradero",
		stoner: "Cantera",
		ironer: "Mina de plata",
		barracks: "Cuartel",
		docks: "Puerto",
		academy: "Academia",
		temple: "Templo",
		market: "Mercado",
		wall: "Muralla",
		hide: "Cueva",
		theater: "Teatro",
		thermal: "Termas",
		library: "Biblioteca",
		lighthouse: "Faro",
		tower: "Torre",
		statue: "Estatua divina",
		oracle: "Oráculo",
		trade_office: "Oficina comercial"
	};
	function buildingName(id) {
		return BUILDING_NAMES_ES[id] ?? id;
	}
	function resolveStageKey(key, specials) {
		if (key === "special1") return specials.slot1;
		if (key === "special2") return specials.slot2;
		return key;
	}
	function sortedTargets(stage) {
		return Object.entries(stage.targets).map(([key, t], i) => ({
			key,
			level: t.level,
			priority: t.priority,
			i
		})).sort((a, b) => a.priority - b.priority || a.i - b.i).map(({ key, level, priority }) => ({
			key,
			level,
			priority
		}));
	}
	function maxLevelOf(input, building) {
		return input.maxLevel?.(building) ?? BUILDING_MAX_LEVELS[building];
	}
	function effectiveLevel(input, building) {
		return (input.levels[building] ?? 0) + (input.queued[building] ?? 0);
	}
	function permanentBlockReason(building, stageLevels, input) {
		const info = input.info?.[building];
		if (!info) return null;
		if (info.groupLocked === true) return { kind: "group" };
		for (const dep of info.missingDependencies) {
			const have = effectiveLevel(input, dep.building);
			const planned = stageLevels[dep.building] ?? 0;
			if (dep.level > 0) {
				if (have < dep.level && planned < dep.level) return {
					kind: "dependency",
					building: dep.building,
					level: dep.level
				};
			} else if (planned <= have) return {
				kind: "dependency",
				building: dep.building,
				level: 0
			};
		}
		if (info.enoughStorage === false && (stageLevels.storage ?? 0) <= effectiveLevel(input, "storage")) return { kind: "storage" };
		if (input.availablePopulation !== null && info.populationFor !== null && input.availablePopulation < info.populationFor && effectiveLevel(input, "farm") >= maxLevelOf(input, "farm")) return { kind: "population" };
		return null;
	}
	function blockReasonText(reason) {
		switch (reason.kind) {
			case "group": return "ya hay otro especial de su grupo";
			case "dependency": return `falta ${buildingName(reason.building)}${reason.level > 0 ? ` ${reason.level}` : ""}`;
			case "storage": return "no cabe en el almacén y el tramo no sube el Almacén";
			case "population": return "sin población y la Granja está al máximo";
		}
	}
	function permanentBlock(building, stageLevels, input) {
		const reason = permanentBlockReason(building, stageLevels, input);
		return reason ? blockReasonText(reason) : null;
	}
	function evaluateStages(profile, input) {
		let current = null;
		return {
			stages: profile.buildStages.map((stage, index) => {
				const stageLevels = {};
				const targets = sortedTargets(stage).map((t) => {
					const building = resolveStageKey(t.key, profile.specialBuildings);
					const level = building ? Math.min(t.level, maxLevelOf(input, building)) : 0;
					if (building) stageLevels[building] = Math.max(stageLevels[building] ?? 0, level);
					return {
						...t,
						building,
						level
					};
				}).map((t) => {
					const base = {
						key: t.key,
						building: t.building,
						requested: t.level,
						priority: t.priority
					};
					if (!t.building) return {
						...base,
						requested: stage.targets[t.key]?.level ?? 0,
						level: 0,
						current: 0,
						effective: 0,
						state: "skipped"
					};
					const current = input.levels[t.building] ?? 0;
					const effective = effectiveLevel(input, t.building);
					const status = {
						...base,
						requested: stage.targets[t.key]?.level ?? t.level,
						level: t.level,
						current,
						effective,
						state: "pending"
					};
					if ((input.info?.[t.building])?.hasMaxLevel === true) status.level = Math.min(status.level, effective);
					if (current >= status.level) status.state = "reached";
					else if (effective >= status.level) status.state = "queued";
					else {
						const block = permanentBlockReason(t.building, stageLevels, input);
						if (block) {
							status.state = "blocked";
							status.reason = blockReasonText(block);
							status.block = block;
						}
					}
					return status;
				});
				const complete = targets.every((t) => t.state !== "pending");
				if (!complete && current === null) current = index;
				return {
					targets,
					complete
				};
			}),
			current
		};
	}
	function evaluateTownQueue(queue, input) {
		const queueLevels = {};
		for (const item of queue) {
			const level = Math.min(item.level, maxLevelOf(input, item.building));
			queueLevels[item.building] = Math.max(queueLevels[item.building] ?? 0, level);
		}
		return queue.map((item) => {
			const current = input.levels[item.building] ?? 0;
			const effective = effectiveLevel(input, item.building);
			let level = Math.min(item.level, maxLevelOf(input, item.building));
			if (input.info?.[item.building]?.hasMaxLevel === true) level = Math.min(level, effective);
			const status = {
				building: item.building,
				requested: item.level,
				level,
				current,
				effective,
				state: "pending"
			};
			if (current >= level) status.state = "reached";
			else if (effective >= level) status.state = "queued";
			else {
				const block = permanentBlockReason(item.building, queueLevels, input);
				if (block) {
					status.state = "blocked";
					status.reason = blockReasonText(block);
					status.block = block;
				}
			}
			return status;
		});
	}
	var RESEARCH_QUEUE = {
		base: 2,
		curator: 7
	};
	var RESEARCH_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	var RESEARCH_RETRY_MS = 3e5;
	function activeRules$1(profile) {
		const avoid = new Set(profile.avoidResearches);
		const rules = profile.researches.filter((id) => !avoid.has(id)).map((id, i) => ({
			id,
			priority: i + 1
		}));
		const first = (id) => profile.buildFocus.colonyShipFirst && id === "colonize_ship" ? 0 : 1;
		return rules.sort((a, b) => first(a.id) - first(b.id) || a.priority - b.priority);
	}
	function freePoints(input) {
		if (!input.pointsPerLevel || !input.buildings) return null;
		const academy = input.buildings.academy ?? 0;
		const library = input.buildings.library ?? 0;
		let used = 0;
		for (const id of new Set([...input.done, ...input.queued])) {
			const info = input.statics(id);
			if (!info) return null;
			used += info.points;
		}
		return academy * input.pointsPerLevel.academy + library * input.pointsPerLevel.library - used;
	}
	function planTownResearch(input) {
		const free = freePoints(input);
		const queued = new Set(input.queued);
		const queueFull = input.queued.length >= input.queueLimit;
		let next = null;
		const items = [];
		for (const { id, priority } of activeRules$1(input.profile)) {
			const item = {
				id,
				priority,
				state: "unknown"
			};
			items.push(item);
			if (input.done.has(id)) {
				item.state = "done";
				continue;
			}
			if (queued.has(id)) {
				item.state = "queued";
				continue;
			}
			const info = input.statics(id);
			if (!info || !input.buildings || !input.resources) continue;
			const deps = { ...info.buildingDependencies };
			if (input.profile.buildFocus.academy28BeforeConquest && id === "take_over") deps.academy = Math.max(deps.academy ?? 0, 28);
			const missingBuilding = Object.entries(deps).find(([b, level]) => (input.buildings?.[b] ?? 0) < level);
			if (missingBuilding) {
				item.state = "academy";
				item.detail = `${missingBuilding[0]} ${missingBuilding[1]}`;
				continue;
			}
			const missingResearch = info.researchDependencies.find((d) => !input.done.has(d));
			if (missingResearch) {
				item.state = "dependency";
				item.detail = missingResearch;
				continue;
			}
			if (free === null) continue;
			if (free < info.points) {
				item.state = "points";
				item.detail = `${info.points} (${free} libres)`;
				continue;
			}
			const short = [
				"wood",
				"stone",
				"iron"
			].map((r) => ({
				r,
				n: info.resources[r] - (input.resources?.[r] ?? 0)
			})).filter((x) => x.n > 0);
			if (short.length > 0) {
				item.state = "resources";
				item.detail = short.map((x) => `${x.n} ${x.r}`).join(", ");
				continue;
			}
			item.state = "ready";
			if (next === null) next = id;
		}
		return {
			items,
			next: queueFull ? null : next,
			queueFull,
			freePoints: free
		};
	}
	var STATE_TEXT = {
		done: "hecha",
		queued: "en cola",
		ready: "lista",
		academy: "falta edificio",
		dependency: "falta otra investigación",
		points: "faltan puntos",
		resources: "faltan recursos",
		unknown: "sin datos"
	};
	function explain$2(plan) {
		if (plan.queueFull) return "cola de investigación llena";
		const pending = plan.items.filter((i) => i.state !== "done" && i.state !== "queued");
		if (plan.items.length === 0) return "el perfil no tiene investigaciones";
		if (pending.length === 0) return "todas las investigaciones del perfil hechas o en cola";
		const first = pending[0];
		if (!first) return "nada que investigar";
		const what = `${first.id}: ${STATE_TEXT[first.state]}`;
		return first.detail ? `${what} (${first.detail})` : what;
	}
	function researchInput(win, townId, profile) {
		const done = researchesDone(win, townId);
		const queued = researchOrders(win, townId).map((o) => o.attributes.research_type).filter((t) => typeof t === "string");
		return {
			profile,
			done: new Set(done ?? []),
			queued,
			queueLimit: isAdvisorActive(win, "curator") ? RESEARCH_QUEUE.curator : RESEARCH_QUEUE.base,
			buildings: buildingLevels(win, townId),
			resources: townResources(win, townId),
			pointsPerLevel: researchPointsPerLevel(win),
			statics: (id) => researchStatic(win, id)
		};
	}
	function createAutoResearchModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const results = new Map();
		const retryAfter = new Map();
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(townId, name, level, text, items) {
			const previous = results.get(townId);
			results.set(townId, {
				townId,
				name,
				at: now().getTime(),
				level,
				text,
				items
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		async function run(settings) {
			if (deps.isSafetyStopped?.() === true) return 0;
			const own = new Set(ownTownIds(win));
			const dryRun = deps.isDryRun();
			let actions = 0;
			let first = true;
			for (const [key, profileId] of Object.entries(settings.townProfiles)) {
				const townId = Number(key);
				const profile = resolveProfile(settings, profileId);
				if (!own.has(townId) || !profile?.autoResearch) continue;
				const name = townName(win, townId);
				const blockedUntil = retryAfter.get(townId);
				if (blockedUntil !== void 0 && now().getTime() < blockedUntil) continue;
				const plan = planTownResearch(researchInput(win, townId, profile));
				if (plan.next === null) {
					record(townId, name, "info", `investigación: ${explain$2(plan)}`, plan.items);
					continue;
				}
				if (dryRun) {
					record(townId, name, "info", `simulación: investigaría ${plan.next}`, plan.items);
					continue;
				}
				if (!first) await sleep(Math.round(RESEARCH_PAUSE_MS.min + random() * (RESEARCH_PAUSE_MS.max - RESEARCH_PAUSE_MS.min)));
				first = false;
				try {
					await api.research(townId, plan.next);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					retryAfter.set(townId, now().getTime() + RESEARCH_RETRY_MS);
					record(townId, name, "error", `error al investigar ${plan.next}: ${err instanceof Error ? err.message : String(err)}`, plan.items);
					continue;
				}
				actions += 1;
				const items = plan.items.map((i) => i.id === plan.next ? {
					...i,
					state: "queued",
					detail: void 0
				} : i);
				record(townId, name, "success", `investigación encargada: ${plan.next}`, items);
			}
			notify();
			return actions;
		}
		return {
			task: {
				name: "investigación",
				phase: "research",
				category: "economy",
				master: "autoResearch",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var UNIT_QUEUE = {
		base: 2,
		curator: 7
	};
	var RECRUIT_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	var RECRUIT_RETRY_MS = 3e5;
	var SPELL_RECAST_MS = 18e5;
	function laneOf(unit) {
		return isNavalUnit(unit) ? "docks" : "barracks";
	}
	var LANE_BUILDING = {
		barracks: "barracks",
		docks: "docks"
	};
	function activeRules(troops) {
		const rules = [];
		for (const unit of UNIT_IDS) {
			const r = troops[unit];
			if (r?.enabled && r.target > 0) rules.push({
				unit,
				target: r.target,
				priority: r.priority,
				minBatch: r.minBatch
			});
		}
		return rules.sort((a, b) => a.priority - b.priority);
	}
	function troopCount(input, unit) {
		if (!input.units || !input.outer || !input.orders) return null;
		const queued = input.orders.filter((o) => o.unit === unit).reduce((sum, o) => sum + Math.max(0, o.left), 0);
		return (input.units[unit] ?? 0) + (input.outer[unit] ?? 0) + queued;
	}
	var RESOURCES = [
		"wood",
		"stone",
		"iron"
	];
	function fit(have, cost) {
		return cost > 0 ? Math.floor(Math.max(0, have) / cost) : Infinity;
	}
	function infoText(info) {
		switch (info.kind) {
			case "building": return `${info.building} ${info.level}`;
			case "storage": return `storage ${info.need} > ${info.storage}`;
			case "research": return info.research;
			case "god": return info.god ?? "sin dios";
			case "waiting": return info.unit;
			case "queue": return `${info.queued}/${info.limit}`;
			case "resources": return RESOURCES.filter((r) => (info.short[r] ?? 0) > 0).map((r) => `${info.short[r]} ${r}`).join(", ");
			case "population": return `${info.need} (${info.free} libres)`;
			case "favor": return `${info.need} ${info.god} (${info.have})`;
		}
	}
	function planTownRecruit(input) {
		const queued = {
			barracks: 0,
			docks: 0
		};
		for (const o of input.orders ?? []) queued[o.lane] += 1;
		const resources = input.resources ? { ...input.resources } : null;
		let population = input.population;
		const favor = input.favor ? { ...input.favor } : null;
		const holder = {
			barracks: null,
			docks: null
		};
		const items = [];
		const orders = [];
		for (const rule of activeRules(input.troops)) {
			const lane = laneOf(rule.unit);
			const have = troopCount(input, rule.unit);
			const item = {
				unit: rule.unit,
				priority: rule.priority,
				lane,
				target: rule.target,
				have,
				state: "unknown"
			};
			items.push(item);
			const block = (state, info) => {
				item.state = state;
				item.info = info;
				item.detail = infoText(info);
			};
			if (have === null) continue;
			if (have >= rule.target) {
				item.state = "done";
				continue;
			}
			if (input.away !== false) {
				if (input.away) item.state = "away";
				continue;
			}
			const first = holder[lane];
			if (first !== null) {
				block("waiting", {
					kind: "waiting",
					unit: first
				});
				continue;
			}
			if (queued[lane] >= input.queueLimit) {
				block("queueFull", {
					kind: "queue",
					queued: queued[lane],
					limit: input.queueLimit
				});
				continue;
			}
			const info = input.statics(rule.unit);
			if (!info || !input.buildings || !input.researches) continue;
			const deps = { ...info.buildingDependencies };
			const laneBuilding = LANE_BUILDING[lane];
			deps[laneBuilding] = Math.max(deps[laneBuilding] ?? 0, 1);
			const missingBuilding = Object.entries(deps).find(([b, level]) => (input.buildings?.[b] ?? 0) < level);
			if (missingBuilding) {
				block("building", {
					kind: "building",
					building: missingBuilding[0],
					level: missingBuilding[1]
				});
				continue;
			}
			const missingResearch = info.researchDependencies.find((r) => !input.researches?.has(r));
			if (missingResearch) {
				block("research", {
					kind: "research",
					research: missingResearch
				});
				continue;
			}
			const god = rule.unit === "godsent" ? input.townGod : info.godId;
			if ((rule.unit === "godsent" || info.godId !== null) && (god === null || god !== input.townGod)) {
				block("god", {
					kind: "god",
					god: rule.unit === "godsent" ? null : info.godId
				});
				continue;
			}
			if (!resources || population === null) continue;
			const favorCost = info.favor;
			const favorHave = god === null ? null : favor?.[god] ?? null;
			if (favorCost > 0 && (god === null || favorHave === null)) continue;
			const factor = input.costFactor(rule.unit) ?? 1;
			const cost = {
				wood: Math.round(info.resources.wood * factor),
				stone: Math.round(info.resources.stone * factor),
				iron: Math.round(info.resources.iron * factor)
			};
			const byStorage = Math.min(...RESOURCES.map((r) => fit(resources.storage, cost[r])));
			if (byStorage < 1) {
				block("building", {
					kind: "storage",
					need: Math.max(...RESOURCES.map((r) => cost[r])),
					storage: resources.storage
				});
				continue;
			}
			const byResources = Math.min(...RESOURCES.map((r) => fit(resources[r], cost[r])));
			const byPopulation = fit(population, info.population);
			const byFavor = favorCost > 0 ? fit(favorHave ?? 0, favorCost) : Infinity;
			const byFavorMax = favorCost > 0 ? fit(input.favorMax ?? 500, favorCost) : Infinity;
			const missing = rule.target - have;
			const amount = Math.min(missing, byResources, byPopulation, byFavor);
			const batch = Math.min(rule.minBatch, missing, byStorage, Math.max(1, byFavorMax));
			holder[lane] = rule.unit;
			if (amount < batch) {
				if (byPopulation < batch) block("population", {
					kind: "population",
					need: batch * info.population,
					free: Math.max(0, population)
				});
				else if (byFavor < batch && god !== null) block("favor", {
					kind: "favor",
					god,
					need: batch * favorCost,
					have: favorHave ?? 0
				});
				else {
					const short = {};
					for (const r of RESOURCES) {
						const n = batch * cost[r] - resources[r];
						if (n > 0) short[r] = n;
					}
					block("resources", {
						kind: "resources",
						short
					});
				}
				continue;
			}
			item.state = "ready";
			item.amount = amount;
			orders.push({
				unit: rule.unit,
				amount,
				lane
			});
			for (const r of RESOURCES) resources[r] -= amount * cost[r];
			population -= amount * info.population;
			if (favor && god !== null && favorCost > 0) favor[god] = (favor[god] ?? 0) - amount * favorCost;
		}
		return {
			items,
			orders,
			queued,
			queueLimit: input.queueLimit
		};
	}
	var SPELL_WORTH_STATES = new Set([
		"ready",
		"ordered",
		"waiting",
		"queueFull",
		"population",
		"resources",
		"favor"
	]);
	function planTownSpells(input) {
		const favor = input.favor ? { ...input.favor } : null;
		const status = {};
		const casts = [];
		for (const id of RECRUIT_POWER_IDS) {
			const { lane } = RECRUIT_POWERS[id];
			const read = input.power(id);
			const god = read?.godId ?? RECRUIT_POWERS[id].god;
			const cost = read?.favor ?? RECRUIT_POWERS[id].favor;
			const have = favor?.[god] ?? null;
			const rule = input.spells[id] ?? defaultSpellRule(id);
			const troops = input.items.filter((i) => i.lane === lane);
			const state = (() => {
				if (input.townGod !== void 0 && input.townGod !== god) return "noGod";
				if (input.active?.includes(id)) return "active";
				if (input.active === null || have === null || input.townGod === void 0 || input.queued === null || troops.some((i) => i.have === null || i.state === "unknown")) return "unknown";
				if (!troops.some((i) => SPELL_WORTH_STATES.has(i.state))) return "idle";
				if (have < Math.max(rule.fromFavor, cost)) return "favor";
				if (input.queueLimit - input.queued[lane] < rule.freeSlots) return "queue";
				return "ready";
			})();
			status[id] = {
				state,
				god,
				cost,
				favor: have
			};
			if (state === "ready" && rule.enabled && favor) {
				casts.push({
					power: id,
					lane,
					god,
					cost
				});
				favor[god] = (favor[god] ?? 0) - cost;
			}
		}
		return {
			status,
			casts
		};
	}
	function favorAfter(favor, casts) {
		if (!favor) return null;
		const out = { ...favor };
		for (const c of casts) out[c.god] = (out[c.god] ?? 0) - c.cost;
		return out;
	}
	var RECRUIT_STATE_TEXT = {
		done: "objetivo alcanzado",
		ready: "lista",
		ordered: "encargada",
		waiting: "espera a otra unidad",
		building: "falta edificio",
		research: "falta investigación",
		god: "falta el dios",
		queueFull: "cola llena",
		population: "falta población",
		resources: "faltan recursos",
		favor: "falta favor",
		away: "tropas de camino",
		unknown: "sin datos"
	};
	function explain$1(plan) {
		if (plan.items.length === 0) {
			const text = "el perfil no tiene tropas activadas";
			return {
				text,
				key: text
			};
		}
		const first = plan.items.find((i) => i.state !== "done");
		if (!first) {
			const text = "todas las tropas del perfil en su objetivo";
			return {
				text,
				key: text
			};
		}
		const what = `${first.unit}: ${RECRUIT_STATE_TEXT[first.state]}`;
		return {
			text: first.detail ? `${what} (${first.detail})` : what,
			key: `${first.unit}:${first.state}`
		};
	}
	function recruitInput(win, townId, profile) {
		const orders = unitQueue(win, townId)?.map((o) => ({
			unit: o.unitType,
			left: o.left,
			lane: isUnitId(o.unitType) ? laneOf(o.unitType) : o.kind === "naval" ? "docks" : "barracks"
		})) ?? null;
		const moving = townOutgoingMovements(win, townId);
		const done = researchesDone(win, townId);
		return {
			troops: profile.troops,
			units: townUnits(win, townId),
			outer: townUnitsOuter(win, townId),
			orders,
			queueLimit: unitQueueLength(win) ?? (isAdvisorActive(win, "curator") ? UNIT_QUEUE.curator : UNIT_QUEUE.base),
			away: moving === null ? null : moving > 0,
			buildings: buildingLevels(win, townId),
			researches: done ? new Set(done) : null,
			resources: townResources(win, townId),
			population: availablePopulation(win, townId),
			favor: godFavor(win),
			favorMax: godFavorMax(win),
			townGod: townGod(win, townId),
			statics: (unit) => unitStatic(win, unit),
			costFactor: (unit) => unitCostFactor(win, townId, unit)
		};
	}
	function spellInput(win, townId, profile, recruit, plan) {
		return {
			spells: profile.recruitSpells,
			active: townActivePowers(win, townId, readClientServerTime(win) ?? void 0),
			favor: recruit.favor,
			townGod: townGodState(win, townId),
			queued: recruit.orders === null ? null : plan.queued,
			queueLimit: plan.queueLimit,
			items: plan.items,
			power: (id) => powerStatic(win, id)
		};
	}
	function createAutoRecruitModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const results = new Map();
		const retryAfter = new Map();
		const laneKey = (townId, lane) => `${townId}:${lane}`;
		const spellKey = (townId, lane) => `${townId}:${lane}:hechizo`;
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		const logKeys = new Map();
		function record(townId, name, level, text, items, key = text) {
			results.set(townId, {
				townId,
				name,
				at: now().getTime(),
				level,
				text,
				items
			});
			const previous = logKeys.get(townId);
			logKeys.set(townId, key);
			if (previous === key && level !== "success") return;
			const options = {
				town: name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const describe = (orders) => orders.map((o) => `${o.amount} ${o.unit}`).join(", ");
		async function run(settings) {
			if (deps.isSafetyStopped?.() === true) return 0;
			const own = new Set(ownTownIds(win));
			const dryRun = deps.isDryRun();
			let actions = 0;
			let first = true;
			const pause = async () => {
				if (!first) await sleep(Math.round(RECRUIT_PAUSE_MS.min + random() * (RECRUIT_PAUSE_MS.max - RECRUIT_PAUSE_MS.min)));
				first = false;
			};
			for (const [key, profileId] of Object.entries(settings.townProfiles)) {
				const townId = Number(key);
				const profile = resolveProfile(settings, profileId);
				if (!own.has(townId) || !profile?.autoRecruit) continue;
				const name = townName(win, townId);
				const input = recruitInput(win, townId, profile);
				const draft = planTownRecruit(input);
				const t = now().getTime();
				const waits = (k) => (retryAfter.get(k) ?? 0) > t;
				const casts = planTownSpells(spellInput(win, townId, profile, input, draft)).casts.filter((c) => !waits(laneKey(townId, c.lane)) && !waits(spellKey(townId, c.lane)));
				const plan = casts.length > 0 ? planTownRecruit({
					...input,
					favor: favorAfter(input.favor, casts)
				}) : draft;
				if (casts.length === 0 && plan.orders.length === 0) {
					const why = explain$1(plan);
					record(townId, name, "info", `reclutamiento: ${why.text}`, plan.items, why.key);
					continue;
				}
				const orders = plan.orders.filter((o) => !waits(laneKey(townId, o.lane)));
				if (casts.length === 0 && orders.length === 0) continue;
				const powers = casts.map((c) => c.power).join(", ");
				if (dryRun) {
					const parts = [];
					if (casts.length > 0) parts.push(`lanzaría ${powers}`);
					if (orders.length > 0) parts.push(`reclutaría ${describe(orders)}`);
					const units = orders.map((o) => o.unit).join(",");
					record(townId, name, "info", `simulación: ${parts.join("; ")}`, plan.items, `simulación:${powers}:${units}`);
					continue;
				}
				const cast = [];
				const sent = [];
				const failures = [];
				for (const spell of casts) {
					await pause();
					retryAfter.set(spellKey(townId, spell.lane), now().getTime() + SPELL_RECAST_MS);
					try {
						await api.castPowerOnTown(townId, spell.power);
					} catch (err) {
						if (err instanceof SafetyStopError) throw err;
						failures.push(`error al lanzar ${spell.power}: ` + (err instanceof Error ? err.message : String(err)));
						retryAfter.set(spellKey(townId, spell.lane), now().getTime() + RECRUIT_RETRY_MS);
						continue;
					}
					cast.push(spell);
					actions += 1;
				}
				for (const order of orders) {
					await pause();
					try {
						await api.recruit(townId, order.unit, order.amount);
					} catch (err) {
						if (err instanceof SafetyStopError) throw err;
						failures.push(`error al reclutar ${order.amount} ${order.unit}: ` + (err instanceof Error ? err.message : String(err)));
						retryAfter.set(laneKey(townId, order.lane), now().getTime() + RECRUIT_RETRY_MS);
						continue;
					}
					sent.push(order);
					actions += 1;
				}
				const items = plan.items.map((i) => sent.some((o) => o.unit === i.unit) ? {
					...i,
					state: "ordered"
				} : i);
				const done = [];
				if (cast.length > 0) done.push(`hechizo lanzado: ${cast.map((c) => c.power).join(", ")}`);
				if (sent.length > 0) done.push(`reclutamiento encargado: ${describe(sent)}`);
				if (failures.length > 0) {
					record(townId, name, "error", [...done, ...failures].join("; "), items);
					continue;
				}
				record(townId, name, "success", done.join("; "), items);
			}
			notify();
			return actions;
		}
		return {
			task: {
				name: "reclutamiento",
				phase: "recruit",
				category: "economy",
				master: "autoRecruit",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	function readBuildState(win, townId) {
		const levels = buildingLevels(win, townId);
		if (!levels) return null;
		return {
			levels,
			queued: queuedBuildingLevels(win, townId),
			maxLevel: (b) => buildingMaxLevel(win, b),
			info: buildingBuildData(win, townId),
			availablePopulation: availablePopulation(win, townId)
		};
	}
	function townProfileStatus(win, townId, profile) {
		const build = readBuildState(win, townId);
		const stages = build ? evaluateStages(profile, build) : null;
		const pending = planTownResearch(researchInput(win, townId, profile)).items.find((i) => i.state !== "done" && i.state !== "queued");
		const troop = planTownRecruit(recruitInput(win, townId, profile)).items.find((i) => i.state !== "done");
		return {
			stages,
			nextResearch: pending?.id ?? null,
			nextResearchState: pending ? pending.state : null,
			nextRecruit: troop ?? null
		};
	}
	function townRecruitPlan(win, townId, profile) {
		return planTownRecruit(recruitInput(win, townId, profile));
	}
	function townTroopCounts(win, townId) {
		const input = recruitInput(win, townId, { troops: {} });
		if (!input.units || !input.outer || !input.orders) return null;
		const out = {};
		for (const unit of UNIT_IDS) out[unit] = troopCount(input, unit) ?? 0;
		return out;
	}
	function townRecruitSpells(win, townId, profile) {
		if (!ownTownIds(win).includes(townId)) return null;
		const input = recruitInput(win, townId, profile);
		return planTownSpells(spellInput(win, townId, profile, input, planTownRecruit(input))).status;
	}
	function townResearchStates(win, townId, profile) {
		const plan = planTownResearch({
			...researchInput(win, townId, profile),
			profile: {
				researches: [...RESEARCH_IDS],
				avoidResearches: [],
				buildFocus: profile.buildFocus
			}
		});
		const out = {};
		for (const item of plan.items) out[item.id] = item.state;
		return out;
	}
	var BUILD_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	var BUILD_RETRY_MS = 3e5;
	var QUEUE_ONLY_PROFILE = {
		...createEmptyProfile(""),
		buildStages: []
	};
	function effective(state, building) {
		return (state.levels[building] ?? 0) + (state.queued[building] ?? 0);
	}
	function waitReason(building, state) {
		const info = state.info?.[building];
		if (!info) return "sin datos de BuildingBuildData";
		if (info.canUpgrade === true) return null;
		if (info.enoughResources === false) return "esperando recursos";
		if (info.enoughStorage === false) return "no cabe en el almacén";
		if (state.availablePopulation !== null && info.populationFor !== null && state.availablePopulation < info.populationFor) return "falta población";
		const dep = info.missingDependencies[0];
		if (dep) return `falta ${buildingName(dep.building)}${dep.level > 0 ? ` ${dep.level}` : ""}`;
		return "el juego no deja ampliarlo";
	}
	function focusTargets(input) {
		const out = {};
		const { buildFocus, researches, avoidResearches } = input.profile;
		const listed = new Set(researches);
		const avoided = new Set(avoidResearches);
		const wants = (id) => listed.has(id) && !avoided.has(id) && !input.researchesDone.has(id);
		if (buildFocus.colonyShipFirst && wants("colonize_ship")) for (const [b, level] of Object.entries(input.researchBuildingDeps("colonize_ship") ?? {})) out[b] = Math.max(out[b] ?? 0, level);
		if (buildFocus.academy28BeforeConquest && wants("take_over")) out.academy = Math.max(out.academy ?? 0, 28);
		return out;
	}
	function planTownBuild(input) {
		const { state, profile } = input;
		const evaluation = evaluateStages(profile, state);
		const queue = evaluateTownQueue(input.townQueue ?? [], state);
		const queuePending = queue.filter((q) => q.state === "pending");
		const queueActive = queuePending.length > 0;
		const waiting = [];
		const queueFull = input.queueLength >= input.queueLimit;
		const plan = (next, floor = false) => ({
			evaluation,
			queue,
			queueActive,
			next: queueFull ? null : next,
			waiting,
			queueFull,
			floor
		});
		const pick = (candidates) => {
			for (const c of candidates) {
				const reason = waitReason(c.building, state);
				if (reason === null) return c;
				waiting.push({
					...c,
					reason
				});
			}
			return null;
		};
		const pf = profile.populationFloor;
		const farmNow = effective(state, "farm");
		if (pf.enabled && state.availablePopulation !== null && state.availablePopulation < pf.minFreePopulation && farmNow < maxLevelOf(state, "farm")) {
			if (Math.max(0, state.queued.farm ?? 0) < pf.farmLevels) return plan(pick([{
				building: "farm",
				toLevel: farmNow + 1,
				source: "floor"
			}]), true);
		}
		if (queueActive) return plan(pick(queuePending.map((q) => ({
			building: q.building,
			toLevel: q.effective + 1,
			source: "queue"
		}))));
		const candidates = [];
		const focus = focusTargets(input);
		for (const [b, level] of Object.entries(focus)) {
			const building = b;
			const target = Math.min(level, maxLevelOf(state, building));
			const now = effective(state, building);
			if (now >= target || permanentBlock(building, focus, state) !== null) continue;
			candidates.push({
				building,
				toLevel: now + 1,
				source: "focus"
			});
		}
		const stage = evaluation.current === null ? null : evaluation.stages[evaluation.current];
		for (const t of stage?.targets ?? []) {
			if (t.state !== "pending" || !t.building) continue;
			if (candidates.some((c) => c.building === t.building)) continue;
			candidates.push({
				building: t.building,
				toLevel: t.effective + 1,
				source: "stage"
			});
		}
		return plan(pick(candidates));
	}
	function managedBuildTowns(win, settings, needAutoBuild) {
		const own = new Set(ownTownIds(win));
		const out = [];
		const keys = new Set([...Object.keys(settings.townProfiles), ...Object.keys(settings.townQueues).filter((k) => settings.townQueues[k]?.length)]);
		for (const key of keys) {
			const townId = Number(key);
			if (!own.has(townId)) continue;
			const assigned = resolveProfile(settings, settings.townProfiles[key]);
			const profile = assigned ?? QUEUE_ONLY_PROFILE;
			if (needAutoBuild && !profile.autoBuild) continue;
			out.push({
				townId,
				profile,
				hasProfile: assigned !== null,
				queue: settings.townQueues[key] ?? []
			});
		}
		return out;
	}
	function buildQueueLimit(win, settings) {
		const gameQueue = buildingQueueLength(win) ?? 2;
		return Math.min(settings.buildQueueSlots, gameQueue, 7);
	}
	function readTownBuildPlan(win, town, queueLimit) {
		const state = readBuildState(win, town.townId);
		if (!state) return null;
		return {
			state,
			plan: planTownBuild({
				profile: town.profile,
				state,
				townQueue: town.queue,
				queueLength: buildingOrders(win, town.townId).length,
				queueLimit,
				researchesDone: new Set(researchesDone(win, town.townId) ?? []),
				researchBuildingDeps: (id) => researchStatic(win, id)?.buildingDependencies ?? null
			})
		};
	}
	function finishLabel(kind, order) {
		if (kind === "building") {
			const type = order.attributes.building_type;
			return typeof type === "string" ? buildingName(type) : `orden ${order.id}`;
		}
		const type = order.attributes.research_type;
		return `investigación ${typeof type === "string" && isResearchId(type) ? researchName("es", type) : typeof type === "string" ? type : order.id}`;
	}
	function freeFinishCandidate(orders, serverNow) {
		const limit = 285;
		for (const order of orders) {
			if (order.toBeCompletedAt === null) continue;
			const left = order.toBeCompletedAt - serverNow;
			if (left > 0 && left <= limit) return order;
		}
		return null;
	}
	var SOURCE_TEXT = {
		floor: "suelo de población",
		queue: "",
		focus: "build focus",
		stage: ""
	};
	var label = (c) => `${buildingName(c.building)} ${c.toLevel}`;
	function explain(plan, profile, hasProfile) {
		if (plan.queueFull) return "cola de construcción llena";
		const first = plan.waiting[0];
		if (first) {
			const extra = SOURCE_TEXT[first.source];
			return `${first.reason} para ${label(first)}${extra ? ` (${extra})` : ""}`;
		}
		if (plan.queueActive) return "lo que falta de la cola ya está en cola";
		if (!hasProfile) return "cola del Senado completa";
		if (profile.buildStages.length === 0) return "el perfil no tiene tramos de construcción";
		if (plan.evaluation.current === null) return "todos los tramos completos";
		return "lo que falta del tramo ya está en cola";
	}
	function createAutoBuildModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const results = new Map();
		const retryAfter = new Map();
		const loggedBlocks = new Set();
		const finishTried = new Set();
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(townId, name, level, text) {
			const previous = results.get(townId);
			results.set(townId, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const towns = (settings, needAutoBuild) => managedBuildTowns(win, settings, needAutoBuild);
		async function pause(first) {
			if (first) return;
			await sleep(Math.round(BUILD_PAUSE_MS.min + random() * (BUILD_PAUSE_MS.max - BUILD_PAUSE_MS.min)));
		}
		function logBlocks(townId, name, plan) {
			for (const q of plan.queue) {
				if (q.state !== "blocked") continue;
				const key = `${townId}:cola:${q.building}:${q.reason ?? ""}`;
				if (loggedBlocks.has(key)) continue;
				loggedBlocks.add(key);
				logger.warn(`cola: ${buildingName(q.building)} ${q.level} bloqueado, no frena la cola`, {
					town: name,
					reason: q.reason
				});
			}
			plan.evaluation.stages.forEach((stage, i) => {
				if (plan.evaluation.current !== null && i > plan.evaluation.current) return;
				for (const t of stage.targets) {
					if (t.state !== "blocked" || !t.building) continue;
					const key = `${townId}:${i}:${t.building}:${t.reason ?? ""}`;
					if (loggedBlocks.has(key)) continue;
					loggedBlocks.add(key);
					logger.warn(`tramo ${i + 1}: ${buildingName(t.building)} ${t.level} bloqueado, no frena el tramo`, {
						town: name,
						reason: t.reason
					});
				}
			});
		}
		async function run(settings) {
			if (deps.isSafetyStopped?.() === true) return 0;
			const dryRun = deps.isDryRun();
			const queueLimit = buildQueueLimit(win, settings);
			let actions = 0;
			let first = true;
			for (const town of towns(settings, true)) {
				const { townId, profile, hasProfile } = town;
				const name = townName(win, townId);
				const blockedUntil = retryAfter.get(townId);
				if (blockedUntil !== void 0 && now().getTime() < blockedUntil) continue;
				const read = readTownBuildPlan(win, town, queueLimit);
				if (!read) {
					record(townId, name, "info", "construcción: sin datos de los edificios de la ciudad");
					continue;
				}
				const { plan } = read;
				logBlocks(townId, name, plan);
				const stageText = plan.queueActive ? "cola: " : plan.evaluation.current === null ? "" : `tramo ${plan.evaluation.current + 1}: `;
				if (plan.next === null) {
					record(townId, name, "info", `construcción: ${stageText}${explain(plan, profile, hasProfile)}`);
					continue;
				}
				const what = label(plan.next);
				const why = SOURCE_TEXT[plan.next.source];
				const suffix = why ? ` (${why})` : "";
				if (dryRun) {
					record(townId, name, "info", `simulación: ${stageText}construiría ${what}${suffix}`);
					continue;
				}
				await pause(first);
				first = false;
				try {
					await api.buildUp(townId, plan.next.building);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					retryAfter.set(townId, now().getTime() + BUILD_RETRY_MS);
					record(townId, name, "error", `error al construir ${what}: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				actions += 1;
				record(townId, name, "success", `construcción encargada: ${stageText}${what}${suffix}`);
			}
			notify();
			return actions;
		}
		async function runFreeFinish(settings) {
			if (!settings.freeFinish || deps.isSafetyStopped?.() === true) return 0;
			const serverNow = api.serverNow();
			if (serverNow === null) return 0;
			const dryRun = deps.isDryRun();
			let actions = 0;
			let first = true;
			for (const { townId } of towns(settings, false)) for (const kind of ["building", "research"]) {
				const key = (o) => `${kind}:${o.id}`;
				const order = freeFinishCandidate((kind === "building" ? buildingOrders(win, townId) : researchOrders(win, townId)).filter((o) => !finishTried.has(key(o))), serverNow);
				if (!order || order.toBeCompletedAt === null) continue;
				finishTried.add(key(order));
				const name = townName(win, townId);
				const what = finishLabel(kind, order);
				if (dryRun) {
					logger.info(`simulación: terminaría gratis ${what}`, {
						town: name,
						muted: true
					});
					continue;
				}
				await pause(first);
				first = false;
				try {
					if (kind === "building") await api.finishBuildingNow(townId, order.id, order.toBeCompletedAt);
					else await api.finishResearchNow(townId, order.id, order.toBeCompletedAt);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					const message = err instanceof Error ? err.message : String(err);
					if (err instanceof GoldSpendRefusedError) logger.warn(`no se termina ${what}: costaría oro`, {
						town: name,
						reason: message
					});
					else logger.error(`error al terminar gratis ${what}: ${message}`, { town: name });
					continue;
				}
				actions += 1;
				logger.success(`terminado gratis: ${what}`, { town: name });
			}
			return actions;
		}
		return {
			task: {
				name: "construcción",
				phase: "build",
				category: "economy",
				master: "autoBuild",
				run
			},
			freeFinishTask: {
				name: "terminar gratis",
				phase: "freeFinish",
				category: "economy",
				run: runFreeFinish
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var RESOURCE_KINDS = [
		"wood",
		"stone",
		"iron"
	];
	var RESOURCE_NAMES = {
		wood: "madera",
		stone: "piedra",
		iron: "plata"
	};
	var zeroResources = () => ({
		wood: 0,
		stone: 0,
		iron: 0
	});
	var totalResources = (r) => r.wood + r.stone + r.iron;
	function isResourceKind(value) {
		return value === "wood" || value === "stone" || value === "iron";
	}
	function incomingByTown(movements) {
		const out = new Map();
		for (const m of movements) {
			if (m.toTownId === null) continue;
			const r = out.get(m.toTownId) ?? zeroResources();
			for (const k of RESOURCE_KINDS) r[k] += m[k];
			out.set(m.toTownId, r);
		}
		return out;
	}
	function resourcesText(r) {
		return RESOURCE_KINDS.filter((k) => r[k] > 0).map((k) => `${r[k]} ${RESOURCE_NAMES[k]}`).join(", ");
	}
	function createTradeTracker(deps) {
		const { api, win } = deps;
		const now = deps.now ?? (() => new Date());
		let overview = null;
		let sent = [];
		async function readMovements(own) {
			const at = now().getTime();
			if (overview && at - overview.at < 6e4) return { movements: overview.movements };
			const viewer = readCurrentTownId(win) ?? own[0];
			if (viewer === void 0) return { error: "sin ciudad desde la que mirar" };
			let movements;
			try {
				movements = parseTradeMovements(await api.getTradeOverview(viewer), own.map((id) => ({
					id,
					name: townName(win, id)
				})));
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				return { error: err instanceof Error ? err.message : String(err) };
			}
			if (movements === null) return { error: "la respuesta no trae movements legibles" };
			if (movements.some((m) => m.toTownId === null)) return { error: "no se reconoce el destino de un comercio en camino" };
			overview = {
				at,
				movements
			};
			sent = sent.filter((s) => s.until === void 0 ? s.at >= at : true);
			return { movements };
		}
		return {
			async incoming(own) {
				const read = await readMovements(own);
				if ("error" in read) return read;
				const at = now().getTime();
				sent = sent.filter((s) => s.until === void 0 || s.until > at);
				return { incoming: incomingByTown([...read.movements, ...sent.map((s) => ({
					toTownId: s.to,
					...s.resources
				}))]) };
			},
			noteSent(to, resources, untilMs) {
				sent.push({
					to,
					resources: { ...resources },
					at: now().getTime(),
					until: untilMs
				});
			},
			invalidate() {
				overview = null;
			}
		};
	}
	var TRADE_RETRY_MS = 3e5;
	var TRADE_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	function distance(a, b) {
		if (!a || !b) return Number.POSITIVE_INFINITY;
		return Math.hypot(a.x - b.x, a.y - b.y);
	}
	function freeSpace(t) {
		const out = zeroResources();
		for (const k of RESOURCE_KINDS) out[k] = Math.max(0, Math.floor(t.resources.storage - t.resources[k] - t.incoming[k]));
		return out;
	}
	function shipment(donor, want, space, minSend) {
		if (donor.capacity <= 0) return null;
		const keep = (k, v) => v > 0 && (v >= minSend || v >= want[k]);
		const desired = zeroResources();
		for (const k of RESOURCE_KINDS) {
			if (want[k] <= 0) continue;
			const v = Math.floor(Math.min(Math.max(want[k], minSend), donor.give[k], space[k]));
			if (keep(k, v)) desired[k] = v;
		}
		let kinds = RESOURCE_KINDS.filter((k) => desired[k] > 0);
		while (kinds.length > 0) {
			const sum = kinds.reduce((acc, k) => acc + desired[k], 0);
			const factor = Math.min(1, donor.capacity / sum);
			const out = zeroResources();
			for (const k of kinds) out[k] = Math.floor(desired[k] * factor);
			const short = kinds.filter((k) => !keep(k, out[k]));
			if (short.length === 0) return out;
			const smallest = short.reduce((a, b) => out[b] < out[a] ? b : a);
			kinds = kinds.filter((k) => k !== smallest);
		}
		return null;
	}
	function applyShipment(donor, sent) {
		for (const k of RESOURCE_KINDS) donor.give[k] -= sent[k];
		donor.capacity -= totalResources(sent);
	}
	function planTownTrades(towns, settings) {
		const donors = [];
		for (const town of towns) {
			if (!town.canDonate || town.wants !== null || !town.capacity || town.capacity <= 0) continue;
			const { storage } = town.resources;
			const give = zeroResources();
			for (const k of RESOURCE_KINDS) {
				const have = town.resources[k];
				if (storage <= 0 || have < settings.minDonorFillRatio * storage) continue;
				give[k] = Math.max(0, Math.floor(have - settings.reserveRatio * storage));
			}
			if (totalResources(give) > 0) donors.push({
				town,
				give,
				capacity: town.capacity
			});
		}
		const receivers = towns.filter((t) => t.wants !== null).map((town) => {
			const space = freeSpace(town);
			const want = zeroResources();
			for (const k of RESOURCE_KINDS) {
				const missing = (town.wants?.cost[k] ?? 0) - town.resources[k] - town.incoming[k];
				want[k] = Math.max(0, Math.min(Math.ceil(missing), space[k]));
			}
			return {
				town,
				want,
				space
			};
		}).filter((r) => totalResources(r.want) > 0).sort((a, b) => totalResources(a.want) - totalResources(b.want) || a.town.townId - b.town.townId);
		const out = [];
		for (const r of receivers) {
			const near = donors.filter((d) => d.town.townId !== r.town.townId).sort((a, b) => distance(a.town.island, r.town.island) - distance(b.town.island, r.town.island) || a.town.townId - b.town.townId);
			for (const donor of near) {
				if (out.length >= settings.maxTransfersPerCycle) return out;
				if (totalResources(r.want) <= 0) break;
				const sent = shipment(donor, r.want, r.space, settings.minSendAmount);
				if (!sent) continue;
				applyShipment(donor, sent);
				for (const k of RESOURCE_KINDS) {
					r.want[k] = Math.max(0, r.want[k] - sent[k]);
					r.space[k] -= sent[k];
				}
				out.push({
					from: donor.town.townId,
					to: r.town.townId,
					resources: sent,
					reason: r.town.wants?.what ?? ""
				});
			}
		}
		return out;
	}
	function planPoolTrades(towns, targetId, target, settings) {
		const space = target ? freeSpace(target) : {
			wood: Infinity,
			stone: Infinity,
			iron: Infinity
		};
		const donors = towns.filter((t) => t.townId !== targetId && (t.capacity ?? 0) > 0).map((town) => ({
			town,
			give: {
				wood: Math.floor(town.resources.wood),
				stone: Math.floor(town.resources.stone),
				iron: Math.floor(town.resources.iron)
			},
			capacity: town.capacity ?? 0
		})).sort((a, b) => distance(a.town.island, target?.island ?? null) - distance(b.town.island, target?.island ?? null) || a.town.townId - b.town.townId);
		const out = [];
		for (const donor of donors) {
			if (out.length >= settings.maxTransfersPerCycle) break;
			const sent = shipment(donor, { ...space }, space, settings.minSendAmount);
			if (!sent) continue;
			applyShipment(donor, sent);
			for (const k of RESOURCE_KINDS) space[k] -= sent[k];
			out.push({
				from: donor.town.townId,
				to: targetId,
				resources: sent,
				reason: "pool"
			});
		}
		return out;
	}
	function townBuildNeeds(win, settings, own) {
		const out = new Map();
		const queueLimit = buildQueueLimit(win, settings);
		const managed = settings.masters.autoBuild ? managedBuildTowns(win, settings, true) : [];
		for (const town of managed) {
			const read = readTownBuildPlan(win, town, queueLimit);
			if (!read) {
				out.set(town.townId, {
					wants: null,
					canDonate: false
				});
				continue;
			}
			const { plan, state } = read;
			if (plan.queueFull) {
				out.set(town.townId, {
					wants: null,
					canDonate: true
				});
				continue;
			}
			if (plan.next !== null) {
				out.set(town.townId, {
					wants: null,
					canDonate: false
				});
				continue;
			}
			const waiting = plan.waiting.find((w) => w.reason === "esperando recursos");
			if (waiting) {
				const cost = state.info?.[waiting.building]?.resourcesFor ?? {};
				const known = Object.keys(cost).length > 0;
				out.set(town.townId, {
					wants: known ? {
						cost,
						what: `${buildingName(waiting.building)} ${waiting.toLevel}`
					} : null,
					canDonate: false
				});
				continue;
			}
			out.set(town.townId, {
				wants: null,
				canDonate: town.hasProfile
			});
		}
		for (const id of own) {
			if (out.has(id)) continue;
			out.set(id, {
				wants: null,
				canDonate: buildingOrders(win, id).length >= queueLimit
			});
		}
		return out;
	}
	var SUMMARY$7 = "summary";
	function createAutoTradeModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const results = new Map();
		const retryAfter = new Map();
		const tracker = deps.tracker ?? createTradeTracker({
			api,
			win,
			now
		});
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: key === SUMMARY$7 ? void 0 : name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const summary = (level, text) => {
			record(SUMMARY$7, 0, "Comercio", level, text);
		};
		async function run(settings) {
			const cfg = settings.autoTrade;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) return 0;
			const own = ownTownIds(win);
			const poolId = cfg.poolEnabled ? cfg.poolTownId : null;
			const stop = (level, text) => {
				summary(level, text);
				notify();
				return 0;
			};
			if (cfg.poolEnabled && poolId === null) return stop("warn", "pool: falta la ciudad destino");
			if (poolId !== null && !cfg.poolAllied && !own.includes(poolId)) return stop("warn", `pool: la ciudad ${poolId} ya no es tuya, no se envía nada`);
			const readTowns = (incoming) => {
				const at = now().getTime();
				const needs = poolId !== null ? null : townBuildNeeds(win, settings, own);
				const out = [];
				for (const townId of own) {
					const resources = townResources(win, townId);
					if (!resources) continue;
					const blocked = (retryAfter.get(townId) ?? 0) > at;
					out.push({
						townId,
						resources,
						capacity: blocked ? 0 : townTradeCapacity(win, townId),
						island: townIsland(win, townId),
						incoming: incoming.get(townId) ?? zeroResources(),
						wants: needs?.get(townId)?.wants ?? null,
						canDonate: needs?.get(townId)?.canDonate ?? false
					});
				}
				return out;
			};
			const plan = (towns, minSendAmount = cfg.minSendAmount) => {
				const c = {
					...cfg,
					minSendAmount
				};
				if (poolId === null) return planTownTrades(towns, c);
				return planPoolTrades(towns, poolId, towns.find((t) => t.townId === poolId) ?? null, c);
			};
			const poolOwn = poolId !== null && own.includes(poolId);
			const before = readTowns(new Map());
			if (poolOwn && !before.some((t) => t.townId === poolId)) return stop("warn", "pool: no se leen los recursos de la ciudad destino");
			if (plan(before, 0).length === 0) return stop("info", poolId !== null ? "pool: nada que enviar" : "comercio: ninguna ciudad espera recursos que otra pueda dar");
			const read = await tracker.incoming(own);
			if ("error" in read) return stop("warn", `comercio: no se leen los comercios en camino, no se envía nada (${read.error})`);
			const towns = readTowns(read.incoming);
			if (poolOwn && !towns.some((t) => t.townId === poolId)) return stop("warn", "pool: no se leen los recursos de la ciudad destino");
			const transfers = plan(towns);
			if (transfers.length === 0) return stop("info", poolId !== null ? "pool: nada que enviar" : "comercio: lo que falta ya está en camino");
			const keys = new Set(transfers.map((t) => `${t.from}:${t.to}`));
			for (const key of [...results.keys()]) if (key !== SUMMARY$7 && !keys.has(key)) results.delete(key);
			const dryRun = deps.isDryRun();
			let actions = 0;
			for (const [i, t] of transfers.entries()) {
				const key = `${t.from}:${t.to}`;
				const fromName = townName(win, t.from);
				const toName = own.includes(t.to) ? townName(win, t.to) : `ciudad ${t.to}`;
				const what = `${resourcesText(t.resources)} a ${toName} (${t.reason})`;
				if (dryRun) {
					record(key, t.from, fromName, "info", `simulación: enviaría ${what}`);
					continue;
				}
				if (i > 0) await sleep(Math.round(TRADE_PAUSE_MS.min + random() * (TRADE_PAUSE_MS.max - TRADE_PAUSE_MS.min)));
				if (deps.isSafetyStopped?.() === true) break;
				try {
					await api.tradeBetweenTowns(t.from, t.to, t.resources);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					retryAfter.set(t.from, now().getTime() + TRADE_RETRY_MS);
					tracker.invalidate();
					record(key, t.from, fromName, "error", `error al enviar ${what}: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				actions += 1;
				tracker.noteSent(t.to, t.resources);
				record(key, t.from, fromName, "success", `enviado ${what}`);
			}
			const count = `${transfers.length} ${transfers.length === 1 ? "envío" : "envíos"}`;
			summary("info", dryRun ? `simulación: ${count}` : `comercio: enviados ${actions} de ${transfers.length}`);
			notify();
			return actions;
		}
		return {
			task: {
				name: "comercio",
				phase: "trade",
				category: "economy",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var FARM_JITTER_SECONDS = {
		min: 5,
		max: 60
	};
	var FARM_CLAIM_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	function claimTimeOptions(option) {
		const base = FARM_INTERVALS[option - 1] ?? FARM_INTERVALS[0];
		return {
			base,
			booty: base * 2
		};
	}
	function optionForInterval(seconds) {
		const index = FARM_INTERVALS.indexOf(seconds);
		return index < 0 ? 1 : index + 1;
	}
	function freeStorage(r) {
		return Math.max(0, r.storage - Math.min(r.wood, r.stone, r.iron));
	}
	function totalFree(r) {
		return [
			r.wood,
			r.stone,
			r.iron
		].reduce((sum, v) => sum + Math.max(0, r.storage - v), 0);
	}
	function createFarmVillagesModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		let nextDueAt = null;
		let lastDiagnosis = null;
		let lastExplanation = null;
		let running = false;
		const results = new Map();
		const listeners = new Set();
		const valuesCache = new Map();
		const notify = () => {
			for (const l of listeners) l();
		};
		const between = (min, max) => Math.round(min + random() * (max - min));
		function record(townId, name, level, text, extra = {}) {
			results.set(townId, {
				townId,
				name,
				at: now().getTime(),
				level,
				text,
				...extra
			});
			const options = {
				town: name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		function maxOptionFor(settings) {
			const { farmVillages: farm, rest } = settings;
			const configured = optionForInterval(farm.intervalSeconds);
			if (!farm.collectLongestBeforeRest || !rest.enabled) return configured;
			return isRestTime(rest, new Date(now().getTime() + farm.intervalSeconds * 1e3)) ? 4 : configured;
		}
		async function claimValues(townId, farmTownId, serverNow) {
			const key = `${townId}:${farmTownId}`;
			const cached = valuesCache.get(key);
			if (cached && serverNow - cached.at < 1800) return cached.values;
			const data = await api.getFarmTownTradeData(townId, farmTownId);
			valuesCache.set(key, {
				at: serverNow,
				values: data.claimResourceValues
			});
			return data.claimResourceValues;
		}
		function sumValues(list) {
			return [
				0,
				1,
				2,
				3
			].map((i) => {
				let total = 0;
				for (const values of list) {
					const v = values[i];
					if (v === null || v === void 0) return null;
					total += v;
				}
				return total;
			});
		}
		function plan(settings, serverNow) {
			const farm = settings.farmVillages;
			const included = new Set(farm.townIds === "all" ? ownTownIds(win) : farm.townIds);
			const towns = ownTownIds(win).filter((id) => included.has(id));
			const farmIsland = new Map();
			for (const f of farmTowns(win)) if (f.islandX !== null && f.islandY !== null) farmIsland.set(f.id, `${f.islandX},${f.islandY}`);
			const ready = new Map();
			let earliestPending = null;
			const relations = farmRelations(win);
			const diag = {
				towns: towns.length,
				townsWithData: 0,
				farmTowns: farmIsland.size,
				relations: relations.length,
				ownRelations: 0,
				onKnownIslands: 0,
				pending: 0,
				ready: 0,
				readyOnOwnIslands: 0
			};
			for (const r of relations) {
				if (r.relationStatus !== 1 || r.farmTownId === null) continue;
				diag.ownRelations += 1;
				const key = farmIsland.get(r.farmTownId);
				if (key === void 0) continue;
				diag.onKnownIslands += 1;
				if (r.lootableAt !== null && r.lootableAt > serverNow) {
					diag.pending += 1;
					earliestPending = earliestPending === null ? r.lootableAt : Math.min(earliestPending, r.lootableAt);
					continue;
				}
				diag.ready += 1;
				const list = ready.get(key) ?? [];
				list.push({
					relationId: r.id,
					farmTownId: r.farmTownId
				});
				ready.set(key, list);
			}
			const islands = [];
			const full = [];
			const byIsland = new Map();
			for (const townId of towns) {
				const island = townIsland(win, townId);
				const res = townResources(win, townId);
				if (!island || !res) continue;
				diag.townsWithData += 1;
				const key = `${island.x},${island.y}`;
				if (!ready.has(key)) continue;
				const list = byIsland.get(key) ?? [];
				list.push({
					townId,
					free: freeStorage(res),
					total: totalFree(res)
				});
				byIsland.set(key, list);
			}
			for (const [key, candidates] of byIsland) {
				const best = candidates.reduce((a, b) => b.free > a.free || b.free === a.free && b.total > a.total ? b : a);
				const name = townName(win, best.townId);
				if (best.free <= 0) {
					full.push({
						townId: best.townId,
						name
					});
					continue;
				}
				islands.push({
					key,
					townId: best.townId,
					name,
					free: best.free,
					farms: ready.get(key) ?? []
				});
			}
			for (const key of byIsland.keys()) diag.readyOnOwnIslands += ready.get(key)?.length ?? 0;
			return {
				islands,
				full,
				earliestPending,
				diag
			};
		}
		function explain(d) {
			if (d.towns === 0) return {
				problem: true,
				text: "no se encuentran las ciudades (ITowns.towns)"
			};
			if (d.townsWithData === 0) return {
				problem: true,
				text: "no se leen la isla o los recursos de las ciudades (getIslandCoordinateX / resources)"
			};
			if (d.relations === 0) return {
				problem: true,
				text: "no se encuentran las aldeas (FarmTownPlayerRelation)"
			};
			if (d.ownRelations === 0) return {
				problem: true,
				text: `ninguna de las ${d.relations} aldeas es propia (relation_status 1)`
			};
			if (d.farmTowns === 0 || d.onKnownIslands === 0) return {
				problem: true,
				text: "no se sabe en qué isla está cada aldea (FarmTown: island_x, island_y)"
			};
			if (d.ready > 0 && d.readyOnOwnIslands === 0) return {
				problem: true,
				text: `${d.ready} aldeas listas, pero ninguna en la isla de una ciudad incluida`
			};
			return {
				problem: false,
				text: `${d.pending} aldeas con cuenta atrás, ninguna lista todavía`
			};
		}
		function waitAfter(islands, option) {
			const { base, booty } = claimTimeOptions(option);
			return islands.length > 0 && islands.every((i) => researchesDone(win, i.townId)?.includes("booty") === true) ? booty : base;
		}
		function scheduleNext(serverNow, waitSeconds) {
			nextDueAt = serverNow + waitSeconds + between(FARM_JITTER_SECONDS.min, FARM_JITTER_SECONDS.max);
		}
		const total = (n, option) => `${n} aldeas, opción ${option}`;
		async function run(settings, manual) {
			if (!manual && !settings.farmVillages.enabled) return 0;
			if (deps.isSafetyStopped?.() === true) {
				if (manual) logger.warn("aldeas: pausa de seguridad activa, no se recoge");
				return 0;
			}
			if (manual && isRestTime(settings.rest, now())) {
				logger.info("aldeas: horas de descanso, no se recoge", { muted: true });
				return 0;
			}
			if (running) return 0;
			const serverNow = api.serverNow();
			if (serverNow === null) {
				logger.warn("aldeas: hora del servidor desconocida, se espera", { muted: true });
				return 0;
			}
			if (!manual && nextDueAt !== null && serverNow < nextDueAt) return 0;
			running = true;
			notify();
			try {
				return await collect(settings, serverNow, manual);
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				logger.error(`aldeas: ${err instanceof Error ? err.message : String(err)}`, { reason: `se vuelve a intentar en 5 min` });
				scheduleNext(serverNow, 300);
				return 0;
			} finally {
				running = false;
				notify();
			}
		}
		async function collect(settings, serverNow, manual) {
			const { islands, full, earliestPending, diag } = plan(settings, serverNow);
			lastDiagnosis = diag;
			for (const t of full) record(t.townId, t.name, "info", "almacén lleno, se salta");
			if (islands.length === 0 && full.length === 0) {
				const { problem, text } = explain(diag);
				if (manual || text !== lastExplanation) {
					const reason = `${diag.towns} ciudades (${diag.townsWithData} con isla y recursos), ${diag.relations} relaciones con aldeas (${diag.ownRelations} propias, ${diag.onKnownIslands} con isla conocida, ${diag.ready} listas)`;
					if (problem) logger.warn(`aldeas: nada que recoger: ${text}`, { reason });
					else logger.info(`aldeas: nada que recoger: ${text}`, {
						reason,
						muted: true
					});
				}
				lastExplanation = text;
			} else lastExplanation = null;
			if (islands.length === 0) {
				if (full.length > 0) scheduleNext(serverNow, 300);
				else if (earliestPending !== null) scheduleNext(earliestPending, 0);
				else nextDueAt = null;
				notify();
				return 0;
			}
			const maxOption = maxOptionFor(settings);
			const captain = isAdvisorActive(win, "captain");
			const dryRun = deps.isDryRun();
			const values = new Map();
			for (const island of islands) {
				const list = [];
				for (const f of island.farms) list.push(await claimValues(island.townId, f.farmTownId, serverNow));
				values.set(island.key, list);
			}
			const done = captain ? await collectWithCaptain(islands, values, maxOption, dryRun) : await collectOneByOne(settings, islands, values, maxOption, dryRun);
			scheduleNext(serverNow, done.option === null ? 300 : waitAfter(islands, done.option));
			notify();
			return dryRun ? 0 : done.claimed;
		}
		async function collectWithCaptain(islands, values, maxOption, dryRun) {
			const fitting = [];
			for (const island of islands) {
				const sums = sumValues(values.get(island.key) ?? []);
				const option = chooseFarmClaimOption({
					claimResourceValues: sums,
					tradeDuration: null,
					maxTradeCapacity: null,
					availableTradeCapacity: null
				}, {
					maxOption,
					freeStorage: island.free
				});
				if (option === null) {
					record(island.townId, island.name, "info", "ninguna opción cabe en el almacén");
					continue;
				}
				fitting.push({
					island,
					sums,
					option
				});
			}
			if (fitting.length === 0) return {
				claimed: 0,
				option: null
			};
			const option = Math.min(...fitting.map((f) => f.option));
			const gain = (f) => f.sums[option - 1] ?? 0;
			const farms = fitting.reduce((n, f) => n + f.island.farms.length, 0);
			const resources = fitting.reduce((n, f) => n + gain(f), 0);
			if (dryRun) {
				logger.info(`simulación: recogería ${farms} aldeas en ${fitting.length} ciudades, opción ${option}, +${resources} recursos`, { reason: "con Capitán (claim_loads_multiple)" });
				for (const f of fitting) record(f.island.townId, f.island.name, "info", `simulación: ${total(f.island.farms.length, option)}, +${gain(f)}`);
				return {
					claimed: farms,
					option
				};
			}
			const { base, booty } = claimTimeOptions(option);
			const { townId: current } = api.context();
			const result = await api.claimFarmVillagesMultiple(current, fitting.map((f) => f.island.townId), base, booty);
			const byId = new Map(result.towns.map((t) => [t.id, t]));
			for (const f of fitting) {
				const town = byId.get(f.island.townId);
				const extra = {};
				if (town) extra.resources = {
					wood: town.wood,
					stone: town.stone,
					iron: town.iron
				};
				record(f.island.townId, f.island.name, "success", `aldeas recogidas (${total(f.island.farms.length, option)}, +${gain(f)})`, extra);
			}
			return {
				claimed: farms,
				option
			};
		}
		async function collectOneByOne(settings, islands, values, maxOption, dryRun) {
			let budget = settings.farmVillages.maxClaimsPerCycle;
			let claimed = 0;
			let towns = 0;
			let resources = 0;
			let usedOption = null;
			let first = true;
			for (const island of islands) {
				let free = island.free;
				let count = 0;
				let gained = 0;
				let lastOption = null;
				let failed = false;
				const list = values.get(island.key) ?? [];
				for (const [i, farm] of island.farms.entries()) {
					if (budget <= 0) break;
					const option = chooseFarmClaimOption({
						claimResourceValues: list[i] ?? [],
						tradeDuration: null,
						maxTradeCapacity: null,
						availableTradeCapacity: null
					}, {
						maxOption,
						freeStorage: free
					});
					if (option === null) continue;
					const value = list[i]?.[option - 1] ?? 0;
					if (!dryRun) {
						if (!first) await sleep(between(FARM_CLAIM_PAUSE_MS.min, FARM_CLAIM_PAUSE_MS.max));
						first = false;
						try {
							await api.claimFarmVillage(island.townId, farm.relationId, farm.farmTownId, option);
						} catch (err) {
							if (err instanceof SafetyStopError) throw err;
							failed = true;
							record(island.townId, island.name, "error", `error al recoger una aldea: ${err instanceof Error ? err.message : String(err)}`);
							continue;
						}
					}
					budget -= 1;
					count += 1;
					free -= value;
					gained += value;
					lastOption = option;
					usedOption = usedOption === null ? option : Math.min(usedOption, option);
				}
				if (count === 0 || lastOption === null) {
					if (!failed && budget > 0) record(island.townId, island.name, "info", "ninguna opción cabe en el almacén");
					continue;
				}
				claimed += count;
				towns += 1;
				resources += gained;
				record(island.townId, island.name, dryRun ? "info" : "success", dryRun ? `simulación: ${total(count, lastOption)}, +${gained}` : `aldeas recogidas (${total(count, lastOption)}, +${gained})`);
			}
			if (dryRun && claimed > 0) logger.info(`simulación: recogería ${claimed} aldeas en ${towns} ciudades, opción ${usedOption}, +${resources} recursos`, { reason: "sin Capitán (aldea a aldea)" });
			return {
				claimed,
				option: usedOption
			};
		}
		return {
			task: {
				name: "aldeas",
				phase: "villages",
				category: "economy",
				run: (settings) => run(settings, false)
			},
			collectNow: (settings) => run(settings, true),
			status: () => ({
				nextDueAt,
				lastResults: [...results.values()],
				running
			}),
			diagnosis: () => lastDiagnosis,
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var BANDIT_RETRY_MS = 3e5;
	function banditFightWon(sim, attacker, defender) {
		for (const unit of Object.keys(defender)) if (sim.defSurvives[unit] !== 0) return false;
		if (Object.values(sim.defSurvives).some((n) => n !== 0)) return false;
		let survivors = 0;
		for (const unit of Object.keys(attacker)) {
			const n = sim.attSurvives[unit];
			if (n === void 0) return false;
			survivors += n;
		}
		return survivors > 0;
	}
	function planBanditAttack(home, units) {
		const out = {};
		for (const unit of units) {
			const n = Math.floor(home[unit] ?? 0);
			if (n > 0) out[unit] = n;
		}
		return out;
	}
	function banditReward(reward) {
		if (typeof reward !== "object" || reward === null) return {
			stashable: false,
			powerId: null
		};
		const r = reward;
		return {
			stashable: r.stashable === true || r.stashable === 1,
			powerId: typeof r.power_id === "string" && r.power_id !== "" ? r.power_id : null
		};
	}
	function describeUnits$1(units) {
		return Object.entries(units).map(([u, n]) => `${unitName("es", u)} ${String(n)}`).join(", ");
	}
	function sameUnits$1(a, b) {
		const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
		for (const k of keys) if ((a[k] ?? 0) !== (b[k] ?? 0)) return false;
		return true;
	}
	function createBanditsModule(deps) {
		const { api, win, logger } = deps;
		const now = deps.now ?? (() => new Date());
		let result = null;
		let retryAfter = 0;
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		let logged = null;
		let defenders = null;
		let seen = null;
		let lastFight = null;
		function readDefenders(wave) {
			const read = attackSpotWindowDefenders(win);
			if (read === null) return null;
			if (seen?.node === read.node) {
				if (seen.wave !== wave) return null;
			} else seen = {
				node: read.node,
				wave
			};
			defenders = {
				wave,
				units: read.units
			};
			return read.units;
		}
		function record(townId, name, level, text, key = text) {
			result = {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			};
			notify();
			const previous = logged;
			logged = key;
			if (previous === key && level !== "success") return;
			const options = {
				town: townId === 0 ? void 0 : name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const stop = (level, text, key = text) => {
			record(0, "Bandidos", level, text, key);
			return 0;
		};
		const errorText = (err) => err instanceof Error ? err.message : String(err);
		async function claimReward(townId, name, wave, reward) {
			const { stashable, powerId } = banditReward(reward);
			const what = `la recompensa de la oleada ${String(wave)}${powerId ? ` (${powerId})` : ""}`;
			if (deps.isDryRun()) {
				record(townId, name, "info", `simulación: ${stashable ? "guardaría en el inventario" : "usaría"} ${what}`);
				return 0;
			}
			retryAfter = now().getTime() + BANDIT_RETRY_MS;
			if (stashable) try {
				await api.claimBanditCampReward(townId, "stash");
				record(townId, name, "success", `guardada en el inventario ${what}`);
				return 1;
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				if (!(err instanceof GameApiError && !(err instanceof NetworkError) && !(err instanceof GoldSpendRefusedError))) {
					record(townId, name, "error", `error al guardar ${what}: ${errorText(err)}`);
					return 0;
				}
				logger.warn(`no se puede guardar ${what} (${errorText(err)}): se usa`, { town: name });
			}
			if (deps.isSafetyStopped?.() === true) return 0;
			try {
				await api.claimBanditCampReward(townId, "use");
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				record(townId, name, "error", `error al usar ${what}: ${errorText(err)}`);
				return 0;
			}
			record(townId, name, "success", `usada ${what}`);
			return 1;
		}
		async function run(settings) {
			const cfg = settings.bandits;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) return 0;
			const spot = attackSpot(win);
			const shown = spot?.level != null ? readDefenders(spot.level) : null;
			if (retryAfter > now().getTime()) return 0;
			if (spot === null) return stop("warn", "bandidos: no se lee el campamento, no se hace nada");
			if (spot.level === null) return stop("info", "bandidos: no hay campamento (o ya están hechas las 100 oleadas)");
			const townId = cfg.townId;
			if (townId === null) return stop("info", "bandidos: elige la ciudad desde la que se ataca");
			if (!ownTownIds(win).includes(townId)) return stop("warn", "bandidos: la ciudad elegida ya no es tuya");
			const name = townName(win, townId);
			const wave = spot.level;
			if (spot.hasReward === null) return stop("warn", "bandidos: no se lee si hay recompensa, no se ataca");
			if (spot.hasReward) return claimReward(townId, name, wave, spot.reward);
			if (spot.cooldownDuration === null) return stop("warn", "bandidos: no se lee la espera del campamento, no se ataca");
			if (spot.cooldownDuration > 0) {
				const min = Math.ceil(spot.cooldownDuration / 60);
				return stop("info", `bandidos: oleada ${String(wave)}, se puede atacar en ${String(min)} min`, `espera:${String(wave)}`);
			}
			const moving = attackSpotMovements(win);
			if (moving === null) return stop("warn", "bandidos: no se leen los movimientos de tropas, no se ataca");
			if (moving > 0) return stop("info", `bandidos: oleada ${String(wave)}, ataque en curso`);
			const home = townUnits(win, townId);
			if (home === null) return stop("warn", `bandidos: no se leen las tropas de ${name}, no se ataca`);
			const units = planBanditAttack(home, cfg.units);
			if (Object.keys(units).length === 0) return stop("info", `bandidos: no hay tropas de las elegidas en ${name}`);
			const text = `la oleada ${String(wave)} con ${describeUnits$1(units)}`;
			if (spot.units !== null && shown !== null && !sameUnits$1(spot.units, shown)) return stop("warn", `bandidos: los defensores de la ventana (${describeUnits$1(shown)}) no coinciden con los del campamento (${describeUnits$1(spot.units)}): no se ataca`, `distintos:${JSON.stringify([
				wave,
				spot.units,
				shown
			])}`);
			const known = spot.units ?? (defenders?.wave === wave ? defenders.units : null);
			if (known === null) return stop("warn", `bandidos: no se saben los defensores de la oleada ${String(wave)} (no se leen del campamento): abre unos segundos la ventana del campamento para leerlos. Sin eso no se ataca`, `defensores:${String(wave)}`);
			const key = JSON.stringify([
				wave,
				units,
				known
			]);
			let won = lastFight?.key === key ? lastFight.won : null;
			if (won === null) {
				try {
					won = banditFightWon(await api.simulateFight(townId, {
						attacker: units,
						defender: known,
						luck: -30
					}), units, known);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					retryAfter = now().getTime() + BANDIT_RETRY_MS;
					record(townId, name, "error", `no se pudo simular ${text} (${errorText(err)}): no se ataca`);
					return 0;
				}
				lastFight = {
					key,
					won
				};
			}
			if (!won) {
				record(townId, name, "warn", `no se ataca ${text}: se perdería (simulador del juego con la peor suerte)`, `pierde:${key}`);
				return 0;
			}
			if (deps.isDryRun()) {
				record(townId, name, "info", `simulación: atacaría ${text} (se gana con la peor suerte)`);
				return 0;
			}
			retryAfter = now().getTime() + BANDIT_RETRY_MS;
			try {
				await api.attackBanditCamp(townId, units);
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				record(townId, name, "error", `error al atacar ${text}: ${errorText(err)}`);
				return 0;
			}
			record(townId, name, "success", `atacada ${text}`);
			return 1;
		}
		return {
			task: {
				name: "bandidos",
				phase: "bandits",
				category: "economy",
				run
			},
			status: () => result ? [result] : [],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var CITY_FARM_ERROR_WAIT_MS = 6e5;
	function missingUnits(home, units) {
		const out = {};
		for (const [unit, n] of Object.entries(units)) {
			const lack = n - Math.floor(home[unit] ?? 0);
			if (lack > 0) out[unit] = lack;
		}
		return out;
	}
	function storageFull(res) {
		return res.wood >= res.storage && res.stone >= res.storage && res.iron >= res.storage;
	}
	function raidUnits(template) {
		const out = {};
		for (const [unit, n] of Object.entries(template.units)) if (Number.isInteger(n) && n > 0) out[unit] = n;
		return out;
	}
	function farmOrder(targets) {
		return targets.map((t, i) => ({
			t,
			i
		})).sort((a, b) => (a.t.lastSentAt ?? -1) - (b.t.lastSentAt ?? -1) || a.i - b.i).map(({ t }) => t);
	}
	function describeUnits(units) {
		return Object.entries(units).map(([u, n]) => `${unitName("es", u)} ${String(n)}`).join(", ");
	}
	function createCityFarmModule(deps) {
		const { api, win, logger } = deps;
		const now = deps.now ?? Date.now;
		const attackRate = deps.attackRate ?? createAttackRate(now);
		const results = new Map();
		const logged = new Map();
		const errorUntil = new Map();
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		let world = null;
		let worldAt = 0;
		let worldFailedAt = null;
		async function readWorld() {
			const at = now();
			if (world !== null && at - worldAt < 36e5) return world;
			if (worldFailedAt !== null && at - worldFailedAt < 6e5) return world;
			try {
				const list = await api.getWorldTowns();
				world = new Map(list.map((t) => [t.id, t]));
				worldAt = at;
				worldFailedAt = null;
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				worldFailedAt = at;
				logger.warn(`farmeo de ciudades: no se leen los datos del mundo (${errorText$4(err)})`);
			}
			return world;
		}
		function label(t) {
			const name = world?.get(t.targetTownId)?.name;
			return name ? `${name} (#${String(t.targetTownId)})` : `#${String(t.targetTownId)}`;
		}
		function record(t, level, text, key = text) {
			results.set(t.id, {
				id: t.id,
				level,
				text,
				at: now()
			});
			const previous = logged.get(t.id);
			logged.set(t.id, key);
			if (previous === key && level !== "success") return;
			const line = `farmeo de ${label(t)}: ${text}`;
			const options = {
				town: townName(win, t.fromTownId),
				muted: level === "info"
			};
			if (level === "success") logger.success(line, options);
			else if (level === "warn") logger.warn(line, options);
			else if (level === "error") logger.error(line, options);
			else logger.info(line, options);
		}
		async function run(settings) {
			const cfg = settings.cityFarm;
			const active = cfg.enabled ? cfg.targets.filter((t) => t.enabled) : [];
			const keep = new Set(active.map((t) => t.id));
			for (const id of [...results.keys()]) if (!keep.has(id)) results.delete(id);
			if (active.length === 0 || deps.isSafetyStopped?.() === true) {
				notify();
				return 0;
			}
			const owners = await readWorld();
			if (owners === null) {
				for (const t of active) record(t, "warn", "no se leen los datos del mundo (towns.txt): no se ataca");
				notify();
				return 0;
			}
			const own = new Set(ownTownIds(win));
			const nowS = api.serverNow() ?? Math.floor(now() / 1e3);
			const dryRun = deps.isDryRun();
			const homes = new Map();
			let sent = 0;
			let actions = 0;
			for (const t of farmOrder(active)) {
				if (deps.isSafetyStopped?.() === true) break;
				if ((errorUntil.get(t.id) ?? 0) > now()) continue;
				const template = cfg.templates.find((x) => x.id === t.templateId);
				if (!template) {
					record(t, "warn", "la plantilla ya no existe: elige otra");
					continue;
				}
				const units = raidUnits(template);
				if (Object.keys(units).length === 0) {
					record(t, "warn", `la plantilla «${template.name}» no tiene tropas`);
					continue;
				}
				if (!own.has(t.fromTownId)) {
					record(t, "warn", "la ciudad de origen ya no es tuya");
					continue;
				}
				const info = owners.get(t.targetTownId);
				if (info === void 0) {
					record(t, "warn", "no está en los datos del mundo: no se ataca");
					continue;
				}
				const owner = info.playerId ?? 0;
				if (t.ownerId === null) deps.update((st) => {
					const x = st.cityFarm.targets.find((y) => y.id === t.id);
					if (x && x.ownerId === null) x.ownerId = owner;
				});
				else if (owner !== t.ownerId) {
					deps.update((st) => {
						const x = st.cityFarm.targets.find((y) => y.id === t.id);
						if (x) {
							x.enabled = false;
							x.ownerChanged = true;
						}
					});
					record(t, "warn", "ha cambiado de dueño: se apaga");
					results.delete(t.id);
					continue;
				}
				if (own.has(t.targetTownId)) {
					record(t, "warn", "es una ciudad tuya: no se ataca");
					continue;
				}
				const res = townResources(win, t.fromTownId);
				if (res !== null && storageFull(res)) {
					record(t, "info", `almacén lleno en ${townName(win, t.fromTownId)}`);
					continue;
				}
				const moving = movementsBetween(win, t.fromTownId, t.targetTownId);
				if (moving === null) {
					record(t, "warn", "no se leen los movimientos de tropas: no se ataca");
					continue;
				}
				if (moving > 0) {
					record(t, "info", "ataque en camino");
					continue;
				}
				if (!homes.has(t.fromTownId)) {
					const read = townUnits(win, t.fromTownId);
					homes.set(t.fromTownId, read === null ? null : { ...read });
				}
				const home = homes.get(t.fromTownId) ?? null;
				if (home === null) {
					record(t, "warn", `no se leen las tropas de ${townName(win, t.fromTownId)}`);
					continue;
				}
				const lack = missingUnits(home, units);
				if (Object.keys(lack).length > 0) {
					record(t, "info", `esperando tropas (faltan ${describeUnits(lack)})`, "esperando");
					continue;
				}
				if (sent >= 5) {
					record(t, "info", `esperando turno (${String(5)} ataques por ciclo)`);
					continue;
				}
				const what = describeUnits(units);
				if (dryRun) record(t, "info", `simulación: atacaría con ${what}`);
				else {
					if (attackRate.wait(6) > 0) {
						record(t, "info", `esperando turno (${String(6)} ataques por minuto)`);
						continue;
					}
					attackRate.note();
					try {
						await api.sendUnits(t.fromTownId, t.targetTownId, units, "attack");
					} catch (err) {
						if (err instanceof SafetyStopError) throw err;
						errorUntil.set(t.id, now() + CITY_FARM_ERROR_WAIT_MS);
						record(t, "error", `error al atacar con ${what}: ${errorText$4(err)}`);
						continue;
					}
					errorUntil.delete(t.id);
					deps.update((st) => {
						const x = st.cityFarm.targets.find((y) => y.id === t.id);
						if (x) {
							x.sends += 1;
							x.lastSentAt = nowS;
						}
					});
					record(t, "success", `atacada con ${what}`);
					actions += 1;
				}
				sent += 1;
				for (const [unit, n] of Object.entries(units)) home[unit] = (home[unit] ?? 0) - n;
			}
			notify();
			return actions;
		}
		return {
			task: {
				name: "farmeo de ciudades",
				phase: "farming",
				category: "economy",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			},
			townInfo: (townId) => world?.get(townId) ?? null,
			async lookup(townId) {
				return (await readWorld())?.get(townId) ?? null;
			}
		};
	}
	function errorText$4(err) {
		return err instanceof Error ? err.message : String(err);
	}
	function nextActivity(previous, points, nowS) {
		if (!previous || points > previous.points) return {
			points,
			since: nowS
		};
		return {
			points,
			since: previous.since
		};
	}
	function load(storage, key) {
		try {
			const raw = JSON.parse(storage.getItem(key) ?? "null");
			if (!isRecord$4(raw) || raw.v !== 1 || !isRecord$4(raw.p)) return null;
			const { start, at } = raw;
			if (typeof start !== "number" || typeof at !== "number") return null;
			const p = new Map();
			for (const [id, value] of Object.entries(raw.p)) {
				const n = Number(id);
				if (!Number.isInteger(n) || !Array.isArray(value)) continue;
				const [points, since] = value;
				if (typeof points === "number" && typeof since === "number") p.set(n, {
					points,
					since
				});
			}
			return {
				start,
				at,
				p
			};
		} catch {
			return null;
		}
	}
	function createPlayerActivity(storage, key) {
		let saved = load(storage, key);
		return {
			record(players, nowS) {
				const p = new Map();
				for (const player of players) p.set(player.id, nextActivity(saved?.p.get(player.id), player.points, nowS));
				saved = {
					start: saved?.start ?? nowS,
					at: nowS,
					p
				};
				const out = {};
				for (const [id, e] of p) out[String(id)] = [e.points, e.since];
				try {
					storage.setItem(key, JSON.stringify({
						v: 1,
						start: saved.start,
						at: nowS,
						p: out
					}));
				} catch {}
			},
			get: (playerId) => saved?.p.get(playerId) ?? null,
			startedAt: () => saved?.start ?? null,
			updatedAt: () => saved?.at ?? null,
			count: () => saved?.p.size ?? 0
		};
	}
	function createActivityTask(deps) {
		const now = deps.now ?? Date.now;
		let last = 0;
		let failedAt = null;
		return {
			name: "actividad de jugadores",
			phase: "farming",
			category: "economy",
			async run(settings) {
				const at = now();
				if (deps.isSafetyStopped?.() === true) return 0;
				if (at - last < settings.intel.worldRefreshHours * 60 * 60 * 1e3) return 0;
				if (failedAt !== null && at - failedAt < 6e5) return 0;
				try {
					const players = await deps.api.getPlayers();
					deps.activity.record(players, deps.api.serverNow() ?? Math.floor(at / 1e3));
					last = at;
					failedAt = null;
					deps.onRecord?.();
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					failedAt = at;
					deps.logger.warn(`actividad de jugadores: no se lee players.txt (${err instanceof Error ? err.message : String(err)})`, { muted: true });
				}
				return 0;
			}
		};
	}
	function nearestOwnTown(own, x, y) {
		let best = null;
		for (const t of own) {
			if (!t.island) continue;
			const d = Math.hypot(t.island.x - x, t.island.y - y);
			if (best === null || d < best.d) best = {
				id: t.id,
				d
			};
		}
		return best && {
			fromTownId: best.id,
			distance: Math.round(best.d * 10) / 10
		};
	}
	function searchTargets(params, data) {
		const players = new Map(data.players.map((p) => [p.id, p]));
		const myAlliance = players.get(data.playerId)?.allianceId ?? null;
		const own = new Set(data.ownTowns.map((t) => t.id));
		const rows = [];
		if (!data.ownTowns.some((t) => t.island)) return {
			rows,
			total: 0
		};
		for (const town of data.towns) {
			if (own.has(town.id) || town.islandX === null || town.islandY === null) continue;
			if (params.maxTownPoints !== null && (town.points === null || town.points > params.maxTownPoints)) continue;
			const player = town.playerId === null ? null : players.get(town.playerId) ?? null;
			let inactiveDays = null;
			if (town.playerId === null) {
				if (!params.includeGhosts) continue;
			} else {
				if (town.playerId === data.playerId || !player) continue;
				if (params.excludeOwnAlliance && myAlliance !== null && player.allianceId === myAlliance) continue;
				if (params.maxPlayerPoints !== null && player.points > params.maxPlayerPoints) continue;
				const seen = data.activity(town.playerId);
				inactiveDays = seen ? Math.max(0, Math.floor((data.nowS - seen.since) / 86400)) : null;
				if (params.minInactiveDays > 0 && (inactiveDays === null || inactiveDays < params.minInactiveDays)) continue;
			}
			const best = nearestOwnTown(data.ownTowns, town.islandX, town.islandY);
			if (best === null || best.distance > params.radius) continue;
			rows.push({
				townId: town.id,
				townName: town.name,
				playerId: town.playerId,
				playerName: player?.name ?? null,
				points: town.points,
				inactiveDays,
				distance: best.distance,
				fromTownId: best.fromTownId
			});
		}
		rows.sort((a, b) => a.distance - b.distance || a.townId - b.townId);
		return {
			rows: rows.slice(0, 200),
			total: rows.length
		};
	}
	function createTargetSearch(deps) {
		const now = deps.now ?? Date.now;
		return async (params) => {
			const [towns, players] = [await deps.api.getWorldTowns(), await deps.api.getPlayers()];
			const nowS = deps.api.serverNow() ?? Math.floor(now() / 1e3);
			deps.activity.record(players, nowS);
			const { rows, total } = searchTargets(params, {
				towns,
				players,
				ownTowns: ownTownIds(deps.win).map((id) => ({
					id,
					island: townIsland(deps.win, id)
				})),
				playerId: deps.playerId,
				activity: (id) => deps.activity.get(id),
				nowS
			});
			return {
				rows,
				total,
				trackedSince: deps.activity.startedAt()
			};
		};
	}
	var WATCH_KEEP_S = 108e3;
	function loadHistory(storage, key) {
		try {
			const raw = JSON.parse(storage.getItem(key) ?? "null");
			if (!isRecord$4(raw) || raw.v !== 1 || !Array.isArray(raw.s)) return [];
			const out = [];
			for (const s of raw.s) {
				if (!isRecord$4(s) || typeof s.at !== "number" || !isRecord$4(s.p)) continue;
				const p = new Map();
				for (const [id, value] of Object.entries(s.p)) {
					const n = Number(id);
					if (!Number.isInteger(n) || !Array.isArray(value)) continue;
					const [points, att] = value;
					if (typeof points !== "number" || att !== null && typeof att !== "number") continue;
					p.set(n, {
						points,
						att
					});
				}
				out.push({
					at: s.at,
					p
				});
			}
			return out.sort((a, b) => a.at - b.at);
		} catch {
			return [];
		}
	}
	function createWatchHistory(storage, key) {
		let snapshots = loadHistory(storage, key);
		return {
			record(values, nowS) {
				const last = snapshots[snapshots.length - 1];
				if (last && nowS - last.at < 21600) return;
				snapshots = [...snapshots.filter((s) => nowS - s.at <= WATCH_KEEP_S), {
					at: nowS,
					p: new Map(values)
				}];
				const out = snapshots.map((s) => ({
					at: s.at,
					p: Object.fromEntries([...s.p].map(([id, v]) => [String(id), [v.points, v.att]]))
				}));
				try {
					storage.setItem(key, JSON.stringify({
						v: 1,
						s: out
					}));
				} catch {}
			},
			base(playerId) {
				for (const s of snapshots) {
					const v = s.p.get(playerId);
					if (v) return {
						...v,
						at: s.at
					};
				}
				return null;
			}
		};
	}
	function watchRows(params, data, limit = 200) {
		const players = new Map(data.players.map((p) => [p.id, p]));
		const alliances = new Map(data.alliances.map((a) => [a.id, a.name]));
		const myAlliance = players.get(data.playerId)?.allianceId ?? null;
		const own = new Set(data.ownTowns.map((t) => t.id));
		const distance = new Map();
		for (const town of data.towns) {
			if (town.playerId === null || own.has(town.id)) continue;
			if (town.islandX === null || town.islandY === null) continue;
			const best = nearestOwnTown(data.ownTowns, town.islandX, town.islandY);
			if (!best) continue;
			const prev = distance.get(town.playerId);
			if (prev === void 0 || best.distance < prev) distance.set(town.playerId, best.distance);
		}
		const pinned = new Set(params.pinned);
		const rows = [];
		for (const player of data.players) {
			const d = distance.get(player.id) ?? null;
			const isPinned = pinned.has(player.id);
			const auto = params.autoRadius > 0 && d !== null && d <= params.autoRadius && player.id !== data.playerId && (myAlliance === null || player.allianceId !== myAlliance);
			if (!isPinned && !auto) continue;
			const seen = data.activity(player.id);
			const inactiveDays = seen ? Math.max(0, Math.floor((data.nowS - seen.since) / 86400)) : null;
			const att = data.att.get(player.id) ?? null;
			const base = data.base(player.id);
			rows.push({
				playerId: player.id,
				name: player.name,
				allianceName: player.allianceId === null ? null : alliances.get(player.allianceId) ?? null,
				points: player.points,
				att,
				pointsDelta: base ? player.points - base.points : null,
				attDelta: base && base.att !== null && att !== null ? att - base.att : null,
				deltaSince: base?.at ?? null,
				inactiveDays,
				inactive: inactiveDays !== null && inactiveDays >= params.inactiveDays,
				distance: d,
				pinned: isPinned
			});
		}
		rows.sort((a, b) => Number(b.pinned) - Number(a.pinned) || (a.distance ?? Infinity) - (b.distance ?? Infinity) || a.playerId - b.playerId);
		return {
			rows: rows.slice(0, limit),
			total: rows.length
		};
	}
	var errorText$3 = (err) => err instanceof Error ? err.message : String(err);
	function createWatchedPlayers(deps) {
		const now = deps.now ?? Date.now;
		let lastTask = 0;
		let failedAt = null;
		async function load(params) {
			const players = await deps.api.getPlayers();
			const towns = await deps.api.getWorldTowns();
			const alliances = await deps.api.getAlliances();
			let att = new Map();
			let attError = null;
			try {
				att = new Map((await deps.api.getPlayerKills("att")).map((k) => [k.playerId, k.points]));
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				attError = errorText$3(err);
			}
			const nowS = deps.api.serverNow() ?? Math.floor(now() / 1e3);
			deps.activity.record(players, nowS);
			const all = watchRows(params, {
				players,
				alliances,
				towns,
				att,
				ownTowns: ownTownIds(deps.win).map((id) => ({
					id,
					island: townIsland(deps.win, id)
				})),
				playerId: deps.playerId,
				activity: (id) => deps.activity.get(id),
				base: (id) => deps.history.base(id),
				nowS
			}, Infinity);
			deps.history.record(new Map(all.rows.map((r) => [r.playerId, {
				points: r.points,
				att: r.att
			}])), nowS);
			deps.onLoad?.();
			return {
				rows: all.rows.slice(0, 200),
				total: all.total,
				attError
			};
		}
		return {
			load,
			async findPlayer(text) {
				const t = text.trim().replace(/^#/, "");
				if (t === "") return null;
				const players = await deps.api.getPlayers();
				const id = Number(t);
				const found = Number.isInteger(id) ? players.find((p) => p.id === id) : players.find((p) => p.name.toLowerCase() === t.toLowerCase());
				return found ? {
					id: found.id,
					name: found.name
				} : null;
			},
			task: {
				name: "jugadores vigilados",
				phase: "farming",
				category: "economy",
				async run(settings) {
					const watch = settings.intel.watch;
					const at = now();
					if (!watch.enabled || deps.isSafetyStopped?.() === true) return 0;
					if (at - lastTask < 216e5) return 0;
					if (failedAt !== null && at - failedAt < 6e5) return 0;
					try {
						await load(watch);
						lastTask = at;
						failedAt = null;
					} catch (err) {
						if (err instanceof SafetyStopError) throw err;
						failedAt = at;
						deps.logger.warn(`jugadores vigilados: no se leen los datos del mundo (${errorText$3(err)})`, { muted: true });
					}
					return 0;
				}
			}
		};
	}
	var MONITOR_SNAPSHOT_EVERY_S = 21600;
	var MONITOR_KEEP_S = 604800;
	var IO_WINDOW_S = 604800;
	function createDefenseHistory(storage, key) {
		let list = [];
		try {
			const raw = JSON.parse(storage.getItem(key) ?? "null");
			if (isRecord$4(raw) && raw.v === 1 && Array.isArray(raw.s)) {
				for (const s of raw.s) {
					if (!isRecord$4(s) || typeof s.at !== "number" || !isRecord$4(s.p)) continue;
					const p = new Map();
					for (const [id, v] of Object.entries(s.p)) if (Number.isInteger(Number(id)) && typeof v === "number") p.set(Number(id), v);
					list.push({
						at: s.at,
						p
					});
				}
				list.sort((a, b) => a.at - b.at);
			}
		} catch {
			list = [];
		}
		return {
			record(values, nowS) {
				const last = list[list.length - 1];
				if (last && nowS - last.at < 21600) return;
				list = [...list.filter((s) => nowS - s.at <= MONITOR_KEEP_S), {
					at: nowS,
					p: new Map(values)
				}];
				try {
					storage.setItem(key, JSON.stringify({
						v: 1,
						s: list.map((s) => ({
							at: s.at,
							p: Object.fromEntries(s.p)
						}))
					}));
				} catch {}
			},
			snapshots: () => list
		};
	}
	function findInternalConquests(conquers, allianceIds, players, alliances, sinceS) {
		const watched = new Set(allianceIds);
		const names = new Map(players.map((p) => [p.id, p.name]));
		const allianceNames = new Map(alliances.map((a) => [a.id, a.name]));
		const out = [];
		for (const c of conquers) {
			if (c.time < sinceS || c.newAllianceId === null || c.newAllianceId !== c.oldAllianceId) continue;
			if (!watched.has(c.newAllianceId)) continue;
			if (c.newPlayerId === null || c.oldPlayerId === null || c.newPlayerId === c.oldPlayerId) continue;
			out.push({
				townId: c.townId,
				time: c.time,
				fromId: c.oldPlayerId,
				fromName: names.get(c.oldPlayerId) ?? null,
				toId: c.newPlayerId,
				toName: names.get(c.newPlayerId) ?? null,
				allianceId: c.newAllianceId,
				allianceName: allianceNames.get(c.newAllianceId) ?? null,
				points: c.points
			});
		}
		return out.sort((a, b) => b.time - a.time || a.townId - b.townId);
	}
	function defenseJumps(members, defenseNow, snapshots, alliances, factor, nowS) {
		const allianceNames = new Map(alliances.map((a) => [a.id, a.name]));
		const old = snapshots.filter((s) => nowS - s.at >= MONITOR_SNAPSHOT_EVERY_S);
		const base = old[old.length - 1];
		const first = snapshots[0];
		if (!base || !first) return [];
		const out = [];
		for (const m of members) {
			const now = defenseNow.get(m.id);
			const then = base.p.get(m.id);
			if (now === void 0 || then === void 0 || m.allianceId === null) continue;
			const gain = now - then;
			const per6 = gain / ((nowS - base.at) / MONITOR_SNAPSHOT_EVERY_S);
			const start = first.p.get(m.id);
			const span = base.at - first.at;
			const usual = start === void 0 || span < 86400 ? null : Math.round((then - start) / span * MONITOR_SNAPSHOT_EVERY_S);
			const ratio = usual === null ? null : Math.round(per6 / Math.max(usual, 1) * 10) / 10;
			out.push({
				playerId: m.id,
				name: m.name,
				allianceId: m.allianceId,
				allianceName: allianceNames.get(m.allianceId) ?? null,
				gain,
				gainSince: base.at,
				usual,
				ratio,
				alert: ratio !== null && ratio >= factor && gain >= 500
			});
		}
		return out.sort((a, b) => Number(b.alert) - Number(a.alert) || (b.ratio ?? -1) - (a.ratio ?? -1) || b.gain - a.gain || a.playerId - b.playerId);
	}
	var errorText$2 = (err) => err instanceof Error ? err.message : String(err);
	function createAllianceMonitor(deps) {
		const now = deps.now ?? Date.now;
		let lastTask = 0;
		let failedAt = null;
		const logged = new Set();
		let allianceNames = new Map();
		const readAlliances = async () => {
			const alliances = await deps.api.getAlliances();
			allianceNames = new Map(alliances.map((a) => [a.id, a.name]));
			return alliances;
		};
		async function load(params) {
			const players = await deps.api.getPlayers();
			const alliances = await readAlliances();
			const kills = await deps.api.getPlayerKills("def");
			const conquers = await deps.api.getConquers();
			const nowS = deps.api.serverNow() ?? Math.floor(now() / 1e3);
			const ids = new Set(params.allianceIds);
			const members = players.filter((p) => p.allianceId !== null && ids.has(p.allianceId));
			const memberIds = new Set(members.map((m) => m.id));
			const defense = new Map();
			for (const k of kills) if (memberIds.has(k.playerId)) defense.set(k.playerId, k.points);
			const ma = defenseJumps(members, defense, deps.history.snapshots(), alliances, params.maFactor, nowS);
			if (members.length > 0) deps.history.record(defense, nowS);
			return {
				io: findInternalConquests(conquers, params.allianceIds, players, alliances, nowS - IO_WINDOW_S),
				ma,
				members: members.length,
				trackedSince: deps.history.snapshots()[0]?.at ?? null,
				at: nowS
			};
		}
		function logNews(result) {
			for (const e of result.io) {
				const key = `io:${String(e.townId)}:${String(e.time)}`;
				if (logged.has(key)) continue;
				logged.add(key);
				if (result.at - e.time > 25200) continue;
				const who = (name, id) => name ?? `#${String(id)}`;
				deps.logger.info(`monitor IO: la ciudad #${String(e.townId)} pasa de ${who(e.fromName, e.fromId)} a ${who(e.toName, e.toId)} (${e.allianceName ?? `#${String(e.allianceId)}`})`, { alert: "monitor" });
			}
			for (const r of result.ma) {
				if (!r.alert) continue;
				const key = `ma:${String(r.playerId)}:${String(r.gainSince)}`;
				if (logged.has(key)) continue;
				logged.add(key);
				deps.logger.info(`monitor MA: ${r.name} (${r.allianceName ?? `#${String(r.allianceId)}`}) gana ${String(r.gain)} de defensa en 6 h, ${String(r.ratio)} veces lo habitual`, { alert: "monitor" });
			}
		}
		return {
			load,
			async findAlliance(text) {
				const t = text.trim().replace(/^#/, "");
				if (t === "") return null;
				const alliances = await readAlliances();
				const id = Number(t);
				const found = Number.isInteger(id) ? alliances.find((a) => a.id === id) : alliances.find((a) => a.name.toLowerCase() === t.toLowerCase());
				return found ? {
					id: found.id,
					name: found.name
				} : null;
			},
			allianceName: (id) => allianceNames.get(id) ?? null,
			task: {
				name: "monitor IO y MA",
				phase: "farming",
				category: "economy",
				async run(settings) {
					const params = settings.intel.monitor;
					const at = now();
					if (!params.enabled || params.allianceIds.length === 0) return 0;
					if (deps.isSafetyStopped?.() === true) return 0;
					if (at - lastTask < 216e5) return 0;
					if (failedAt !== null && at - failedAt < 6e5) return 0;
					try {
						logNews(await load(params));
						lastTask = at;
						failedAt = null;
					} catch (err) {
						if (err instanceof SafetyStopError) throw err;
						failedAt = at;
						deps.logger.warn(`monitor IO y MA: no se leen los datos del mundo (${errorText$2(err)})`, { muted: true });
					}
					return 0;
				}
			}
		};
	}
	var ALERTS_CHECK_MS = 3e4;
	function alertWebhook(alerts, type) {
		if (!alerts.enabled || !alerts.types[type].enabled) return null;
		const hook = alerts.types[type].webhook || alerts.webhook;
		return hook === "" ? null : hook;
	}
	function configuredWebhooks(alerts) {
		const all = [alerts.webhook, ...Object.values(alerts.types).map((t) => t.webhook)];
		return [...new Set(all.filter((hook) => hook !== ""))];
	}
	function escapeMarkdown(text) {
		return text.replace(/[\\*_~`|>[\]<]/g, "\\$&");
	}
	function discordTime(epochS) {
		const s = String(Math.floor(epochS));
		return `<t:${s}:T> (<t:${s}:R>)`;
	}
	function createAlerts(deps) {
		const now = deps.now ?? Date.now;
		const prefix = `**${escapeMarkdown(deps.world)}** · `;
		const seenAttacks = new Map();
		let previous = null;
		let checking = false;
		const serverNow = () => deps.api.serverNow() ?? Math.floor(now() / 1e3);
		const town = (id) => escapeMarkdown(townName(deps.win, id));
		async function claimAndSend(key, hook, text) {
			if (!await deps.claim(key)) return;
			deps.send(hook, prefix + text);
		}
		async function checkAttacks(alerts, towns, nowS) {
			for (const [key, arrival] of seenAttacks) if (arrival < nowS - 60) seenAttacks.delete(key);
			const attacksHook = alertWebhook(alerts, "attacks");
			const conquestHook = alertWebhook(alerts, "conquest");
			if (attacksHook === null && conquestHook === null) return;
			for (const a of incomingAttacks(deps.win, towns) ?? []) {
				if (a.arrivalAt <= nowS) continue;
				const key = `attack:${a.commandId !== null ? String(a.commandId) : `${String(a.targetTownId)}:${String(a.arrivalAt)}`}`;
				if (seenAttacks.has(key)) continue;
				const conquest = a.colonyShip && conquestHook !== null;
				const hook = conquest ? conquestHook : attacksHook;
				if (hook === null) continue;
				seenAttacks.set(key, a.arrivalAt);
				const from = a.originTownId !== null ? ` desde la ciudad #${String(a.originTownId)}` : "";
				await claimAndSend(key, hook, conquest ? `🚩 **Posible conquista** en ${town(a.targetTownId)}: llega ${discordTime(a.arrivalAt)}${from}` : `⚔️ **Ataque entrante** a ${town(a.targetTownId)}: llega ${discordTime(a.arrivalAt)}${from}`);
			}
		}
		async function checkFinished(alerts, towns, nowS) {
			const hook = alertWebhook(alerts, "finished");
			if (hook === null) {
				previous = null;
				return;
			}
			const current = new Map();
			for (const townId of towns) {
				for (const order of buildingOrders(deps.win, townId)) current.set(`building:${String(order.id)}`, {
					kind: "building",
					townId,
					order
				});
				for (const order of researchOrders(deps.win, townId)) current.set(`research:${String(order.id)}`, {
					kind: "research",
					townId,
					order
				});
			}
			const before = previous;
			previous = current;
			if (before === null) return;
			for (const [key, t] of before) {
				if (current.has(key)) continue;
				const at = t.order.toBeCompletedAt;
				if (at === null || at > nowS + 300) continue;
				const teardown = t.order.attributes.tear_down === true ? " (demolición)" : "";
				const text = `✅ Terminado en ${town(t.townId)}: ${escapeMarkdown(finishLabel(t.kind, t.order))}${teardown}`;
				await claimAndSend(`done:${key}`, hook, text);
			}
		}
		return {
			async check() {
				const alerts = deps.settings().intel.alerts;
				if (!alerts.enabled) {
					previous = null;
					return;
				}
				if (checking) return;
				checking = true;
				try {
					const nowS = serverNow();
					const towns = ownTownIds(deps.win);
					await checkAttacks(alerts, towns, nowS);
					await checkFinished(alerts, towns, nowS);
				} finally {
					checking = false;
				}
			},
			onLog(entry, options) {
				if (options.alert === void 0) return;
				const hook = alertWebhook(deps.settings().intel.alerts, options.alert);
				if (hook === null) return;
				const text = `${options.alert === "combat" ? "🛡️" : "📈"} ${escapeMarkdown(formatLogText(entry))}`;
				(options.alert === "monitor" ? claimAndSend(`monitor:${entry.message}`, hook, text) : deps.send(hook, prefix + text)).catch(() => void 0);
			},
			async test() {
				const hooks = configuredWebhooks(deps.settings().intel.alerts);
				return {
					ok: (await Promise.all(hooks.map((hook) => deps.send(hook, `${prefix}🔔 Mensaje de prueba de las alertas`)))).filter(Boolean).length,
					total: hooks.length
				};
			}
		};
	}
	function findGhostTowns(towns, ownTowns, radius) {
		const rows = [];
		for (const town of towns) {
			if (town.playerId !== null || town.islandX === null || town.islandY === null) continue;
			const best = nearestOwnTown(ownTowns, town.islandX, town.islandY);
			if (best === null || best.distance > radius) continue;
			rows.push({
				townId: town.id,
				townName: town.name,
				islandX: town.islandX,
				islandY: town.islandY,
				points: town.points,
				...best
			});
		}
		rows.sort((a, b) => a.distance - b.distance || a.townId - b.townId);
		return {
			rows: rows.slice(0, 200),
			total: rows.length
		};
	}
	function createWorldIntel(deps) {
		const now = deps.now ?? Date.now;
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		const summary = () => ({
			downloadedAt: {
				players: deps.api.worldDataAt("players"),
				towns: deps.api.worldDataAt("towns"),
				alliances: deps.api.worldDataAt("alliances")
			},
			trackedSince: deps.activity.startedAt(),
			trackedPlayers: deps.activity.count()
		});
		const ownTowns = () => ownTownIds(deps.win).map((id) => ({
			id,
			island: townIsland(deps.win, id)
		}));
		return {
			summary,
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			},
			notify,
			async refresh() {
				const opts = { maxAgeMs: WORLD_DATA_REFRESH_MIN_MS };
				try {
					const players = await deps.api.getPlayers(opts);
					deps.activity.record(players, deps.api.serverNow() ?? Math.floor(now() / 1e3));
					await deps.api.getWorldTowns(opts);
					await deps.api.getAlliances(opts);
				} finally {
					notify();
				}
				return summary();
			},
			async ghosts(radius) {
				const towns = await deps.api.getWorldTowns();
				notify();
				return findGhostTowns(towns, ownTowns(), radius);
			}
		};
	}
	var TIMED_RECHECK_MS = 3e4;
	var TIMED_SHORT_WAIT_MS = 5e3;
	var TIMED_RETURN_MARGIN_MS = 1e3;
	var TIMED_SEND_ERROR_WAIT_MS = 1500;
	function parseDuration(value) {
		if (typeof value === "number") return Number.isFinite(value) && value > 0 ? Math.round(value) : null;
		if (typeof value !== "string") return null;
		const text = value.trim();
		const hms = /^(\d+):([0-5]\d):([0-5]\d)$/.exec(text);
		if (hms) return Number(hms[1]) * 3600 + Number(hms[2]) * 60 + Number(hms[3]);
		return /^\d+$/.test(text) && Number(text) > 0 ? Number(text) : null;
	}
	function travelTimeFromAttackInfo(json, units) {
		const table = isRecord$4(json.json) && isRecord$4(json.json.units) ? json.json.units : json.units;
		if (!isRecord$4(table) || units.length === 0) return null;
		let max = 0;
		for (const unit of units) {
			const entry = table[unit];
			const seconds = isRecord$4(entry) ? parseDuration(entry.duration) : null;
			if (seconds === null) return null;
			max = Math.max(max, seconds);
		}
		return max;
	}
	function pickCommand(commands, expectedArrival) {
		let best = null;
		for (const c of commands) {
			if (c.commandId === void 0 || c.arrivalAt === void 0) continue;
			if (best?.arrivalAt === void 0 || Math.abs(c.arrivalAt - expectedArrival) < Math.abs(best.arrivalAt - expectedArrival)) best = c;
		}
		return best ?? commands[0] ?? null;
	}
	function commandIdOf$1(command) {
		const id = command?.commandId;
		const n = typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id;
		return typeof n === "number" && Number.isInteger(n) && n > 0 ? n : null;
	}
	function formatDelta(delta) {
		return `${delta > 0 ? "+" : ""}${String(delta)} s`;
	}
	function clockTime(epochS) {
		const d = new Date(epochS * 1e3);
		const p = (n) => String(n).padStart(2, "0");
		return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
	}
	function formatSeconds(total) {
		const h = Math.floor(total / 3600);
		const m = Math.floor(total % 3600 / 60);
		const s = total % 60;
		const p = (n) => String(n).padStart(2, "0");
		if (h > 0) return `${String(h)} h ${p(m)} min ${p(s)} s`;
		if (m > 0) return `${String(m)} min ${p(s)} s`;
		return `${String(s)} s`;
	}
	function createTimedCommandsModule(deps) {
		const { api, win, logger } = deps;
		const setTimer = deps.setTimer ?? ((fn, ms) => setTimeout(fn, ms));
		const clearTimer = deps.clearTimer ?? ((id) => {
			clearTimeout(id);
		});
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const now = deps.now ?? Date.now;
		const results = new Map();
		const travel = new Map();
		const foreign = new Set();
		const loops = new Map();
		const attackRate = deps.attackRate ?? createAttackRate(now);
		const listeners = new Set();
		let timer = null;
		let pass = null;
		let again = false;
		let stopped = false;
		let warnedClock = false;
		const notify = () => {
			for (const l of listeners) l();
		};
		function arm(ms) {
			if (timer !== null) clearTimer(timer);
			if (stopped) return;
			timer = setTimer(() => {
				timer = null;
				check();
			}, Math.max(0, Math.min(ms, TIMED_RECHECK_MS)));
		}
		function label(item) {
			const target = ownTownIds(win).includes(item.targetTownId) ? townName(win, item.targetTownId) : `ciudad ${String(item.targetTownId)}`;
			return `${item.type === "attack" ? "ataque" : "apoyo"} cronometrado de ${townName(win, item.fromTownId)} a ${target}`;
		}
		function set(item, level, state, sendAt) {
			const text = `${label(item)}: ${state}`;
			const previous = results.get(item.id);
			results.set(item.id, {
				id: item.id,
				level,
				text,
				state,
				sendAt
			});
			if (previous?.text === text) return;
			if (level === "success") logger.success(text, { alert: "combat" });
			else if (level === "warn") logger.warn(text);
			else if (level === "error") logger.error(text);
			else logger.info(text, { muted: true });
			notify();
		}
		function setTuning(id, tuning) {
			deps.update((s) => {
				const it = s.timedCommands.items.find((x) => x.id === id);
				if (it) it.tuning = tuning;
			});
		}
		function archive(item, ok, text, level) {
			const at = api.serverNow() ?? Math.floor(now() / 1e3);
			deps.update((s) => {
				const cfg = s.timedCommands;
				cfg.items = cfg.items.filter((x) => x.id !== item.id);
				cfg.done.push({
					id: item.id,
					type: item.type,
					fromTownId: item.fromTownId,
					targetTownId: item.targetTownId,
					arrivalAt: item.arrivalAt,
					ok,
					text,
					at
				});
				if (cfg.done.length > 100) cfg.done.splice(0, cfg.done.length - 100);
			});
			results.delete(item.id);
			travel.delete(item.id);
			if (ok) logger.success(text, { alert: "combat" });
			else if (level === "warn") logger.warn(text);
			else logger.error(text);
			notify();
		}
		function missingUnits(item) {
			const have = townUnits(win, item.fromTownId);
			if (!have) return null;
			const missing = Object.entries(item.units).filter(([unit, want]) => (have[unit] ?? 0) < want).map(([unit, want]) => `${unit} ${String(have[unit] ?? 0)}/${String(want)}`);
			return missing.length > 0 ? missing.join(", ") : null;
		}
		async function readTravel(item, nowS) {
			if (item.travelSeconds !== null) return {
				seconds: item.travelSeconds,
				rereadAt: null
			};
			const key = JSON.stringify([
				item.fromTownId,
				item.targetTownId,
				Object.keys(item.units)
			]);
			const old = travel.get(item.id);
			let t = old?.key === key ? old : void 0;
			const rereadAt = (r) => {
				if (r.seconds === null) return r.readAt + 300;
				const at = item.arrivalAt - r.seconds - 13 - 120;
				return !r.reread && r.readAt < at ? at : null;
			};
			if (t === void 0 || (rereadAt(t) ?? Infinity) <= nowS) {
				let seconds = null;
				try {
					seconds = travelTimeFromAttackInfo(await api.getAttackInfo(item.fromTownId, item.targetTownId), Object.keys(item.units));
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
				}
				t = {
					key,
					seconds,
					readAt: nowS,
					reread: t?.seconds != null
				};
				travel.set(item.id, t);
			}
			if (t === void 0) return {
				seconds: null,
				rereadAt: null
			};
			return {
				seconds: t.seconds,
				rereadAt: rereadAt(t)
			};
		}
		async function castOn(item, commandId) {
			if (item.powerId === null) return "";
			try {
				await api.castPowerOnCommand(item.fromTownId, commandId, item.powerId);
				return ` · hechizo ${item.powerId} lanzado`;
			} catch (err) {
				const why = err instanceof SafetyStopError ? "pausa de seguridad" : errorText$1(err);
				return ` · hechizo ${item.powerId}: ${why}`;
			}
		}
		async function tune(id, travelS) {
			let tries = 0;
			let errors = 0;
			let shortest = travelS;
			let lastDelta = null;
			for (;;) {
				const settings = deps.getSettings();
				const item = settings.timedCommands.items.find((x) => x.id === id);
				if (!item) return;
				const what = label(item);
				let why = null;
				if (stopped) why = "se paró el módulo";
				else if (!settings.timedCommands.enabled || !item.enabled) why = "se apagó";
				else if (!settings.enabled) why = "el bot está apagado";
				else if (deps.isSafetyStopped?.() === true) why = "pausa de seguridad";
				else if (deps.isDryRun()) why = "se pasó a simulación";
				const nowS = api.serverNow();
				if (why === null && nowS === null) why = "no se sabe la hora del servidor";
				if (why !== null || nowS === null) {
					setTuning(id, false);
					set(item, "warn", `parado (${why ?? ""}), no queda nada en camino`, null);
					return;
				}
				if (nowS + shortest > item.arrivalAt + item.late || tries >= 40) {
					archive(item, false, `${what}: no se fijó a tiempo${lastDelta === null ? "" : ` (último Δ ${formatDelta(lastDelta)} en ${String(tries)} intentos)`}; no queda nada en camino`);
					return;
				}
				if (item.type === "attack") {
					const wait = attackRate.wait(9);
					if (wait > 0) {
						set(item, "info", `esperando turno (${String(9)} ataques por minuto)`, null);
						await sleep(wait);
						continue;
					}
					attackRate.note();
				}
				tries += 1;
				const sentAt = nowS;
				let commands;
				try {
					commands = (await api.sendUnits(item.fromTownId, item.targetTownId, item.units, item.type)).commands;
				} catch (err) {
					if (err instanceof SafetyStopError) {
						archive(item, false, `${what}: pausa de seguridad al enviar; revisa los movimientos`);
						return;
					}
					errors += 1;
					if (errors >= 3) {
						archive(item, false, `${what}: error al enviar: ${errorText$1(err)}`);
						return;
					}
					set(item, "warn", `error al enviar (${errorText$1(err)}), se reintenta`, null);
					await sleep(TIMED_SEND_ERROR_WAIT_MS);
					continue;
				}
				errors = 0;
				const command = pickCommand(commands, sentAt + shortest);
				const commandId = commandIdOf$1(command);
				const arrival = command?.arrivalAt;
				if (commandId === null) {
					archive(item, false, `${what}: enviado, pero la respuesta no trae el id del movimiento; no se puede ajustar ni cancelar: revisa los movimientos`);
					return;
				}
				if (arrival === void 0) {
					let cancelled = "se ha cancelado";
					try {
						await api.cancelCommand(item.fromTownId, commandId);
					} catch (err) {
						cancelled = `no se pudo cancelar (${errorText$1(err)}): revisa los movimientos`;
					}
					archive(item, false, `${what}: enviado, pero no se lee su llegada; ${cancelled}`);
					return;
				}
				const delta = arrival - item.arrivalAt;
				lastDelta = delta;
				shortest = Math.min(shortest, arrival - (command?.startedAt ?? sentAt));
				if (delta >= -item.early && delta <= item.late) {
					const spell = await castOn(item, commandId);
					archive(item, true, `${what}: fijado, llega a las ${clockTime(arrival)} (Δ ${formatDelta(delta)}, intento ${String(tries)})${spell}`);
					return;
				}
				set(item, "info", `ajustando, Δ ${formatDelta(delta)} (intento ${String(tries)})`, null);
				try {
					await api.cancelCommand(item.fromTownId, commandId);
				} catch (err) {
					archive(item, false, `${what}: no se pudo cancelar un envío fuera de tolerancia (Δ ${formatDelta(delta)}): ${errorText$1(err)}; revisa los movimientos`);
					return;
				}
				if (delta - 10 > item.late) {
					archive(item, false, `${what}: llega ${String(delta)} s tarde aun sin el desfase aleatorio; revisa la duración del viaje (se ha cancelado)`);
					return;
				}
				const away = Math.max(0, (api.serverNow() ?? sentAt) - (command?.startedAt ?? sentAt));
				let pause = Math.max(600, away * 1e3 + TIMED_RETURN_MARGIN_MS);
				if (delta < -item.early) pause = Math.max(pause, (-delta - item.early - 10) * 1e3);
				await sleep(pause);
			}
		}
		function startLoop(item, travelS) {
			setTuning(item.id, true);
			const loop = tune(item.id, travelS).catch((err) => {
				const current = deps.getSettings().timedCommands.items.find((x) => x.id === item.id);
				if (current) archive(current, false, `${label(current)}: ${errorText$1(err)}; revisa los movimientos`);
			}).finally(() => {
				loops.delete(item.id);
				check();
			});
			loops.set(item.id, loop);
		}
		async function run() {
			let settings = deps.getSettings();
			for (const item of settings.timedCommands.items.filter((i) => i.tuning && !loops.has(i.id))) archive(item, false, `${label(item)}: la página se recargó mientras se ajustaba; revisa los movimientos, puede haber un envío en camino`);
			settings = deps.getSettings();
			const cfg = settings.timedCommands;
			const ids = new Set(cfg.items.map((i) => i.id));
			for (const id of [...results.keys()]) if (!ids.has(id)) results.delete(id);
			for (const id of [...travel.keys()]) if (!ids.has(id)) travel.delete(id);
			for (const id of [...foreign]) if (!ids.has(id)) foreign.delete(id);
			const items = cfg.enabled ? cfg.items.filter((i) => i.enabled && !loops.has(i.id)) : [];
			if (items.length === 0) {
				if (cfg.enabled && loops.size > 0) arm(TIMED_RECHECK_MS);
				notify();
				return;
			}
			const nowS = api.serverNow();
			if (nowS === null) {
				if (!warnedClock) logger.warn("ataques cronometrados: aún no se sabe la hora del servidor");
				warnedClock = true;
				arm(TIMED_SHORT_WAIT_MS);
				notify();
				return;
			}
			warnedClock = false;
			const dryRun = deps.isDryRun();
			const own = ownTownIds(win);
			let wait = Infinity;
			for (const item of items) {
				const what = label(item);
				if (nowS > item.arrivalAt + item.late) {
					if (dryRun) set(item, "warn", `ya pasó la hora de llegada`, null);
					else if (foreign.has(item.id)) archive(item, false, `${what}: ya pasó la hora; lo enviaba otra pestaña del juego`, "warn");
					else archive(item, false, `${what}: ya pasó la hora de llegada sin enviarlo`, "warn");
					continue;
				}
				if (own.length > 0 && !own.includes(item.fromTownId)) {
					set(item, "error", `la ciudad de origen no es tuya`, null);
					continue;
				}
				if (deps.isSafetyStopped?.() === true) {
					set(item, "warn", `pausa de seguridad`, null);
					continue;
				}
				const { seconds, rereadAt } = await readTravel(item, nowS);
				if (seconds === null) {
					set(item, "warn", `no se lee la duración del viaje; vuelve a programarlo escribiéndola a mano`, null);
					if (rereadAt !== null) wait = Math.min(wait, (rereadAt - nowS) * 1e3);
					continue;
				}
				const sendAt = item.arrivalAt - seconds;
				if (nowS + seconds > item.arrivalAt + item.late) {
					const state = `ya no da tiempo, el viaje dura ${formatSeconds(seconds)}`;
					if (dryRun) set(item, "warn", state, sendAt);
					else archive(item, false, `${what}: ${state}`, "warn");
					continue;
				}
				const start = sendAt - 13;
				if (nowS < start) {
					set(item, "info", `esperando, envío a las ${clockTime(sendAt)}`, sendAt);
					wait = Math.min(wait, (Math.min(start, rereadAt ?? Infinity) - nowS) * 1e3);
					continue;
				}
				if (!settings.enabled) {
					set(item, "warn", `el bot está apagado, no se envía`, sendAt);
					wait = Math.min(wait, TIMED_SHORT_WAIT_MS);
					continue;
				}
				const missing = missingUnits(item);
				if (missing !== null) {
					set(item, "warn", `esperando tropas (${missing})`, sendAt);
					wait = Math.min(wait, TIMED_SHORT_WAIT_MS);
					continue;
				}
				if (dryRun) {
					set(item, "info", `simulación: se enviaría a las ${clockTime(sendAt)} para llegar a las ${clockTime(item.arrivalAt)}`, sendAt);
					continue;
				}
				if (deps.claim && !await deps.claim(item.id)) {
					foreign.add(item.id);
					set(item, "warn", "otra pestaña del juego se encarga de este envío", sendAt);
					continue;
				}
				startLoop(item, seconds);
			}
			arm(wait === Infinity ? TIMED_RECHECK_MS : wait);
			notify();
		}
		async function passes() {
			try {
				const more = () => again && !stopped;
				do {
					again = false;
					await run();
				} while (more());
			} catch (err) {
				if (!(err instanceof SafetyStopError)) logger.error(`ataques cronometrados: ${errorText$1(err)}`);
				arm(TIMED_RECHECK_MS);
			} finally {
				pass = null;
			}
		}
		function check() {
			if (stopped) return Promise.resolve();
			if (pass !== null) {
				again = true;
				return pass;
			}
			pass = passes();
			return pass;
		}
		return {
			check,
			stop() {
				stopped = true;
				if (timer !== null) clearTimer(timer);
				timer = null;
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			},
			async settled() {
				for (;;) if (loops.size > 0) await Promise.all([...loops.values()]);
				else if (pass !== null) await pass;
				else return;
			}
		};
	}
	function errorText$1(err) {
		return err instanceof Error ? err.message : String(err);
	}
	var DODGE_RECHECK_MS = 6e4;
	function dodgeWindow(attacks, cfg) {
		const first = attacks[0];
		if (!first) return null;
		const before = cfg.secondsBefore;
		const offset = cfg.returnOffset;
		const sendAt = first.arrivalAt - before;
		const colony = attacks.find((a) => a.colonyShip);
		let note = null;
		let homeAt = first.arrivalAt + offset;
		if (colony && cfg.returnMode === "beforeColony") {
			if (colony === first) return null;
			const lastBefore = Math.max(...attacks.filter((a) => a.arrivalAt < colony.arrivalAt).map((a) => a.arrivalAt));
			const target = colony.arrivalAt - offset;
			if (target > lastBefore) return {
				sendAt,
				homeAt: target,
				homeBefore: true,
				lastImpact: lastBefore,
				note: null
			};
			note = "no da tiempo a volver antes del barco colono; vuelven después";
			homeAt = colony.arrivalAt + offset;
		} else if (colony && cfg.returnMode === "afterColony") homeAt = colony.arrivalAt + offset;
		return extendWindow({
			sendAt,
			homeAt,
			homeBefore: false,
			lastImpact: first.arrivalAt,
			note
		}, attacks, cfg);
	}
	function extendWindow(w, attacks, cfg) {
		let { homeAt, lastImpact } = w;
		for (const a of attacks) {
			if (a.arrivalAt + cfg.returnOffset <= homeAt) {
				lastImpact = Math.max(lastImpact, a.arrivalAt);
				continue;
			}
			if (a.arrivalAt - cfg.secondsBefore >= homeAt + 5) break;
			homeAt = a.arrivalAt + cfg.returnOffset;
			lastImpact = a.arrivalAt;
		}
		return {
			...w,
			homeAt,
			lastImpact
		};
	}
	function cancelTime(sentAt, homeAt, homeBefore) {
		const half = (sentAt + homeAt) / 2;
		return homeBefore ? Math.floor(half) : Math.ceil(half);
	}
	function dodgeCommands(units, cfg, mixed) {
		let land = {};
		const fleet = {};
		const wanted = (role) => {
			if (role === "transport") return true;
			if (cfg.units === "all") return role !== "never";
			if (role === "mixed") return mixed === "both" || mixed === cfg.units;
			return role === cfg.units;
		};
		for (const [unit, count] of Object.entries(units)) {
			if (!isUnitId(unit) || !Number.isInteger(count) || count <= 0) continue;
			const role = UNIT_ROLES[unit];
			if (!wanted(role)) continue;
			if (role === "transport") {
				if (cfg.land) land[unit] = count;
				else if (cfg.fleet) fleet[unit] = count;
			} else if (isNavalUnit(unit)) {
				if (cfg.fleet) fleet[unit] = count;
			} else if (cfg.land) land[unit] = count;
		}
		if (!Object.keys(land).some((u) => UNIT_ROLES[u] !== "transport")) {
			if (cfg.fleet) Object.assign(fleet, land);
			land = {};
		}
		return (cfg.separate ? [land, fleet] : [{
			...land,
			...fleet
		}]).filter((c) => Object.keys(c).length > 0);
	}
	function destinationOrder(originId, towns, threatened) {
		const origin = towns.find((t) => t.id === originId)?.island ?? null;
		const distance = (island) => island === null || origin === null ? Infinity : Math.hypot(island.x - origin.x, island.y - origin.y);
		return towns.filter((t) => t.id !== originId && !threatened.has(t.id)).map((t) => ({
			id: t.id,
			d: distance(t.island)
		})).sort((a, b) => a.d - b.d || a.id - b.id).map((t) => t.id);
	}
	var total = (units) => Object.values(units).reduce((s, n) => s + n, 0);
	function commandIdOf(command) {
		const id = command?.commandId;
		const n = typeof id === "string" && /^\d+$/.test(id) ? Number(id) : id;
		return typeof n === "number" && Number.isInteger(n) && n > 0 ? n : null;
	}
	var errorText = (err) => err instanceof Error ? err.message : String(err);
	function townCfg(settings, townId) {
		const cfg = settings.defense.dodgeTowns.find((t) => t.townId === townId);
		return cfg?.enabled ? cfg : null;
	}
	function createDodgeEngine(deps) {
		const { api, win } = deps;
		const setTimer = deps.setTimer ?? ((fn, ms) => setTimeout(fn, ms));
		const clearTimer = deps.clearTimer ?? ((id) => {
			clearTimeout(id);
		});
		const random = deps.random ?? Math.random;
		const dodges = new Map();
		let attacksByTown = new Map();
		let threatenedTowns = new Set();
		let timer = null;
		let stopped = false;
		let pass = Promise.resolve();
		const name = (id) => townName(win, id);
		function blocked(settings) {
			if (!settings.enabled) return "el bot está apagado";
			if (!settings.defense.enabled) return "la Defensa está apagada";
			if (deps.isSafetyStopped?.() === true) return "pausa de seguridad";
			return null;
		}
		function arm(nowS) {
			if (timer !== null) clearTimer(timer);
			timer = null;
			if (stopped) return;
			let next = Infinity;
			for (const d of dodges.values()) if (d.phase === "planned") next = Math.min(next, d.prepared ? d.window.sendAt : d.window.sendAt - 300);
			else if (d.phase === "away" && d.cancelAt !== null) next = Math.min(next, d.cancelAt);
			else if (d.phase === "returning") next = Math.min(next, d.window.homeAt);
			const ms = next === Infinity ? DODGE_RECHECK_MS : Math.max(0, (next - nowS) * 1e3);
			timer = setTimer(() => {
				timer = null;
				queue(true);
			}, Math.min(ms, DODGE_RECHECK_MS));
		}
		async function prepare(d, cfg, settings) {
			d.prepared = true;
			const commands = dodgeCommands(townUnits(win, d.townId) ?? {}, cfg, settings.defense.mixedUnits);
			let candidates;
			if (cfg.destination === "town") {
				const id = cfg.destinationTownId;
				candidates = id !== null && id !== d.townId ? [id] : [];
			} else {
				const own = ownTownIds(win).map((id) => ({
					id,
					island: townIsland(win, id)
				}));
				candidates = destinationOrder(d.townId, own, threatenedTowns).slice(0, 3);
				if (cfg.destination === "random") candidates = candidates.map((id) => ({
					id,
					r: random()
				})).sort((a, b) => a.r - b.r).map((c) => c.id);
			}
			d.destination = candidates[0] ?? null;
			d.travel = null;
			if (commands.length === 0) return;
			const needed = Math.ceil((d.window.homeAt - d.window.sendAt) / 2) + 3;
			for (const id of candidates) {
				let travel = null;
				try {
					const json = await api.getAttackInfo(d.townId, id);
					const times = commands.map((c) => travelTimeFromAttackInfo(json, Object.keys(c)));
					travel = times.some((t) => t === null) ? null : Math.min(...times);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
				}
				if (travel !== null && travel >= needed) {
					d.destination = id;
					d.travel = travel;
					return;
				}
				if (id === d.destination) d.travel = travel;
			}
		}
		function describe(d, prefix) {
			const dest = d.destination === null ? "?" : name(d.destination);
			const back = clockTime(d.window.homeAt);
			const needed = Math.ceil((d.window.homeAt - d.window.sendAt) / 2) + 3;
			let text = `${prefix} a las ${clockTime(d.window.sendAt)} hacia ${dest}; ${d.window.homeBefore ? "vuelven antes de" : "vuelven a"} las ${back}`;
			if (d.travel === null) text += " (no se lee la duración del viaje)";
			else if (d.travel < needed) text += `; el viaje dura ${String(d.travel)} s y llegarían antes de volver: se quedarían allí de apoyo`;
			if (d.window.note) text += `; ${d.window.note}`;
			return text;
		}
		async function send(d, cfg, settings) {
			const nowS = api.serverNow();
			if (nowS === null) return;
			const firstImpact = Math.min(...[...attacksByTown.get(d.townId) ?? []].filter((a) => d.keys.has(a.key)).map((a) => a.arrivalAt));
			if (Number.isFinite(firstImpact) && firstImpact - nowS < 2) {
				d.phase = "done";
				deps.report(d.townId, "warn", "ya no da tiempo a esquivar el ataque");
				return;
			}
			if (d.destination === null) {
				d.phase = "done";
				deps.report(d.townId, "warn", cfg.destination === "town" ? "no se puede esquivar: elige la ciudad de destino" : "no se puede esquivar: no hay otra ciudad sin ataques");
				return;
			}
			const commands = dodgeCommands(townUnits(win, d.townId) ?? {}, cfg, settings.defense.mixedUnits);
			if (commands.length === 0) {
				d.phase = "done";
				deps.report(d.townId, "info", "no hay tropas que mover");
				return;
			}
			if (deps.claim && !await deps.claim(`dodge:${String(d.townId)}:${String(d.window.sendAt)}`)) {
				d.phase = "done";
				deps.report(d.townId, "warn", "otra pestaña del juego esquiva este ataque");
				return;
			}
			const dest = name(d.destination);
			let sentAt = nowS;
			let moved = 0;
			const problems = [];
			let cancelableUntil = Infinity;
			for (const units of commands) {
				let commandsBack;
				try {
					commandsBack = (await api.sendUnits(d.townId, d.destination, units, "support")).commands;
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					problems.push(`error al enviar: ${errorText(err)}`);
					continue;
				}
				moved += total(units);
				const command = pickCommand(commandsBack.filter((c) => c.startedAt === void 0 || Math.abs(c.startedAt - nowS) <= 5), nowS + (d.travel ?? 0));
				const id = commandIdOf(command);
				if (command?.startedAt !== void 0) sentAt = Math.min(sentAt, command.startedAt);
				if (command?.cancelableUntil !== void 0) cancelableUntil = Math.min(cancelableUntil, command.cancelableUntil);
				if (id === null) problems.push("la respuesta no trae el id del movimiento: no se pueden hacer volver, se quedan allí de apoyo");
				else d.commandIds.push(id);
			}
			d.sentAt = sentAt;
			if (moved === 0) {
				d.phase = "done";
				deps.report(d.townId, "error", `no se pudo esquivar: ${problems.join("; ")}`);
				return;
			}
			d.cancelAt = cancelTime(sentAt, d.window.homeAt, d.window.homeBefore);
			d.phase = d.commandIds.length > 0 ? "away" : "done";
			if (cancelableUntil < d.cancelAt) problems.push(`solo se pueden cancelar hasta las ${clockTime(cancelableUntil)}: se quedarán de apoyo en ${dest}`);
			const extra = problems.length > 0 ? `; ${problems.join("; ")}` : "";
			deps.report(d.townId, problems.length > 0 ? "warn" : "success", `esquivando: ${String(moved)} tropas hacia ${dest}, vuelta a las ${clockTime(d.window.homeAt)}${extra}`);
		}
		async function bringBack(d) {
			const nowS = api.serverNow() ?? d.cancelAt ?? 0;
			const dest = d.destination === null ? "?" : name(d.destination);
			const failed = [];
			for (const id of d.commandIds) try {
				await api.cancelCommand(d.townId, id);
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				failed.push(errorText(err));
			}
			d.phase = "returning";
			const home = 2 * nowS - (d.sentAt ?? nowS);
			if (failed.length === 0) deps.report(d.townId, "success", `de vuelta: en casa a las ${clockTime(home)}`);
			else deps.report(d.townId, "error", `no se pudo cancelar (${failed.join("; ")}): se quedan de apoyo en ${dest}`);
		}
		async function tick(fromTimer) {
			const nowS = api.serverNow();
			if (nowS === null || stopped) return;
			const settings = deps.getSettings();
			const dryRun = deps.isDryRun();
			const why = blocked(settings);
			for (const d of [...dodges.values()]) {
				const cfg = townCfg(settings, d.townId);
				if (d.phase === "returning" || d.phase === "done") {
					if (nowS >= Math.max(d.window.homeAt, d.window.lastImpact)) dodges.delete(d.townId);
					continue;
				}
				if (d.phase === "away") {
					if (d.cancelAt === null || nowS < d.cancelAt) continue;
					const stop = why ?? (dryRun ? "se pasó a simulación" : null);
					if (stop !== null) {
						d.phase = "done";
						const dest = d.destination === null ? "?" : name(d.destination);
						deps.report(d.townId, "warn", `${stop}: no se cancela, se quedan de apoyo en ${dest}`);
						continue;
					}
					await bringBack(d);
					continue;
				}
				if (!cfg) {
					dodges.delete(d.townId);
					continue;
				}
				if (!d.prepared && nowS >= d.window.sendAt - 300) await prepare(d, cfg, settings);
				if (nowS < d.window.sendAt) {
					if (d.prepared) deps.report(d.townId, "info", describe(d, dryRun ? "simulación: esquivaría" : "esquivará"));
					continue;
				}
				if (dryRun) {
					d.phase = "done";
					deps.report(d.townId, "info", describe(d, "simulación: habría esquivado"));
					continue;
				}
				if (why !== null) {
					d.phase = "done";
					deps.report(d.townId, "warn", `${why}: no se esquiva`);
					continue;
				}
				await send(d, cfg, settings);
			}
			arm(api.serverNow() ?? nowS);
			if (fromTimer) deps.notify();
		}
		function queue(fromTimer) {
			pass = pass.then(() => {
				if (!fromTimer) {
					const nowS = api.serverNow();
					if (nowS !== null) plan(nowS);
				}
				return tick(fromTimer);
			}).catch((err) => {
				if (!(err instanceof SafetyStopError)) deps.logger.error(`defensa: error al esquivar: ${errorText(err)}`);
			});
			return pass;
		}
		function newDodge(townId, window) {
			return {
				townId,
				phase: "planned",
				window,
				keys: new Set(),
				destination: null,
				travel: null,
				prepared: false,
				sentAt: null,
				cancelAt: null,
				commandIds: []
			};
		}
		function plan(nowS) {
			const settings = deps.getSettings();
			for (const [townId, attacks] of attacksByTown) {
				const cfg = townCfg(settings, townId);
				if (!cfg) continue;
				const future = attacks.filter((a) => a.arrivalAt > nowS);
				const d = dodges.get(townId);
				if (d && d.phase !== "planned") {
					if (d.phase !== "away") continue;
					if (d.window.homeBefore || d.sentAt === null) continue;
					const w = extendWindow(d.window, future, cfg);
					if (w.homeAt > d.window.homeAt) {
						d.window = w;
						for (const a of future) if (a.arrivalAt <= w.lastImpact) d.keys.add(a.key);
						d.cancelAt = cancelTime(d.sentAt, w.homeAt, false);
						deps.report(townId, "info", `otro ataque: vuelta a las ${clockTime(w.homeAt)} (se cancela a las ${clockTime(d.cancelAt)})`);
					}
					continue;
				}
				const w = dodgeWindow(future, cfg);
				const first = future[0];
				if (!w) {
					dodges.delete(townId);
					if (!first) continue;
					const at = first.arrivalAt;
					const stay = newDodge(townId, {
						sendAt: at,
						homeAt: at,
						homeBefore: false,
						lastImpact: at,
						note: null
					});
					stay.phase = "done";
					dodges.set(townId, stay);
					deps.report(townId, "info", "el barco colono llega primero: las tropas se quedan");
					continue;
				}
				const keys = new Set(future.filter((a) => a.arrivalAt <= w.lastImpact).map((a) => a.key));
				if (d && d.window.sendAt === w.sendAt) {
					const longer = w.homeAt !== d.window.homeAt;
					d.window = w;
					d.keys = keys;
					if (longer) d.prepared = false;
				} else {
					dodges.set(townId, {
						...newDodge(townId, w),
						keys
					});
					if (w.sendAt - 300 > nowS) deps.report(townId, "info", `esquivará a las ${clockTime(w.sendAt)}; vuelta a las ${clockTime(w.homeAt)}`);
				}
			}
			for (const [townId, d] of dodges) if (d.phase === "planned" && !(attacksByTown.get(townId)?.length && townCfg(settings, townId))) dodges.delete(townId);
		}
		return {
			async update(byTown, threatened) {
				attacksByTown = byTown;
				threatenedTowns = threatened;
				if (stopped) return;
				await queue(false);
			},
			towns: () => new Set(dodges.keys()),
			stop() {
				stopped = true;
				if (timer !== null) clearTimer(timer);
				timer = null;
			},
			settled: () => pass
		};
	}
	var MILITIA_RETRY_MS = 3e5;
	var WORLD_RETRY_MS = 3e5;
	function ignoreReason(attacker, cfg, ownAllianceId) {
		if (!attacker) return null;
		const has = (list, name) => name !== null && list.some((n) => n.toLowerCase() === name.toLowerCase());
		if (has(cfg.ignorePlayers, attacker.playerName)) return "jugador ignorado";
		if (has(cfg.ignoreAlliances, attacker.allianceName)) return "alianza ignorada";
		if (cfg.ignoreOwnAlliance && ownAllianceId !== null && attacker.allianceId === ownAllianceId) return "es de tu alianza";
		return null;
	}
	function militiaTargets(attacks, nowS, seconds, townIds) {
		const chosen = new Set(townIds);
		const out = new Map();
		for (const a of attacks) {
			if (a.ignored || !chosen.has(a.targetTownId)) continue;
			const eta = a.arrivalAt - nowS;
			if (eta <= 0 || eta > seconds) continue;
			const first = out.get(a.targetTownId);
			if (first === void 0 || a.arrivalAt < first) out.set(a.targetTownId, a.arrivalAt);
		}
		return out;
	}
	function attackSpellTime(attack, cfg) {
		if (cfg.spellWhen === "end") return attack.arrivalAt - cfg.spellSeconds;
		return attack.startedAt === null ? null : Math.floor((attack.startedAt + attack.arrivalAt) / 2);
	}
	function backsnipeArrival(attack, offset) {
		const { arrivalAt, startedAt } = attack;
		if (startedAt === null || startedAt >= arrivalAt) return null;
		return arrivalAt + (arrivalAt - startedAt) + offset;
	}
	var SUMMARY$6 = "summary";
	function clock(epochS) {
		const d = new Date(epochS * 1e3);
		const p = (n) => String(n).padStart(2, "0");
		return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
	}
	function createDefenseModule(deps) {
		const { api, win, logger } = deps;
		const now = deps.now ?? (() => new Date());
		let views = [];
		const results = new Map();
		const militiaRetry = new Map();
		const spellDone = new Set();
		const backsnipeDone = new Set();
		let world = null;
		let worldRetryAt = null;
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: key === SUMMARY$6 ? void 0 : name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, {
				...options,
				alert: "combat"
			});
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const summary = (level, text) => {
			record(SUMMARY$6, 0, "Defensa", level, text);
		};
		const dodge = createDodgeEngine({
			api,
			win,
			logger,
			getSettings: deps.getSettings,
			isDryRun: deps.isDryRun,
			isSafetyStopped: deps.isSafetyStopped,
			claim: deps.claim,
			report: (townId, level, text) => {
				record(`dodge:${String(townId)}`, townId, townName(win, townId), level, text);
			},
			notify,
			setTimer: deps.setTimer,
			clearTimer: deps.clearTimer,
			random: deps.random
		});
		async function lookup() {
			const at = now().getTime();
			if (world && at - world.at < 36e5) return world;
			if (worldRetryAt !== null && at < worldRetryAt) return world;
			try {
				const [towns, players, alliances] = [
					await api.getWorldTowns(),
					await api.getPlayers(),
					await api.getAlliances()
				];
				world = {
					at,
					towns: new Map(towns.map((t) => [t.id, t.playerId])),
					players: new Map(players.map((p) => [p.id, {
						name: p.name,
						allianceId: p.allianceId
					}])),
					alliances: new Map(alliances.map((a) => [a.id, a.name]))
				};
				worldRetryAt = null;
				return world;
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				if (worldRetryAt === null) logger.warn(`defensa: no se leen los datos del mundo (${err instanceof Error ? err.message : String(err)}); no se sabe quién ataca`);
				worldRetryAt = at + WORLD_RETRY_MS;
				return world;
			}
		}
		function attackerOf(data, originTownId) {
			if (!data || originTownId === null) return null;
			const playerId = data.towns.get(originTownId);
			if (playerId === void 0) return null;
			if (playerId === null) return {
				playerId: null,
				playerName: null,
				allianceId: null,
				allianceName: null
			};
			const player = data.players.get(playerId);
			const allianceId = player?.allianceId ?? null;
			return {
				playerId,
				playerName: player?.name ?? null,
				allianceId,
				allianceName: allianceId === null ? null : data.alliances.get(allianceId) ?? null
			};
		}
		function queueBacksnipes(settings, dryRun, keys) {
			const live = new Set(views.map((v) => v.key));
			for (const key of [...backsnipeDone]) if (!live.has(key)) backsnipeDone.delete(key);
			const cfg = settings.defense;
			for (const v of views) {
				if (v.ignored !== null) continue;
				const town = cfg.dodgeTowns.find((t) => t.townId === v.targetTownId && t.backsnipe);
				if (!town) continue;
				const key = `backsnipe:${String(v.targetTownId)}`;
				keys.add(key);
				if (backsnipeDone.has(v.key)) continue;
				const say = (level, text) => {
					record(key, v.targetTownId, v.targetName, level, text);
				};
				const done = (level, text) => {
					backsnipeDone.add(v.key);
					say(level, text);
				};
				const when = `el ataque de las ${clock(v.arrivalAt)}`;
				const toWhen = `al ataque de las ${clock(v.arrivalAt)}`;
				if (v.attacker?.playerId == null) {
					say("warn", `backsnipe: no se sabe quién manda ${when}`);
					continue;
				}
				if (v.originTownId === null || v.commandId === null) {
					done("warn", `backsnipe: no se lee la ciudad o el id del ataque de las ${clock(v.arrivalAt)}`);
					continue;
				}
				const at = backsnipeArrival(v, town.backsnipeOffset);
				if (at === null) {
					done("warn", `backsnipe: no se sabe cuándo salió ${when}`);
					continue;
				}
				const units = dodgeCommands(townUnits(win, v.targetTownId) ?? {}, {
					land: town.land,
					fleet: town.fleet,
					separate: false,
					units: "offense"
				}, cfg.mixedUnits)[0];
				if (!units) {
					done("info", `backsnipe: no hay tropas de ataque para responder ${toWhen}`);
					continue;
				}
				const what = `backsnipe a ${v.attacker.playerName ?? `#${String(v.attacker.playerId)}`} (#${String(v.originTownId)}) para las ${clock(at)}`;
				const id = `bs-${String(v.commandId)}`;
				if (settings.timedCommands.items.some((i) => i.id === id)) {
					backsnipeDone.add(v.key);
					continue;
				}
				if (dryRun) {
					done("info", `simulación: pondría en la cola un ${what}`);
					continue;
				}
				if (!settings.timedCommands.enabled) {
					say("warn", `${what}: activa Ataques cronometrados para que se envíe`);
					continue;
				}
				if (settings.timedCommands.items.length >= 50) {
					say("warn", `${what}: la cola de Ataques cronometrados está llena`);
					continue;
				}
				deps.update((st) => {
					if (st.timedCommands.items.some((i) => i.id === id)) return;
					st.timedCommands.items.push({
						id,
						enabled: true,
						type: "attack",
						fromTownId: v.targetTownId,
						targetTownId: v.originTownId,
						units,
						arrivalAt: at,
						early: 0,
						late: 5,
						travelSeconds: null,
						powerId: null,
						tuning: false
					});
				});
				done("success", `${what}: en la cola de Ataques cronometrados`);
			}
		}
		async function castSpells(cfg, nowS, dryRun, keys) {
			const live = new Set(views.map((v) => v.key));
			for (const key of [...spellDone]) if (!live.has(key)) spellDone.delete(key);
			const powerId = cfg.spellPowerId;
			if (!cfg.spellEnabled || powerId === null) return 0;
			const power = powerList(win).find((p) => p.id === powerId)?.name ?? powerId;
			const chosen = new Set(cfg.spellTownIds);
			const told = new Set();
			let casts = 0;
			for (const v of views) {
				if (v.ignored !== null || !chosen.has(v.targetTownId)) continue;
				const townId = v.targetTownId;
				const key = `spell:${String(townId)}`;
				keys.add(key);
				if (spellDone.has(v.key) || v.arrivalAt - nowS <= 5) continue;
				const say = (level, text) => {
					if (told.has(townId) && level === "info") return;
					told.add(townId);
					record(key, townId, v.targetName, level, text);
				};
				const what = `${power} sobre el ataque de las ${clock(v.arrivalAt)}`;
				if (v.commandId === null) {
					say("warn", `no se lee el id del ataque: no se puede lanzar ${what}`);
					continue;
				}
				const at = attackSpellTime(v, cfg);
				if (at === null) {
					say("warn", `no se sabe cuándo salió el ataque: no se puede lanzar ${what} a mitad del trayecto`);
					continue;
				}
				if (nowS < at) {
					say("info", `lanzará ${what} a las ${clock(at)}`);
					continue;
				}
				if (casts >= 5) continue;
				const info = powerStatic(win, powerId);
				const favor = info?.godId ? godFavor(win)?.[info.godId] : void 0;
				if (info && favor !== void 0 && favor < info.favor) {
					say("warn", `falta favor para ${what}`);
					continue;
				}
				if (dryRun) {
					spellDone.add(v.key);
					say("info", `simulación: lanzaría ${what}`);
					continue;
				}
				if (deps.isSafetyStopped?.() === true) break;
				spellDone.add(v.key);
				if (deps.claim && !await deps.claim(`spell:${String(v.commandId)}`)) {
					say("info", `otra pestaña del juego lanza ${what}`);
					continue;
				}
				try {
					await api.castPowerOnCommand(townId, v.commandId, powerId);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					say("error", `error al lanzar ${what}: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				casts += 1;
				say("success", `lanzado ${what}`);
			}
			return casts;
		}
		async function run(settings) {
			const cfg = settings.defense;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) {
				if (dodge.towns().size > 0) await dodge.update(new Map(), new Set());
				return 0;
			}
			const nowS = api.serverNow();
			if (nowS === null) {
				summary("warn", "defensa: aún no se sabe la hora del servidor");
				notify();
				return 0;
			}
			const own = ownTownIds(win);
			const attacks = incomingAttacks(win, own);
			if (attacks === null) {
				views = [];
				summary("warn", "defensa: no se leen los movimientos de tropas");
				notify();
				return 0;
			}
			const data = attacks.length > 0 ? await lookup() : world;
			const ownAllianceId = data?.players.get(deps.playerId)?.allianceId ?? null;
			views = attacks.map((a, i) => {
				const attacker = attackerOf(data, a.originTownId);
				return {
					key: a.commandId === null ? `i${String(i)}` : String(a.commandId),
					targetTownId: a.targetTownId,
					targetName: townName(win, a.targetTownId),
					originTownId: a.originTownId,
					commandId: a.commandId,
					arrivalAt: a.arrivalAt,
					startedAt: a.startedAt,
					attacker,
					colonyShip: a.colonyShip,
					ignored: ignoreReason(attacker, cfg, ownAllianceId)
				};
			});
			const targets = militiaTargets(views.map((v) => ({
				targetTownId: v.targetTownId,
				arrivalAt: v.arrivalAt,
				ignored: v.ignored !== null
			})), nowS, cfg.militiaSeconds, cfg.militiaTownIds);
			const keys = new Set([SUMMARY$6]);
			const dryRun = deps.isDryRun();
			let actions = 0;
			for (const [townId, arrivalAt] of targets) {
				const name = townName(win, townId);
				const key = `militia:${String(townId)}`;
				keys.add(key);
				const when = `el ataque llega a las ${clock(arrivalAt)}`;
				if ((townUnits(win, townId)?.militia ?? 0) > 0) {
					record(key, townId, name, "info", `ya tiene milicia; ${when}`);
					continue;
				}
				const levels = buildingLevels(win, townId);
				if (levels && (levels.farm ?? 0) < 1) {
					record(key, townId, name, "warn", `no puede pedir milicia sin Granja; ${when}`);
					continue;
				}
				if ((militiaRetry.get(townId) ?? 0) > now().getTime()) continue;
				if (dryRun) {
					record(key, townId, name, "info", `simulación: pediría milicia; ${when}`);
					continue;
				}
				if (deps.isSafetyStopped?.() === true) break;
				militiaRetry.set(townId, now().getTime() + MILITIA_RETRY_MS);
				if (deps.claim && !await deps.claim(`militia:${String(townId)}:${String(arrivalAt)}`)) {
					record(key, townId, name, "info", `otra pestaña del juego pide la milicia; ${when}`);
					continue;
				}
				try {
					await api.requestMilitia(townId);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					record(key, townId, name, "error", `error al pedir milicia: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				actions += 1;
				record(key, townId, name, "success", `milicia pedida; ${when}`);
			}
			actions += await castSpells(cfg, nowS, dryRun, keys);
			queueBacksnipes(settings, dryRun, keys);
			const byTown = new Map();
			for (const v of views) {
				if (v.ignored !== null || v.arrivalAt <= nowS) continue;
				const list = byTown.get(v.targetTownId) ?? [];
				list.push({
					key: v.key,
					arrivalAt: v.arrivalAt,
					colonyShip: v.colonyShip
				});
				byTown.set(v.targetTownId, list);
			}
			await dodge.update(byTown, new Set(byTown.keys()));
			for (const townId of dodge.towns()) keys.add(`dodge:${String(townId)}`);
			for (const key of [...results.keys()]) if (!keys.has(key)) results.delete(key);
			const n = views.length;
			const ignored = views.filter((v) => v.ignored !== null).length;
			if (n === 0) summary("info", "defensa: no viene ningún ataque");
			else {
				const extra = ignored > 0 ? ` (${String(ignored)} ignorados)` : "";
				summary("warn", `defensa: ${n === 1 ? "viene 1 ataque" : `vienen ${String(n)} ataques`}${extra}`);
			}
			notify();
			return actions;
		}
		return {
			task: {
				name: "defensa",
				phase: "defense",
				category: "combat",
				run
			},
			attacks: () => views,
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			},
			settled: () => dodge.settled()
		};
	}
	function createKillpointsLedger(now = () => new Date()) {
		let state = null;
		function pending(kp) {
			if (state && (kp.used >= state.used + state.points || now().getTime() - state.at > 18e5)) state = null;
			return state?.points ?? 0;
		}
		return {
			pending,
			available: (kp) => kp.att + kp.def - kp.used - pending(kp),
			spend(kp, points) {
				const before = pending(kp);
				state = {
					used: state?.used ?? kp.used,
					points: before + points,
					at: now().getTime()
				};
			}
		};
	}
	var FESTIVAL_ORDER = [
		"triumph",
		"theater",
		"party"
	];
	var FESTIVAL_COSTS = {
		party: {
			wood: 15e3,
			stone: 18e3,
			iron: 15e3
		},
		theater: {
			wood: 1e4,
			stone: 12e3,
			iron: 1e4
		}
	};
	var FESTIVAL_RETRY_MS = 3e5;
	var FESTIVAL_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	function planFestivals(towns, points, settings, limit = 10) {
		const steps = [];
		let free = points;
		const left = new Map();
		for (const type of FESTIVAL_ORDER) {
			if (!settings[type]) continue;
			for (const town of towns) {
				if (steps.length >= limit) return steps;
				if (town.busy.has(type)) continue;
				if (type === "triumph") {
					if (free === null || free < Math.max(settings.triumphMinPoints, 300)) continue;
					free -= 300;
					steps.push({
						townId: town.townId,
						type
					});
					continue;
				}
				if (!town.resources || !town.levels || town.waitingBuild) continue;
				if (type === "party" && (town.levels.academy ?? 0) < 30) continue;
				if (type === "theater" && (town.levels.theater ?? 0) < 1) continue;
				const { wood, stone, iron } = town.resources;
				const res = left.get(town.townId) ?? {
					wood,
					stone,
					iron
				};
				const cost = FESTIVAL_COSTS[type];
				if (RESOURCE_KINDS.some((k) => res[k] < cost[k])) continue;
				left.set(town.townId, {
					wood: res.wood - cost.wood,
					stone: res.stone - cost.stone,
					iron: res.iron - cost.iron
				});
				steps.push({
					townId: town.townId,
					type
				});
			}
		}
		return steps;
	}
	var FESTIVAL_NAMES = {
		triumph: "marcha triunfal",
		theater: "teatro",
		party: "festival"
	};
	var SUMMARY$5 = "summary";
	function createFestivalsModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const ledger = deps.ledger ?? createKillpointsLedger(now);
		const results = new Map();
		const retryAfter = new Map();
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: key === SUMMARY$5 ? void 0 : name,
				muted: level === "info",
				tab: level === "error" ? void 0 : "festivals"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const stop = (level, text) => {
			record(SUMMARY$5, 0, "Festivales", level, text);
			notify();
			return 0;
		};
		async function run(settings) {
			const cfg = settings.festivals;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) return 0;
			if (!cfg.party && !cfg.theater && !cfg.triumph) return stop("info", "festivales: ningún tipo marcado");
			const active = activeCelebrations(win);
			if (active === null) return stop("warn", "festivales: no se leen los festivales en curso, no se lanza ninguno");
			const at = now().getTime();
			const own = ownTownIds(win);
			const chosen = new Set(cfg.townIds);
			const needs = cfg.party || cfg.theater ? townBuildNeeds(win, settings, own) : new Map();
			const towns = own.filter((id) => chosen.has(id)).map((townId) => {
				const busy = new Set();
				for (const c of active) if (c.townId === townId) busy.add(c.type);
				for (const type of FESTIVAL_ORDER) if ((retryAfter.get(`${townId}:${type}`) ?? 0) > at) busy.add(type);
				return {
					townId,
					levels: buildingLevels(win, townId),
					resources: townResources(win, townId),
					busy,
					waitingBuild: (needs.get(townId)?.wants ?? null) !== null
				};
			});
			if (towns.length === 0) return stop("info", "festivales: ninguna ciudad elegida");
			const kp = cfg.triumph ? playerKillpoints(win) : null;
			const steps = planFestivals(towns, kp === null ? null : ledger.available(kp), cfg);
			if (steps.length === 0) {
				const why = cfg.triumph && kp === null ? " (no se leen los puntos de batalla)" : "";
				return stop("info", `festivales: nada que lanzar${why}`);
			}
			const dryRun = deps.isDryRun();
			let actions = 0;
			let attempts = 0;
			const keys = new Set([SUMMARY$5]);
			for (const { townId, type } of steps) {
				const name = townName(win, townId);
				const key = `${townId}:${type}`;
				keys.add(key);
				const what = FESTIVAL_NAMES[type];
				if (dryRun) {
					record(key, townId, name, "info", `simulación: lanzaría ${what}`);
					continue;
				}
				if (attempts > 0) await sleep(Math.round(FESTIVAL_PAUSE_MS.min + random() * (FESTIVAL_PAUSE_MS.max - FESTIVAL_PAUSE_MS.min)));
				if (deps.isSafetyStopped?.() === true) break;
				attempts += 1;
				retryAfter.set(key, now().getTime() + FESTIVAL_RETRY_MS);
				try {
					await api.startFestival(townId, type);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					record(key, townId, name, "error", `error al lanzar ${what}: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				if (type === "triumph" && kp !== null) ledger.spend(kp, 300);
				actions += 1;
				record(key, townId, name, "success", `lanzado ${what}`);
			}
			for (const key of [...results.keys()]) if (!keys.has(key)) results.delete(key);
			const n = steps.length;
			stop("info", dryRun ? `simulación: ${n} ${n === 1 ? "festival" : "festivales"}` : `festivales: lanzados ${actions} de ${n}`);
			return actions;
		}
		return {
			task: {
				name: "festivales",
				phase: "festivals",
				category: "economy",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var ROLES = {
		offense: ["offense", "mixed"],
		defense: ["defense", "mixed"],
		all: [
			"offense",
			"defense",
			"mixed"
		]
	};
	function pickGroupUnits(have, mode) {
		const out = {};
		let land = false;
		for (const unit of UNIT_IDS) {
			const n = Math.floor(have[unit] ?? 0);
			if (n <= 0 || !ROLES[mode].includes(UNIT_ROLES[unit])) continue;
			out[unit] = n;
			if (!isNavalUnit(unit) && !FLYING_UNIT_IDS.includes(unit)) land = true;
		}
		if (land) for (const unit of UNIT_IDS) {
			const n = Math.floor(have[unit] ?? 0);
			if (UNIT_ROLES[unit] === "transport" && n > 0) out[unit] = n;
		}
		return out;
	}
	function planGroup(towns, nowS, arrivalAt) {
		const skips = [];
		const ready = [];
		for (const town of towns) {
			const skip = (reason) => {
				skips.push({
					townId: town.townId,
					name: town.name,
					reason
				});
			};
			if (town.units === null) skip("no se leen sus tropas");
			else if (Object.keys(town.units).length === 0) skip("no tiene tropas de ese tipo");
			else if (town.travelS === null) skip("no se lee la duración del viaje");
			else ready.push({
				town,
				units: town.units,
				travelS: town.travelS
			});
		}
		const earliest = nowS + 60 + 13;
		const arrival = arrivalAt ?? (ready.length > 0 ? Math.ceil(earliest + Math.max(...ready.map((r) => r.travelS))) : null);
		const rows = [];
		if (arrival !== null) for (const { town, units, travelS } of ready) {
			const sendAt = arrival - travelS;
			if (sendAt < earliest) {
				skips.push({
					townId: town.townId,
					name: town.name,
					reason: "no llega a tiempo"
				});
				continue;
			}
			rows.push({
				townId: town.townId,
				name: town.name,
				units,
				travelS,
				sendAt
			});
		}
		rows.sort((a, b) => a.sendAt - b.sendAt || a.townId - b.townId);
		return {
			arrivalAt: rows.length > 0 ? arrival : null,
			rows,
			skips
		};
	}
	function createGroupPlanner(deps) {
		const { api, win } = deps;
		return { async plan(request) {
			const settings = deps.getSettings();
			const own = ownTownIds(win);
			const ids = Object.entries(settings.townProfiles).filter(([, profile]) => profile === request.profileId).map(([id]) => Number(id)).filter((id) => id !== request.targetTownId && (own.length === 0 || own.includes(id))).sort((a, b) => a - b);
			const towns = [];
			for (const townId of ids) {
				const have = townUnits(win, townId);
				const units = have ? pickGroupUnits(have, request.units) : null;
				let travelS = null;
				if (units && Object.keys(units).length > 0) try {
					travelS = travelTimeFromAttackInfo(await api.getAttackInfo(townId, request.targetTownId), Object.keys(units));
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
				}
				towns.push({
					townId,
					name: townName(win, townId),
					units,
					travelS
				});
			}
			const nowS = api.serverNow();
			if (nowS === null) throw new Error("aún no se sabe la hora del servidor");
			return planGroup(towns, nowS, request.arrivalAt);
		} };
	}
	var KNOWN_NOT_ENEMY = new Set(["neutral"]);
	function payRatio(offer) {
		if (offer.offer === null || offer.demand === null || offer.offer <= 0) return null;
		return Math.round(offer.demand / offer.offer * 100) / 100;
	}
	function partnerAllowed(offer, ctx) {
		const own = ctx.allianceId !== null && offer.allianceId === ctx.allianceId;
		switch (ctx.settings.partners) {
			case "all": return null;
			case "alliance":
			case "alliancePacts": return own ? null : "partner";
			case "notEnemies":
				if (own) return null;
				return offer.pactStatus !== null && KNOWN_NOT_ENEMY.has(offer.pactStatus) ? null : "unknownPact";
		}
	}
	function judgeOffer(offer, town, ctx) {
		const pay = payRatio(offer);
		const verdict = (reason) => ({
			offer,
			pay,
			reason
		});
		const got = offer.offerType;
		const paid = offer.demandType;
		if (!isResourceKind(got) || !isResourceKind(paid) || got === paid || pay === null) return verdict("type");
		const amount = offer.offer ?? 0;
		const cost = offer.demand ?? 0;
		const partner = partnerAllowed(offer, ctx);
		if (partner) return verdict(partner);
		const cfg = ctx.settings;
		if (offer.durationSeconds === null || offer.durationSeconds > cfg.maxDeliveryMinutes * 60) return verdict("delivery");
		if (amount < cfg.minTrade) return verdict("minTrade");
		const { res } = town;
		if (res[got] >= res[paid] || res[got] + amount > res[paid] - cost) return verdict("balance");
		if (pay > (res[paid] >= .9 * res.storage ? cfg.overflowPayRatio : cfg.maxPayRatio)) return verdict("ratio");
		if (town.capacity === null || cost > town.capacity) return verdict("capacity");
		return verdict(null);
	}
	function planAccepts(towns, ctx) {
		const work = towns.map((t) => ({
			townId: t.townId,
			offers: t.offers,
			state: {
				res: { ...t.state.res },
				capacity: t.state.capacity
			}
		}));
		const out = [];
		const used = new Set();
		while (out.length < ctx.settings.tradesPerRound) {
			let best = null;
			for (const town of work) for (const offer of town.offers) {
				if (used.has(offer.id)) continue;
				const v = judgeOffer(offer, town.state, ctx);
				if (v.reason !== null) continue;
				if (!best || (v.pay ?? Infinity) < (best.verdict.pay ?? Infinity)) best = {
					town,
					verdict: v
				};
			}
			if (!best) break;
			out.push({
				townId: best.town.townId,
				verdict: best.verdict
			});
			const { offer } = best.verdict;
			used.add(offer.id);
			const { state } = best.town;
			const got = offer.offerType;
			const paid = offer.demandType;
			state.res[got] += offer.offer ?? 0;
			state.res[paid] -= offer.demand ?? 0;
			if (state.capacity !== null) state.capacity -= offer.demand ?? 0;
		}
		return out;
	}
	function planBalance(state, settings) {
		const { res } = state;
		let most = "wood";
		let least = "wood";
		for (const kind of RESOURCE_KINDS) {
			if (res[kind] > res[most]) most = kind;
			if (res[kind] < res[least]) least = kind;
		}
		const gap = res[most] - res[least];
		if (gap < 2 * Math.max(settings.minTrade, 1)) return null;
		const capacity = state.capacity ?? 0;
		const amount = Math.floor(Math.min(gap / 2, capacity) / 100) * 100;
		if (amount <= 0 || amount < settings.minTrade) return null;
		return {
			offerType: most,
			offer: amount,
			demandType: least,
			demand: amount
		};
	}
	var amountText = (kind, n) => resourcesText({
		...zeroResources(),
		[kind]: n
	});
	function offerText(v) {
		const o = v.offer;
		const got = o.offerType;
		const paid = o.demandType;
		const who = o.playerName ?? (o.playerId !== null ? `#${String(o.playerId)}` : "?");
		const mins = o.durationSeconds === null ? "?" : String(Math.ceil(o.durationSeconds / 60));
		const pay = v.pay === null ? "?" : v.pay.toFixed(2).replace(".", ",");
		return `${amountText(got, o.offer ?? 0)} por ${amountText(paid, o.demand ?? 0)} de ${who} (1:${pay}; ${mins} min)`;
	}
	function createMarketModule(deps) {
		const now = deps.now ?? Date.now;
		let lastRun = -Infinity;
		let cursor = 0;
		let warnedPublish = false;
		async function allianceId() {
			return (await deps.api.getPlayers()).find((p) => p.id === deps.playerId)?.allianceId ?? null;
		}
		function townState(townId) {
			const res = townResources(deps.win, townId);
			return res ? {
				res,
				capacity: townTradeCapacity(deps.win, townId)
			} : null;
		}
		async function readOffers(townId, cfg) {
			const { offers } = await deps.api.getMarketOffers(townId, { maxDeliveryTime: cfg.maxDeliveryMinutes * 60 });
			return offers;
		}
		function roundTowns() {
			const all = ownTownIds(deps.win).filter((id) => (buildingLevels(deps.win, id)?.market ?? 0) > 0);
			if (all.length <= 5) return all;
			const start = cursor % all.length;
			cursor = start + 5;
			return [...all, ...all].slice(start, start + 5);
		}
		async function run(settings) {
			const cfg = settings.market;
			if (!cfg.enabled && !cfg.balance) return 0;
			if (deps.isSafetyStopped?.() === true) return 0;
			const dryRun = deps.isDryRun();
			if (!dryRun && cfg.balance) {
				if (!warnedPublish) {
					warnedPublish = true;
					deps.logger.warn("mercado: publicar ofertas espera una captura (instrucciones.md §3, A.5); en modo real no se publica nada", {
						tab: "market",
						muted: true
					});
				}
			} else warnedPublish = false;
			if (!dryRun && !cfg.enabled) return 0;
			if (now() - lastRun < 9e5) return 0;
			lastRun = now();
			try {
				const towns = roundTowns();
				if (towns.length === 0) return 0;
				const ctx = {
					settings: cfg,
					allianceId: await allianceId()
				};
				const read = [];
				for (const townId of towns) {
					const state = townState(townId);
					if (!state) continue;
					read.push({
						townId,
						state,
						offers: cfg.enabled ? await readOffers(townId, cfg) : []
					});
				}
				let accepted = 0;
				if (cfg.enabled) for (const { townId, verdict } of planAccepts(read, ctx)) {
					const town = townName(deps.win, townId);
					if (dryRun) {
						deps.logger.info(`simulación: aceptaría ${offerText(verdict)}`, {
							town,
							tab: "market"
						});
						continue;
					}
					if (deps.isSafetyStopped?.() === true) break;
					try {
						await deps.api.acceptMarketOffer(townId, verdict.offer, verdict.offer.demand ?? 0);
					} catch (err) {
						if (err instanceof SafetyStopError) throw err;
						deps.logger.error(`mercado: no se aceptó ${offerText(verdict)} (${err instanceof Error ? err.message : String(err)})`, {
							town,
							tab: "market"
						});
						continue;
					}
					accepted += 1;
					deps.logger.success(`aceptada ${offerText(verdict)}`, {
						town,
						tab: "market"
					});
				}
				const first = read[0];
				if (dryRun && cfg.balance && first) {
					const own = await deps.api.getOwnMarketOffers(first.townId);
					if ((own.offersTotal ?? own.offers.length) === 0) for (const { townId, state } of read) {
						const plan = planBalance(state, cfg);
						if (!plan) continue;
						deps.logger.info(`simulación: publicaría ${amountText(plan.offerType, plan.offer)} por ${amountText(plan.demandType, plan.demand)}`, {
							town: townName(deps.win, townId),
							tab: "market"
						});
						break;
					}
				}
				return accepted;
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				deps.logger.warn(`mercado: no se lee el mercado (${err instanceof Error ? err.message : String(err)})`, {
					tab: "market",
					muted: true
				});
				return 0;
			}
		}
		return {
			task: {
				name: "mercado",
				phase: "market",
				category: "economy",
				run
			},
			async preview(townId, settings) {
				const cfg = settings.market;
				const state = townState(townId);
				const [offers, ally, own] = await Promise.all([
					readOffers(townId, cfg),
					allianceId(),
					deps.api.getOwnMarketOffers(townId)
				]);
				const ctx = {
					settings: cfg,
					allianceId: ally
				};
				return {
					townId,
					townName: townName(deps.win, townId),
					verdicts: state ? offers.map((o) => judgeOffer(o, state, ctx)) : offers.map((offer) => ({
						offer,
						pay: payRatio(offer),
						reason: "resources"
					})),
					balance: state ? planBalance(state, cfg) : null,
					ownOffers: own.offersTotal ?? own.offers.length
				};
			}
		};
	}
	var MISSION_RETRY_MS = 3e5;
	var MISSION_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	function planMissions(input, settings, limit = 5) {
		const steps = [];
		const skips = [];
		const islandIds = new Set();
		for (const q of input.island) {
			if (q.id !== null) islandIds.add(q.id);
			if (q.progressableId !== null) islandIds.add(q.progressableId);
		}
		if (settings.beginner && input.beginner) for (const q of input.beginner) {
			if (q.state !== "satisfied" || islandIds.has(q.id) || q.progressableId === null) continue;
			if (typeof q.progressableId === "number" && islandIds.has(q.progressableId)) continue;
			const key = `b:${String(q.id)}`;
			if (input.waiting.has(key)) continue;
			if (input.currentTownId === null) {
				skips.push({
					key,
					text: `misión de principiante ${String(q.progressableId)}: no se sabe la ciudad abierta en el juego`
				});
				continue;
			}
			steps.push({
				kind: "beginner",
				key,
				townId: input.currentTownId,
				id: q.id,
				progressableId: q.progressableId
			});
		}
		if (settings.islandRewards) for (const q of input.island) {
			if (q.isClaimable !== true || q.progressableId === null) continue;
			const key = `i:${String(q.progressableId)}`;
			if (input.waiting.has(key)) continue;
			const island = q.island;
			const what = `misión de isla ${String(q.progressableId)}`;
			if (island === null) {
				skips.push({
					key,
					text: `${what}: no se lee su isla`
				});
				continue;
			}
			const town = input.towns.find((t) => t.island?.x === island.x && t.island.y === island.y);
			if (!town) {
				skips.push({
					key,
					text: `${what}: no hay ninguna ciudad tuya en su isla`
				});
				continue;
			}
			steps.push({
				kind: "island",
				key,
				townId: town.townId,
				progressableId: q.progressableId
			});
		}
		return {
			steps: steps.slice(0, limit),
			skips
		};
	}
	function describe(step) {
		return step.kind === "beginner" ? `la misión de principiante ${String(step.progressableId)}` : `la recompensa de la misión de isla ${String(step.progressableId)}`;
	}
	var SUMMARY$4 = "summary";
	function createMissionsModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const results = new Map();
		const retryAfter = new Map();
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: townId === 0 ? void 0 : name,
				muted: level === "info",
				tab: level === "error" ? void 0 : "missions"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const summary = (level, text) => {
			record(SUMMARY$4, 0, "Misiones", level, text);
		};
		async function run(settings) {
			const cfg = settings.missions;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) return 0;
			const at = now().getTime();
			for (const [key, until] of retryAfter) if (until <= at) retryAfter.delete(key);
			const keys = new Set([SUMMARY$4, ...retryAfter.keys()]);
			const finish = () => {
				for (const key of [...results.keys()]) if (!keys.has(key)) results.delete(key);
				notify();
			};
			if (!cfg.beginner && !cfg.islandRewards) {
				summary("info", "misiones: ningún tipo marcado");
				finish();
				return 0;
			}
			const beginner = cfg.beginner ? beginnerQuests(win) : [];
			if (beginner === null) {
				keys.add("beginner");
				record("beginner", 0, "Misiones", "warn", "misiones de principiante: no se leen, no se cobra ninguna");
			}
			const own = ownTownIds(win);
			const { steps, skips } = planMissions({
				beginner,
				island: cfg.islandRewards ? islandQuests(win) : [],
				currentTownId: readCurrentTownId(win),
				towns: own.map((townId) => ({
					townId,
					island: townIsland(win, townId)
				})),
				waiting: new Set(retryAfter.keys())
			}, cfg);
			for (const { key, text } of skips) {
				keys.add(key);
				record(key, 0, "Misiones", "warn", `${text}, no se cobra`);
			}
			if (steps.length === 0) {
				summary("info", "misiones: nada que cobrar");
				finish();
				return 0;
			}
			const dryRun = deps.isDryRun();
			let actions = 0;
			let attempts = 0;
			for (const step of steps) {
				const name = townName(win, step.townId);
				keys.add(step.key);
				const what = describe(step);
				if (dryRun) {
					const verb = step.kind === "beginner" ? "cobraría" : "guardaría en el inventario";
					record(step.key, step.townId, name, "info", `simulación: ${verb} ${what}`);
					continue;
				}
				if (attempts > 0) await sleep(Math.round(MISSION_PAUSE_MS.min + random() * (MISSION_PAUSE_MS.max - MISSION_PAUSE_MS.min)));
				if (deps.isSafetyStopped?.() === true) break;
				attempts += 1;
				retryAfter.set(step.key, now().getTime() + MISSION_RETRY_MS);
				try {
					if (step.kind === "beginner") await api.closeBeginnerQuest(step.townId, step.id, step.progressableId);
					else await api.claimIslandQuestReward(step.townId, step.progressableId);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					const why = err instanceof Error ? err.message : String(err);
					const verb = step.kind === "beginner" ? "cobrar" : "guardar";
					record(step.key, step.townId, name, "error", `error al ${verb} ${what}: ${why}`);
					continue;
				}
				actions += 1;
				const done = step.kind === "beginner" ? "cobrada" : "guardada en el inventario";
				record(step.key, step.townId, name, "success", `${done} ${what}`);
			}
			const n = steps.length;
			summary("info", dryRun ? `simulación: ${String(n)} ${n === 1 ? "misión" : "misiones"}` : `misiones: cobradas ${String(actions)} de ${String(n)}`);
			finish();
			return actions;
		}
		return {
			task: {
				name: "misiones",
				phase: "missions",
				category: "economy",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var SPELL_RECHECK_MS = 3e4;
	var SPELL_NO_CLOCK_MS = 5e3;
	function nextSpellTime(item, after) {
		if (item.at >= after) return item.at;
		if (item.repeatMinutes <= 0) return null;
		const step = item.repeatMinutes * 60;
		return item.at + Math.ceil((after - item.at) / step) * step;
	}
	function createScheduledSpellsModule(deps) {
		const { api, win, logger } = deps;
		const setTimer = deps.setTimer ?? ((fn, ms) => setTimeout(fn, ms));
		const clearTimer = deps.clearTimer ?? ((id) => {
			clearTimeout(id);
		});
		const done = new Map();
		const results = new Map();
		const listeners = new Set();
		let timer = null;
		let running = false;
		let again = false;
		let stopped = false;
		let warnedClock = false;
		const notify = () => {
			for (const l of listeners) l();
		};
		function arm(ms) {
			if (timer !== null) clearTimer(timer);
			if (stopped) return;
			timer = setTimer(() => {
				timer = null;
				check();
			}, Math.max(0, Math.min(ms, SPELL_RECHECK_MS)));
		}
		function label(item) {
			const target = ownTownIds(win).includes(item.targetTownId) ? townName(win, item.targetTownId) : `ciudad ${String(item.targetTownId)}`;
			return `${item.powerId} sobre ${target}`;
		}
		function set(item, level, text, next) {
			const previous = results.get(item.id);
			results.set(item.id, {
				id: item.id,
				level,
				text,
				next
			});
			if (previous?.text === text && level !== "success") return;
			const line = `hechizo programado: ${text}`;
			if (level === "success") logger.success(line, { alert: "combat" });
			else if (level === "warn") logger.warn(line);
			else if (level === "error") logger.error(line);
			else logger.info(line, { muted: true });
		}
		function casterTown(item) {
			const own = ownTownIds(win);
			if (own.includes(item.targetTownId)) return item.targetTownId;
			const god = powerStatic(win, item.powerId)?.godId ?? null;
			if (god !== null) return own.find((id) => townGod(win, id) === god) ?? null;
			return readCurrentTownId(win);
		}
		async function cast(item, when, next) {
			const what = label(item);
			const from = casterTown(item);
			if (from === null) {
				set(item, "error", `${what}: no tienes ninguna ciudad con su dios, no se lanza`, next);
				return;
			}
			const info = powerStatic(win, item.powerId);
			const favor = info?.godId ? godFavor(win)?.[info.godId] : void 0;
			if (info && favor !== void 0 && favor < info.favor) {
				set(item, "error", `${what}: falta favor (${String(Math.floor(favor))} de ${String(info.favor)}), no se lanza`, next);
				return;
			}
			if (deps.isDryRun()) {
				set(item, "info", `simulación: lanzaría ${what}`, next);
				return;
			}
			try {
				await api.castPowerOnTown(from, item.powerId, item.targetTownId);
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				set(item, "error", `error al lanzar ${what}: ${err instanceof Error ? err.message : String(err)}`, next);
				return;
			}
			const late = Math.round((api.serverNow() ?? when) - when);
			set(item, "success", `lanzado ${what}${late > 1 ? ` (${String(late)} s tarde)` : ""}`, next);
		}
		async function run() {
			const settings = deps.getSettings();
			const cfg = settings.scheduledSpells;
			const items = cfg.enabled ? cfg.items.filter((i) => i.enabled) : [];
			const ids = new Set(cfg.items.map((i) => i.id));
			for (const id of [...results.keys()]) if (!ids.has(id)) results.delete(id);
			for (const id of [...done.keys()]) if (!ids.has(id)) done.delete(id);
			if (items.length === 0) {
				notify();
				return;
			}
			const nowS = api.serverNow();
			if (nowS === null) {
				if (!warnedClock) logger.warn("hechizos programados: aún no se sabe la hora del servidor");
				warnedClock = true;
				arm(SPELL_NO_CLOCK_MS);
				notify();
				return;
			}
			warnedClock = false;
			let wait = Infinity;
			for (const item of items) {
				const last = done.get(item.id);
				const when = nextSpellTime(item, Math.max(last === void 0 ? -Infinity : last + 1, nowS - 90));
				if (when === null) {
					if (last === void 0) set(item, "warn", `${label(item)}: ya pasó la hora`, null);
					continue;
				}
				if (when > nowS) {
					if (!results.has(item.id)) set(item, "info", `${label(item)}: programado`, when);
					else {
						const r = results.get(item.id);
						if (r) results.set(item.id, {
							...r,
							next: when
						});
					}
					wait = Math.min(wait, (when - nowS) * 1e3);
					continue;
				}
				done.set(item.id, when);
				const next = nextSpellTime(item, when + 1);
				if (!settings.enabled) set(item, "warn", `${label(item)}: el bot está apagado, no se lanza`, next);
				else if (deps.isSafetyStopped?.() === true) set(item, "warn", `${label(item)}: pausa de seguridad, no se lanza`, next);
				else await cast(item, when, next);
				if (next !== null) wait = Math.min(wait, Math.max(0, (next - nowS) * 1e3));
			}
			if (wait !== Infinity) arm(wait);
			else arm(SPELL_RECHECK_MS);
			notify();
		}
		async function check() {
			if (stopped) return;
			if (running) {
				again = true;
				return;
			}
			running = true;
			try {
				const more = () => again && !stopped;
				do {
					again = false;
					await run();
				} while (more());
			} catch (err) {
				if (!(err instanceof SafetyStopError)) logger.error(`hechizos programados: ${err instanceof Error ? err.message : String(err)}`);
				arm(SPELL_RECHECK_MS);
			} finally {
				running = false;
			}
		}
		return {
			check,
			stop() {
				stopped = true;
				if (timer !== null) clearTimer(timer);
				timer = null;
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var HERO_RETRY_MS = 6e5;
	var HERO_ERROR_RETRY_MS = 18e5;
	function planHeroDispatch(input, limit = 1) {
		const placed = new Map();
		for (const h of input.heroes) if (h.assignment === "town" && h.homeTownId !== null) placed.set(h.homeTownId, (placed.get(h.homeTownId) ?? 0) + 1);
		const unassigned = input.heroes.filter((h) => h.assignment === "unassigned" && !input.busyHeroIds?.has(h.id));
		const injured = unassigned.filter((h) => h.curedAt !== null && h.curedAt > input.nowS);
		const free = unassigned.filter((h) => !injured.includes(h)).sort((a, b) => (b.level ?? 0) - (a.level ?? 0) || a.id - b.id);
		const steps = [];
		let missing = 0;
		for (const townId of [...new Set(input.targets)].sort((a, b) => a - b)) {
			let have = placed.get(townId) ?? 0;
			while (have < input.perTown) {
				const hero = steps.length < limit ? free.shift() : void 0;
				if (!hero) break;
				steps.push({
					hero,
					townId
				});
				have += 1;
			}
			if (have < input.perTown) missing += 1;
		}
		return {
			steps,
			free: free.length + steps.length,
			injured: injured.length,
			missing
		};
	}
	function heroTargets(settings, own) {
		return own.filter((townId) => resolveProfile(settings, settings.townProfiles[String(townId)])?.sendHeroes);
	}
	var SUMMARY$3 = "summary";
	function createHeroDispatchModule(deps) {
		const { api, win, logger } = deps;
		const now = deps.now ?? (() => new Date());
		const results = new Map();
		const townRetry = new Map();
		const heroRetry = new Map();
		let cache = null;
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: key === SUMMARY$3 ? void 0 : name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		function finish(keys, summary, level) {
			for (const key of [...results.keys()]) if (!keys.has(key)) results.delete(key);
			record(SUMMARY$3, 0, "Héroes", level, summary);
			notify();
		}
		async function readHeroes(fromTownId, at) {
			const fromClient = playerHeroes(win);
			if (fromClient) return fromClient;
			if (cache && at - cache.at < 18e5) return cache.heroes;
			const { heroes } = await api.getHeroes(fromTownId);
			if (!heroes) return null;
			cache = {
				at,
				heroes
			};
			return heroes;
		}
		function remember(updated) {
			if (!cache) return;
			const byId = new Map(updated.map((h) => [h.id, h]));
			cache = {
				at: cache.at,
				heroes: cache.heroes.map((h) => byId.get(h.id) ?? h)
			};
		}
		async function run(settings) {
			if (!settings.masters.heroDispatch || deps.isSafetyStopped?.() === true) return 0;
			const at = now().getTime();
			const keys = new Set([SUMMARY$3]);
			const wanted = heroTargets(settings, ownTownIds(win));
			if (wanted.length === 0) {
				finish(keys, "héroes: ningún perfil con \"Enviar héroes a estas ciudades\"", "info");
				return 0;
			}
			const targets = wanted.filter((t) => (townRetry.get(t) ?? 0) <= at);
			if (targets.length === 0) {
				finish(keys, "héroes: las ciudades esperan tras el último envío", "info");
				return 0;
			}
			let heroes;
			try {
				heroes = await readHeroes(targets[0] ?? 0, at);
			} catch (err) {
				if (err instanceof SafetyStopError) throw err;
				finish(keys, `héroes: no se pudo leer la ventana de héroes: ${err instanceof Error ? err.message : String(err)}`, "warn");
				return 0;
			}
			if (!heroes) {
				finish(keys, "héroes: no se leen los héroes, no se envía ninguno", "warn");
				return 0;
			}
			const nowS = api.serverNow() ?? Math.floor(at / 1e3);
			const busy = new Set([...heroRetry].filter(([, until]) => until > at).map(([id]) => id));
			const plan = planHeroDispatch({
				targets,
				heroes,
				perTown: heroesPerTown(win),
				nowS,
				busyHeroIds: busy
			});
			const dryRun = deps.isDryRun();
			let actions = 0;
			for (const { hero, townId } of plan.steps) {
				const key = String(townId);
				keys.add(key);
				const town = townName(win, townId);
				const who = `${heroName(win, hero.type)} (nivel ${hero.level ?? "?"})`;
				if (dryRun) {
					record(key, townId, town, "info", `simulación: enviaría a ${who} a esta ciudad`);
					continue;
				}
				if (deps.isSafetyStopped?.() === true) break;
				heroRetry.set(hero.id, now().getTime() + HERO_RETRY_MS);
				townRetry.set(townId, now().getTime() + HERO_RETRY_MS);
				try {
					const { heroes: updated } = await api.assignHeroToTown(townId, hero.id, hero.type, townId);
					remember(updated);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					townRetry.set(townId, now().getTime() + HERO_ERROR_RETRY_MS);
					record(key, townId, town, "error", `error al enviar a ${who}: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				actions += 1;
				record(key, townId, town, "success", `${who} enviado a esta ciudad`);
			}
			const parts = [];
			if (plan.steps.length > 0) parts.push(dryRun ? `simulación: ${plan.steps.length} ${plan.steps.length === 1 ? "envío" : "envíos"}` : `enviados ${actions} de ${plan.steps.length}`);
			if (plan.missing > 0) parts.push(`${plan.missing} ${plan.missing === 1 ? "ciudad" : "ciudades"} sin héroe y ${plan.free - plan.steps.length} libres`);
			if (plan.injured > 0) parts.push(`${plan.injured} ${plan.injured === 1 ? "herido" : "heridos"}`);
			finish(keys, `héroes: ${parts.length > 0 ? parts.join("; ") : "todas las ciudades tienen héroe"}`, "info");
			return actions;
		}
		return {
			task: {
				name: "héroes",
				phase: "heroes",
				category: "economy",
				master: "heroDispatch",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var HIDE_IRON_PER_LEVEL = 1e3;
	var HIDE_RETRY_MS = 3e5;
	var HIDE_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	function hideCapacity(level) {
		return level >= 10 ? null : level * HIDE_IRON_PER_LEVEL;
	}
	function planHideDeposit(input, settings) {
		if (input.level === null) return { skip: "unknown" };
		if (input.level <= 0) return { skip: "no-hide" };
		if (Math.floor(input.iron) < Math.floor(input.storage)) return { skip: "not-full" };
		let amount = Math.min(settings.amount, Math.floor(input.iron));
		const capacity = hideCapacity(input.level);
		if (capacity !== null) {
			if (input.stored === null) return { skip: "unknown" };
			const free = Math.floor(capacity - input.stored);
			if (free < 100) return { skip: "cave-full" };
			amount = Math.min(amount, free);
		}
		return amount >= 100 ? { amount } : { skip: "too-little" };
	}
	var SUMMARY$2 = "summary";
	function createHideIronModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const results = new Map();
		const retryAfter = new Map();
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: key === SUMMARY$2 ? void 0 : name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		async function run(settings) {
			const cfg = settings.hide;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) return 0;
			const at = now().getTime();
			const excluded = new Set(cfg.excludedTownIds);
			const keys = new Set([SUMMARY$2]);
			const deposits = [];
			for (const townId of ownTownIds(win)) {
				if (excluded.has(townId)) continue;
				if ((retryAfter.get(townId) ?? 0) > at) {
					keys.add(String(townId));
					continue;
				}
				const res = townResources(win, townId);
				if (!res) continue;
				const plan = planHideDeposit({
					iron: res.iron,
					storage: res.storage,
					level: buildingLevels(win, townId)?.hide ?? null,
					stored: townHideStorage(win, townId)
				}, cfg);
				const name = townName(win, townId);
				if ("amount" in plan) deposits.push({
					townId,
					name,
					amount: plan.amount
				});
				else if (plan.skip === "unknown") {
					keys.add(String(townId));
					record(String(townId), townId, name, "warn", "cueva: no se lee su nivel o lo guardado, no se guarda nada");
				} else if (plan.skip === "cave-full") {
					keys.add(String(townId));
					record(String(townId), townId, name, "info", "cueva: llena");
				}
			}
			const dryRun = deps.isDryRun();
			let actions = 0;
			let attempts = 0;
			for (const { townId, name, amount } of deposits) {
				const key = String(townId);
				keys.add(key);
				if (dryRun) {
					record(key, townId, name, "info", `simulación: guardaría ${amount} de plata en la cueva`);
					continue;
				}
				if (attempts > 0) await sleep(Math.round(HIDE_PAUSE_MS.min + random() * (HIDE_PAUSE_MS.max - HIDE_PAUSE_MS.min)));
				if (deps.isSafetyStopped?.() === true) break;
				attempts += 1;
				retryAfter.set(townId, now().getTime() + HIDE_RETRY_MS);
				try {
					await api.storeIronInHide(townId, amount);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					record(key, townId, name, "error", `error al guardar ${amount} de plata en la cueva: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				actions += 1;
				record(key, townId, name, "success", `guardada ${amount} de plata en la cueva`);
			}
			for (const key of [...results.keys()]) if (!keys.has(key)) results.delete(key);
			const n = deposits.length;
			record(SUMMARY$2, 0, "Cueva", "info", n === 0 ? "cueva: nada que guardar" : dryRun ? `simulación: ${n} ${n === 1 ? "depósito" : "depósitos"}` : `cueva: guardados ${actions} de ${n}`);
			notify();
			return actions;
		}
		return {
			task: {
				name: "plata a la cueva",
				phase: "hide",
				category: "economy",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var UNLOCK_COSTS = [
		2,
		8,
		10,
		30,
		50,
		100
	];
	var UPGRADE_COSTS = [
		1,
		5,
		25,
		50,
		100
	];
	var EXPANSION_RETRY_MS = 3e5;
	var EXPANSION_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	function unlockCost(unlocked) {
		return UNLOCK_COSTS[unlocked] ?? 100;
	}
	function upgradeCost(level) {
		return UPGRADE_COSTS[level - 1] ?? null;
	}
	function planVillageExpansion(input, settings, limit = 3) {
		const steps = [];
		let budget = input.points - settings.reservePoints;
		const byId = (a, b) => a.farmTownId - b.farmTownId;
		const expanding = input.villages.filter((v) => !v.locked && v.expanding).length;
		const ready = input.villages.filter((v) => !v.locked && !v.expanding).sort(byId);
		const unreadable = ready.filter((v) => v.level === null).length;
		const done = (waiting) => ({
			steps,
			waiting,
			expanding,
			unreadable
		});
		let unlocked = input.unlocked;
		for (const village of input.villages.filter((v) => v.locked).sort(byId)) {
			const cost = unlockCost(unlocked);
			const need = Math.max(cost, 100);
			const step = {
				kind: "unlock",
				village,
				cost,
				need,
				toLevel: 1
			};
			if (need > budget) return done(step);
			if (steps.length >= limit) return done(null);
			steps.push(step);
			budget -= step.cost;
			unlocked += 1;
		}
		const max = Math.min(settings.maxLevel, 6);
		for (let level = 1; level < max; level += 1) {
			const tableCost = upgradeCost(level);
			if (tableCost === null) break;
			for (const village of ready.filter((v) => v.level === level)) {
				const real = village.upgradeCost;
				const cost = real !== void 0 && real !== null && real > 0 ? real : tableCost;
				const step = {
					kind: "upgrade",
					village,
					cost,
					need: cost,
					toLevel: level + 1
				};
				if (cost > budget) return done(step);
				if (steps.length >= limit) return done(null);
				steps.push(step);
				budget -= cost;
			}
		}
		return done(null);
	}
	function expansionVillages(win) {
		const islandTown = new Map();
		for (const townId of ownTownIds(win)) {
			const island = townIsland(win, townId);
			const key = island ? `${island.x}:${island.y}` : null;
			if (key !== null && !islandTown.has(key)) islandTown.set(key, townId);
		}
		const farms = new Map(farmTowns(win).map((f) => [f.id, f]));
		const villages = [];
		let unlocked = 0;
		for (const rel of farmRelations(win)) {
			if (rel.relationStatus !== null && rel.relationStatus !== 0) unlocked += 1;
			if (rel.relationStatus !== 0 && rel.relationStatus !== 1) continue;
			const farm = rel.farmTownId === null ? void 0 : farms.get(rel.farmTownId);
			if (!farm || farm.islandX === null || farm.islandY === null) continue;
			const townId = islandTown.get(`${farm.islandX}:${farm.islandY}`);
			if (townId === void 0) continue;
			const level = rel.expansionStage;
			villages.push({
				relationId: rel.id,
				farmTownId: farm.id,
				name: farm.name ?? `aldea ${farm.id}`,
				townId,
				locked: rel.relationStatus === 0,
				level: level !== null && level >= 1 && level <= 6 ? level : null,
				expanding: rel.expansionAt !== null && rel.expansionAt > 0,
				upgradeCost: rel.upgradeCost
			});
		}
		return {
			villages,
			unlocked
		};
	}
	var SUMMARY$1 = "summary";
	var points = (n) => `${n} ${n === 1 ? "punto" : "puntos"}`;
	function stepText(step) {
		return `${step.kind === "unlock" ? `desbloquear ${step.village.name}` : `ampliar ${step.village.name} a nivel ${step.toLevel}`} (${points(step.cost)})`;
	}
	function createVillageExpansionModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const results = new Map();
		const retryAfter = new Map();
		const ledger = deps.ledger ?? createKillpointsLedger(now);
		let pendingUnlocks = 0;
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = { muted: level === "info" };
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const stop = (level, text) => {
			record(SUMMARY$1, 0, "Expansión", level, text);
			notify();
			return 0;
		};
		async function run(settings) {
			const cfg = settings.villageExpansion;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) return 0;
			const kp = playerKillpoints(win);
			if (kp === null) return stop("warn", "expansión: no se leen los puntos de batalla, no se amplía nada");
			const at = now().getTime();
			if (ledger.pending(kp) === 0) pendingUnlocks = 0;
			const available = ledger.available(kp);
			const read = expansionVillages(win);
			const villages = read.villages;
			const unlocked = read.unlocked + pendingUnlocks;
			const eligible = villages.filter((v) => (retryAfter.get(v.relationId) ?? 0) <= at);
			const plan = planVillageExpansion({
				points: available,
				unlocked,
				villages: eligible
			}, cfg);
			if (plan.steps.length === 0) {
				if (plan.waiting) {
					const free = Math.max(0, available - cfg.reservePoints);
					const need = plan.waiting.need > plan.waiting.cost ? `; hacen falta ${points(plan.waiting.need)} libres hasta verificar los costes` : "";
					return stop("info", `expansión: faltan puntos de batalla para ${stepText(plan.waiting)}${need}; hay ${points(free)} libres`);
				}
				const paused = villages.length - eligible.length;
				if (paused > 0) return stop("info", `expansión: ${paused} en espera tras la última acción`);
				if (plan.expanding > 0) return stop("info", `expansión: ${plan.expanding} ampliándose, nada más que hacer`);
				if (plan.unreadable > 0) return stop("warn", `expansión: nada que hacer hasta nivel ${cfg.maxLevel}, pero ${plan.unreadable} sin nivel legible`);
				return stop("info", `expansión: nada que hacer hasta nivel ${cfg.maxLevel}`);
			}
			const dryRun = deps.isDryRun();
			let actions = 0;
			let attempts = 0;
			const keys = new Set([SUMMARY$1]);
			for (const step of plan.steps) {
				const { village } = step;
				const key = String(village.relationId);
				keys.add(key);
				if (dryRun) {
					record(key, village.townId, village.name, "info", `simulación: ${stepText(step)}`);
					continue;
				}
				if (attempts > 0) await sleep(Math.round(EXPANSION_PAUSE_MS.min + random() * (EXPANSION_PAUSE_MS.max - EXPANSION_PAUSE_MS.min)));
				if (deps.isSafetyStopped?.() === true) break;
				attempts += 1;
				retryAfter.set(village.relationId, now().getTime() + EXPANSION_RETRY_MS);
				try {
					if (step.kind === "unlock") await api.unlockFarmVillage(village.townId, village.relationId, village.farmTownId);
					else await api.upgradeFarmVillage(village.townId, village.relationId, village.farmTownId);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					record(key, village.townId, village.name, "error", `error al ${stepText(step)}: ${err instanceof Error ? err.message : String(err)}`);
					break;
				}
				actions += 1;
				ledger.spend(kp, step.cost);
				if (step.kind === "unlock") pendingUnlocks += 1;
				const done = step.kind === "unlock" ? `desbloqueada ${village.name}` : `ampliada ${village.name} a nivel ${step.toLevel}`;
				record(key, village.townId, village.name, "success", `${done} (${points(step.cost)})`);
			}
			for (const key of [...results.keys()]) if (!keys.has(key)) results.delete(key);
			const n = plan.steps.length;
			stop("info", dryRun ? `simulación: ${n} ${n === 1 ? "acción" : "acciones"}` : `expansión: hechas ${actions} de ${n}`);
			return actions;
		}
		return {
			task: {
				name: "expandir aldeas",
				phase: "villages",
				category: "economy",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var VILLAGE_TRADE_RETRY_MS = 3e5;
	var VILLAGE_TRADE_PAUSE_MS = {
		min: 1e3,
		max: 3e3
	};
	var EPSILON = 1e-9;
	function planVillageTrade(input, settings) {
		const { resources: res, incoming, cost } = input;
		const capacity = Math.min(input.capacity, FARM_TRADE_MAX);
		if (capacity <= 0) return null;
		const space = zeroResources();
		const deficit = zeroResources();
		for (const k of RESOURCE_KINDS) {
			space[k] = Math.max(0, Math.floor(res.storage - res[k] - incoming[k]));
			const missing = Math.ceil((cost[k] ?? 0) - res[k] - incoming[k]);
			deficit[k] = Math.max(0, Math.min(missing, space[k]));
		}
		const wanted = RESOURCE_KINDS.filter((k) => deficit[k] > 0).sort((a, b) => deficit[b] - deficit[a]);
		for (const r of wanted) {
			const offers = input.villages.filter((v) => v.offer === r && v.demand !== r && v.ratio >= settings.minRatio).sort((a, b) => b.ratio - a.ratio || a.farmTownId - b.farmTownId);
			for (const village of offers) {
				const d = village.demand;
				const surplus = Math.floor(res[d] - (cost[d] ?? 0));
				const target = Math.min(Math.max(deficit[r], settings.minAmount), space[r]);
				const give = Math.min(Math.ceil(target / village.ratio - EPSILON), Math.floor(space[r] / village.ratio), surplus, capacity);
				if (give <= 0) continue;
				const receive = Math.floor(give * village.ratio + EPSILON);
				if (receive <= 0 || receive < settings.minAmount && receive < deficit[r]) continue;
				return {
					village,
					give,
					receive
				};
			}
		}
		return null;
	}
	function villagesByIsland(win) {
		const towns = new Map(farmTowns(win).map((f) => [f.id, f]));
		const out = new Map();
		for (const rel of farmRelations(win)) {
			if (rel.relationStatus !== 1 || rel.farmTownId === null || rel.tradeRatio === null) continue;
			const farm = towns.get(rel.farmTownId);
			if (!farm || farm.islandX === null || farm.islandY === null) continue;
			const { resourceOffer: offer, resourceDemand: demand } = farm;
			if (!isResourceKind(offer) || !isResourceKind(demand)) continue;
			const key = `${farm.islandX}:${farm.islandY}`;
			const list = out.get(key) ?? [];
			list.push({
				relationId: rel.id,
				farmTownId: rel.farmTownId,
				name: farm.name ?? `aldea ${rel.farmTownId}`,
				offer,
				demand,
				ratio: rel.tradeRatio
			});
			out.set(key, list);
		}
		return out;
	}
	var ratioText = (ratio) => `1:${ratio.toFixed(2).replace(".", ",")}`;
	var SUMMARY = "summary";
	function createVillageTradeModule(deps) {
		const { api, win, logger } = deps;
		const random = deps.random ?? Math.random;
		const now = deps.now ?? (() => new Date());
		const sleep = deps.sleep ?? ((ms) => new Promise((resolve) => {
			setTimeout(resolve, ms);
		}));
		const tracker = deps.tracker ?? createTradeTracker({
			api,
			win,
			now
		});
		const results = new Map();
		const retryAfter = new Map();
		const listeners = new Set();
		const notify = () => {
			for (const l of listeners) l();
		};
		function record(key, townId, name, level, text) {
			const previous = results.get(key);
			results.set(key, {
				townId,
				name,
				at: now().getTime(),
				level,
				text
			});
			if (previous?.text === text && level !== "success") return;
			const options = {
				town: key === SUMMARY ? void 0 : name,
				muted: level === "info"
			};
			if (level === "success") logger.success(text, options);
			else if (level === "warn") logger.warn(text, options);
			else if (level === "error") logger.error(text, options);
			else logger.info(text, options);
		}
		const stop = (level, text) => {
			record(SUMMARY, 0, "Aldeas", level, text);
			notify();
			return 0;
		};
		async function run(settings) {
			const cfg = settings.villageTrade;
			if (!cfg.enabled || deps.isSafetyStopped?.() === true) return 0;
			const own = ownTownIds(win);
			const needs = townBuildNeeds(win, settings, own);
			const islands = villagesByIsland(win);
			const inputs = (incoming) => {
				const at = now().getTime();
				const out = [];
				for (const townId of own) {
					const wants = needs.get(townId)?.wants;
					if (!wants || (retryAfter.get(townId) ?? 0) > at) continue;
					const resources = townResources(win, townId);
					const island = townIsland(win, townId);
					const capacity = townTradeCapacity(win, townId);
					if (!resources || !island || capacity === null) continue;
					const villages = islands.get(`${island.x}:${island.y}`) ?? [];
					if (villages.length === 0) continue;
					out.push({
						townId,
						what: wants.what,
						input: {
							resources,
							incoming: incoming.get(townId) ?? zeroResources(),
							capacity,
							cost: wants.cost,
							villages
						}
					});
				}
				return out;
			};
			const loose = {
				...cfg,
				minAmount: 0
			};
			if (!inputs(new Map()).some((t) => planVillageTrade(t.input, loose) !== null)) return stop("info", "aldeas: nada que comprar");
			const read = await tracker.incoming(own);
			if ("error" in read) return stop("warn", `aldeas: no se leen los comercios en camino, no se compra nada (${read.error})`);
			const dryRun = deps.isDryRun();
			let actions = 0;
			let attempts = 0;
			let planned = 0;
			const used = new Set();
			const keys = new Set([SUMMARY]);
			for (const { townId, what, input: all } of inputs(read.incoming)) {
				if (planned >= 5) break;
				const input = {
					...all,
					villages: all.villages.filter((v) => !used.has(v.relationId))
				};
				const plan = planVillageTrade(input, cfg);
				if (!plan) continue;
				planned += 1;
				used.add(plan.village.relationId);
				const name = townName(win, townId);
				const key = String(townId);
				keys.add(key);
				const text = (p) => {
					const { village } = p;
					const got = resourcesText({
						...zeroResources(),
						[village.offer]: p.receive
					});
					const paid = resourcesText({
						...zeroResources(),
						[village.demand]: p.give
					});
					return `${got} de ${village.name} por ${paid} (${ratioText(village.ratio)}, para ${what})`;
				};
				if (dryRun) {
					record(key, townId, name, "info", `simulación: compraría ${text(plan)}`);
					continue;
				}
				if (attempts > 0) await sleep(Math.round(VILLAGE_TRADE_PAUSE_MS.min + random() * (VILLAGE_TRADE_PAUSE_MS.max - VILLAGE_TRADE_PAUSE_MS.min)));
				if (deps.isSafetyStopped?.() === true) break;
				attempts += 1;
				let done = plan;
				let posted = false;
				try {
					const data = await api.getFarmTownTradeData(townId, plan.village.farmTownId);
					if (data.availableTradeCapacity !== null && data.availableTradeCapacity < plan.give) {
						const smaller = planVillageTrade({
							...input,
							capacity: data.availableTradeCapacity,
							villages: [plan.village]
						}, cfg);
						if (!smaller) {
							record(key, townId, name, "info", "aldeas: sin capacidad de comercio libre");
							continue;
						}
						done = smaller;
					}
					posted = true;
					await api.tradeWithFarmVillage(townId, done.village.relationId, done.village.farmTownId, done.give);
					const duration = data.tradeDuration ?? 900;
					tracker.noteSent(townId, {
						...zeroResources(),
						[done.village.offer]: done.receive
					}, now().getTime() + (duration + 60) * 1e3);
				} catch (err) {
					if (err instanceof SafetyStopError) throw err;
					retryAfter.set(townId, now().getTime() + VILLAGE_TRADE_RETRY_MS);
					tracker.invalidate();
					if (posted) tracker.noteSent(townId, {
						...zeroResources(),
						[done.village.offer]: done.receive
					}, now().getTime() + 96e4);
					record(key, townId, name, "error", `error al comprar ${text(done)}: ${err instanceof Error ? err.message : String(err)}`);
					continue;
				}
				actions += 1;
				record(key, townId, name, "success", `comprado ${text(done)}`);
			}
			if (planned === 0) return stop("info", "aldeas: lo que falta ya está en camino");
			for (const key of [...results.keys()]) if (!keys.has(key)) results.delete(key);
			stop("info", dryRun ? `simulación: ${planned} ${planned === 1 ? "compra" : "compras"}` : `aldeas: compradas ${actions} de ${planned}`);
			return actions;
		}
		return {
			task: {
				name: "comercio con aldeas",
				phase: "villages",
				category: "economy",
				run
			},
			status: () => [...results.values()],
			subscribe(listener) {
				listeners.add(listener);
				return () => {
					listeners.delete(listener);
				};
			}
		};
	}
	var DICTIONARIES = {
		es: {
			title: "grepo-helper",
			close: "Cerrar",
			sectionAutomation: "Automatización",
			sectionEconomy: "Economía",
			general: "Activado (interruptor general)",
			dryRun: "Modo simulación (registra las acciones sin enviarlas)",
			safetyStopped: "Pausado",
			stop_captcha: "el servidor pide un captcha",
			stop_botcheck: "el servidor ha abierto una comprobación antibot",
			stop_verification: "el servidor pide un código de verificación",
			safetyHint: "Resuélvelo tú en el juego; el script no lo intenta. Después pulsa Reanudar.",
			safetyResume: "Reanudar",
			safetyCooldown: "El servidor pide esperar (HTTP 429/503):",
			autoBuild: "Auto-construcción",
			autoResearch: "Auto-investigación",
			autoRecruit: "Auto-reclutamiento",
			heroDispatch: "Envío de héroes",
			pollInterval: "Intervalo (s)",
			pollFrom: "de",
			pollTo: "a",
			rest: "Horas de descanso",
			restFrom: "desde",
			restTo: "hasta",
			restNote: "Una pausa diaria en tu hora local. En descanso se pausa la economía; ataques, apoyos y defensa siguen.",
			freeFinish: "Terminar gratis",
			farmVillages: "Aldeas",
			collectLongest: "Ciclo más largo antes de descansar",
			autoTrade: "Comercio automático",
			language: "Idioma",
			modulesNote: "Nada actúa sin el interruptor Bot activado de la cabecera: ni estos mosaicos, ni Aldeas ni Terminar gratis (pestaña Isla).",
			towns: "Asignación de ciudades",
			townsDesc: "Qué perfil usa cada ciudad. Una ciudad sin perfil no investiga ni sigue tramos; solo construye su cola del Senado.",
			noProfile: "Sin perfil",
			refreshTowns: "Actualizar ciudades",
			townsEmpty: "Aún no se ven ciudades: salen solas en cuanto el juego las carga (ITowns.towns).",
			research: "Investigación",
			researchDesc: "Con Investigación auto activado, encarga en cada ciudad con perfil la primera investigación lista por prioridad.",
			researchEmpty: "Sin resultados todavía.",
			build: "Construcción",
			buildDesc: "Con Construcción auto activado, encarga en cada ciudad con perfil un nivel por ciclo del primer tramo sin completar.",
			farmMaxClaims: "Máx. aldeas por ciclo sin Capitán",
			farmTowns: "Ciudades (IDs separados por comas; vacío = todas)",
			farmNext: "Próxima recogida",
			farmNextNow: "en cuanto estén listas",
			farmNextIn: "en",
			farmRunning: "recogiendo…",
			farmCollectNow: "Recoger ahora",
			farmLastResults: "Último resultado por ciudad",
			farmDesc: "Recoge las aldeas listas de tus ciudades. Salta las ciudades con el almacén lleno; con Capitán, todas en una sola petición. Después espera el intervalo elegido.",
			farmInterval: "Intervalo de recogida",
			farmOptions: "Opciones",
			freeFinishDesc: "Termina construcciones e investigaciones solo cuando el juego lo deja gratis (menos de 5 min). Nunca gasta oro.",
			autoTradeDesc: "Lleva recursos de las ciudades con la cola llena a las que esperan recursos para su siguiente obra (Auto-construcción), sin desbordar el almacén contando lo que está en camino.",
			automationDesc: "Interruptores generales. Apagado aquí significa apagado en todas partes, diga lo que diga un perfil.",
			collapse: "Plegar o desplegar",
			modeOff: "Apagado",
			modeDry: "Simulación",
			modeLive: "Real",
			log: "Registro",
			clear: "Limpiar",
			logEmpty: "Sin entradas",
			tab_activity: "Actividad",
			tab_market: "Mercado",
			tab_festivals: "Festivales",
			tab_missions: "Misiones",
			tab_errors: "Errores",
			farm_300: "5 min",
			farm_1200: "20 min",
			farm_5400: "1 h 30",
			farm_14400: "4 h",
			profiles: "Perfiles",
			profilesDesc: "Una especialización de ciudad: qué construye, investiga y recluta. Las plantillas (🔒) son de solo lectura: duplícalas para editarlas.",
			profileNew: "Nuevo",
			profileDuplicate: "Duplicar",
			profileDelete: "Eliminar",
			profileDeleteConfirm: "¿Eliminar? Pulsa otra vez",
			profileReadOnly: "Plantilla (solo lectura). Duplícala para editarla.",
			profileName: "Nombre",
			newProfileName: "Perfil nuevo",
			copyOf: "Copia de",
			stages: "Construcción por tramos",
			stage: "Tramo",
			stageAdd: "Añadir tramo",
			stagesEmpty: "Sin tramos de construcción.",
			level: "Nivel",
			priority: "Prioridad",
			specials: "Edificios especiales",
			special1: "Espacio 1",
			special2: "Espacio 2",
			none: "ninguno",
			specialsNote: "Uno por espacio: al activar otro se cambia. Se construye en el tramo en el que lo actives.",
			remove: "Quitar",
			budget: "Puntos de investigación",
			budgetUsed: "Perfil",
			budgetOutside: "gastados fuera del perfil",
			budgetNow: "ciudad ahora",
			budgetAtTarget: "con Academia",
			budgetWarn: "El perfil no cabe: necesita más puntos de los que tendrá la ciudad con la Academia del perfil.",
			budgetUnknown: "Sin datos de puntos",
			budgetNoData: "Sin datos del juego.",
			townStatus: "Estado por ciudad",
			statusNoData: "sin datos",
			statusAllDone: "todos los tramos completos",
			statusReached: "objetivos alcanzados",
			statusQueued: "en cola",
			statusBlocked: "bloqueados",
			statusNextResearch: "investigación siguiente",
			statusNoTowns: "Ninguna ciudad usa este perfil.",
			sqTitle: "COLA",
			sqEmpty: "Vacía: pulsa + en un edificio.",
			sqPlus: "Añadir a la cola de grepo-helper",
			sqAdd: "Añadir",
			sqSave: "Guardar",
			sqRemove: "Quitar",
			sqLevel: "Nivel",
			sqNow: "ahora",
			sqMaxShort: "máx.",
			sqUp: "Subir",
			sqDown: "Bajar",
			sqMax: "Ya está al nivel máximo",
			sqOff: "Construcción auto apagada",
			sqDryRun: "Modo simulación",
			sqThen: "Después, los tramos del perfil",
			sq_reached: "hecho",
			sq_queued: "en la cola del juego",
			sq_pending: "pendiente",
			sq_blocked: "bloqueado",
			tabProfiles: "Perfiles",
			tabTrade: "Comercio",
			tabIsland: "Isla",
			tabCulture: "Cultura y misiones",
			tabCombat: "Combate",
			tabCityFarms: "Granjas de ciudades",
			tabIntel: "Intel",
			tabActivity: "Actividad",
			switchOn: "Bot activado",
			switchDry: "Simulación",
			tileBuild: "Construcción auto",
			tileResearch: "Investigación auto",
			tileRecruit: "Reclutamiento auto",
			tileHeroes: "Distribución de héroes",
			noModule: "aún sin módulo",
			pollSlider: "Intervalo de sondeo (segundos)",
			pollHint: "Cada ciclo espera un tiempo al azar entre los dos valores.",
			allTowns: "Todas las ciudades",
			townQueue: "Cola del Senado",
			profileTitle: "Perfil",
			profileRename: "Renombrar",
			profileExport: "Exportar",
			profileImport: "Importar",
			exportHint: "Copia este texto para guardar el perfil o llevarlo a otro mundo.",
			importHint: "Pega aquí perfiles exportados y pulsa Importar.",
			importOk: "Importados",
			importNone: "No se ha importado nada.",
			save: "Guardar",
			cancel: "Cancelar",
			buildFocus: "Enfoque de construcción",
			focusAcademy: "Primero Academia 28",
			focusColony: "Primero barco colonizador",
			worksIn: "Funciona en estas ciudades",
			pauseBuild: "Edificio",
			pauseResearch: "Investigación",
			pauseRecruit: "Reclutamiento",
			popFloor: "Umbral de población",
			popFloorOn: "Umbral de población activado",
			popFloorMin: "Umbral de población libre",
			popFloorFarm: "Niveles de Granja a construir",
			buildings: "Edificios",
			tradeDonorFill: "Llenado mínimo del donante (%)",
			tradeReserve: "Se queda en el donante (%)",
			tradeMinSend: "Envío mínimo (recursos)",
			tradeMaxTransfers: "Máx. envíos por ciclo",
			tradePool: "Pool de emergencia",
			tradePoolDesc: "Con Comercio automático activado, todas las demás ciudades vierten lo que tienen en la ciudad destino, sin llenado mínimo ni reserva, hasta llenar su almacén (de una aliada no se lee). Mientras está activo no hay reparto normal.",
			tradePoolTarget: "Ciudad destino",
			tradePoolNone: "— elegir —",
			tradePoolOther: "Otra ciudad (ID)",
			tradePoolId: "ID de la ciudad",
			tradeResults: "Último comercio",
			villageTrade: "Comercio con aldeas",
			villageTradeDesc: "Compra a las aldeas de la misma isla lo que le falta a una ciudad para su siguiente obra (Auto-construcción), dando lo que pide la aldea sin tocar lo que esa obra necesita. Se para si el ratio baja del mínimo.",
			villageMinRatio: "Ratio mínimo",
			villageMinAmount: "Compra mínima (recursos)",
			marketTitle: "Mercado entre jugadores",
			marketDesc: "Acepta ofertas de otros jugadores que equilibran el almacén de una ciudad, al precio y en el tiempo que pongas, y publica ofertas con lo que sobra. Va después del comercio propio y de las aldeas. Nunca oro.",
			marketPending: "Aceptar ofertas está verificado: sin Simulación acepta de verdad, pagando cada oferta entera y nunca con oro. Publicar y retirar ofertas propias esperan una captura (instrucciones.md §3, A.5): en simulación solo se apunta lo que haría en la pestaña Mercado del registro, y en modo real no se publica nada.",
			marketEnabled: "Aceptar ofertas",
			marketBalance: "Equilibrar con ofertas propias",
			marketMaxPay: "Pago máx. por 1 recibido",
			marketOverflowPay: "Pago máx. si lo pagado llena el almacén",
			marketDelivery: "Entrega máx. (min)",
			marketMinTrade: "Intercambio mínimo",
			marketTrades: "Intercambios por ronda",
			marketWithdraw: "Retirar las propias tras (h, 0 = nunca)",
			marketPartners: "Con quién",
			marketPartnersNotEnemies: "Todos salvo enemigos",
			marketPartnersAll: "Todos",
			marketPartnersAlliancePacts: "Alianza y pactos",
			marketPartnersAlliance: "Solo mi alianza",
			marketView: "Ver ofertas (ciudad actual)",
			marketOffers: "ofertas",
			marketOwnOffers: "Ofertas propias publicadas",
			marketWouldPublish: "Publicaría",
			marketWouldAccept: "la aceptaría",
			marketColGet: "Recibes",
			marketColPay: "Pagas",
			marketColRatio: "Precio",
			marketColTime: "Entrega",
			marketColVerdict: "Qué haría",
			marketReasonType: "no es madera, piedra o plata",
			marketReasonPartner: "no es de tu alianza",
			marketReasonUnknownPact: "relación sin verificar",
			marketReasonDelivery: "tarda demasiado",
			marketReasonMinTrade: "por debajo del mínimo",
			marketReasonBalance: "no equilibra el almacén",
			marketReasonRatio: "demasiado cara",
			marketReasonCapacity: "faltan comerciantes",
			marketReasonResources: "no se leen los recursos",
			villageExpansion: "Expandir aldeas",
			villageExpansionDesc: "Gasta puntos de batalla (nunca oro) en desbloquear las aldeas de tus islas y después en ampliarlas, todas un nivel antes de pasar al siguiente, hasta el nivel máximo. Nunca baja de la reserva.",
			villageMaxLevel: "Nivel máximo",
			villageReservePoints: "Reserva de puntos de batalla",
			expansionResults: "Última expansión",
			hide: "Plata a la cueva",
			hideDesc: "Cuando la plata de una ciudad llena el almacén, guarda en la cueva la cantidad indicada, sin pasar de lo que cabe. Lo guardado no se puede sacar (solo sirve para espiar) y está a salvo de saqueos.",
			hideAmount: "Plata por depósito",
			hideTowns: "Ciudades",
			hideResults: "Último depósito",
			heroesDesc: "Envía los héroes libres (sin ciudad y sin heridas) a las ciudades cuyo perfil tiene «Enviar héroes a estas ciudades», hasta que cada una tenga el suyo. Un héroe que ya está en otra ciudad no se mueve. Es el mismo interruptor que el mosaico de Automatización.",
			heroesResults: "Últimos envíos",
			festivals: "Festivales",
			festivalsDesc: "Lanza en las ciudades elegidas los festivales marcados que no estén ya en curso. La marcha triunfal gasta 300 puntos de batalla; el teatro y el festival, recursos, y solo si la ciudad no espera recursos para su siguiente obra.",
			festivalTriumph: "Marcha triunfal (300 puntos de batalla)",
			festivalTriumphMin: "Solo con al menos estos puntos libres",
			festivalTheater: "Teatro (recursos, con Teatro)",
			festivalParty: "Festival (recursos, Academia 30)",
			festivalOlympic: "Los Juegos Olímpicos cuestan oro: no se lanzan nunca.",
			festivalTowns: "Ciudades",
			festivalTownsAll: "Todas",
			festivalTownsNone: "Ninguna",
			festivalResults: "Últimos festivales",
			bandits: "Campamento de bandidos",
			banditsDesc: "Desde la ciudad elegida ataca la oleada siguiente con todas las tropas en casa de los tipos marcados, cuando el campamento ya no está en espera y no hay otro ataque en curso. Solo ataca si el simulador del juego da victoria con la peor suerte contra los defensores del campamento. La recompensa la guarda en el inventario si se puede; si no, la usa.",
			banditTown: "Ciudad que ataca (la de la isla del campamento)",
			banditTownNone: "Elige una ciudad",
			banditUnits: "Tropas que se mandan (sin espadachines ni arqueros)",
			banditResults: "Último resultado",
			missions: "Misiones",
			missionsDesc: "Cobra las misiones cumplidas. Nunca cierra una antes de tiempo.",
			missionBeginner: "Misiones de principiante: cobrar las cumplidas (desde la ciudad abierta)",
			missionIsland: "Misiones de isla: guardar en el inventario la recompensa de las cumplidas (si no cabe, se queda sin cobrar)",
			missionResults: "Últimas misiones",
			scheduledSpells: "Hechizos programados",
			scheduledSpellsDesc: "Lanza cada hechizo a su hora exacta según el reloj del servidor, sobre una ciudad tuya o de otro por ID. Sigue en las horas de descanso. Con la pestaña del juego en segundo plano el navegador puede retrasarlo hasta un minuto; pasados 90 s se da por perdido.",
			spellTarget: "Ciudad (ID; las tuyas salen en la lista)",
			spellPower: "Hechizo (ID del juego)",
			spellAt: "Hora exacta (la de tu navegador)",
			spellRepeat: "Repetir cada (min; 0 = una sola vez)",
			spellAdd: "Añadir",
			spellRemove: "Quitar",
			spellList: "Programados",
			spellEmpty: "No hay hechizos programados.",
			spellEvery: "cada",
			spellInvalid: "Revisa la ciudad, el hechizo, la hora y cada cuánto se repite.",
			spellFull: "Ya hay 50 hechizos programados: quita alguno.",
			timedCommands: "Ataques cronometrados",
			timedCommandsDesc: "Ataques y apoyos que llegan a una hora exacta según el reloj del servidor: los envía, mira la llegada y, si cae fuera de la tolerancia, los cancela y los vuelve a enviar. Lo que no se fija a tiempo se retira.",
			timedType: "Tipo",
			timedAttack: "Ataque",
			timedSupport: "Apoyo",
			timedFrom: "Desde",
			timedTarget: "Objetivo (ID de la ciudad; las tuyas salen en la lista)",
			timedUnits: "Tropas",
			timedNoUnits: "No se leen tropas en esa ciudad.",
			timedArrival: "Llegada (hora de tu navegador)",
			timedEarly: "Tolerancia antes (s)",
			timedLate: "Tolerancia después (s)",
			timedTravel: "Duración del viaje (H:MM:SS; vacío = leerla del juego)",
			timedPower: "Hechizo al fijarlo (opcional)",
			timedAdd: "Programar",
			timedRemove: "Quitar",
			timedList: "Cola",
			timedEmpty: "No hay nada programado.",
			timedInvalid: "Revisa el origen, el objetivo, las tropas, la llegada, la tolerancia, la duración y el hechizo.",
			timedFull: "Ya hay 50 programados: quita alguno.",
			timedOk: "Éxito",
			timedFail: "Fallo",
			timedClear: "Limpiar",
			timedNone: "Nada.",
			tsArriveAt: "Llegar a las",
			tsSchedule: "Programar",
			tsBadTime: "Hora no válida (hh de 0 a 23; mm y ss de 0 a 59).",
			tsNoUnits: "Escribe arriba las tropas.",
			tsNoTab: "No se sabe el objetivo: cierra la pestaña y vuelve a abrirla.",
			tsScheduled: "en la cola, llega el",
			tsTurnOn: "Para que se envíe, enciende en el panel",
			tsFarmTurnOn: "Para que ataque, enciende en el panel",
			tsTab: "pestaña",
			tsHeader: "arriba del todo",
			tsAnd: "y",
			tsDryRun: "Simulación está activada: solo se apunta en el registro, no se envía nada.",
			tsWillSend: "Se enviará solo a su hora.",
			tsAddFarm: "Añadir a farmlist",
			tsFarmOnlyAttack: "A la farmlist solo se añade desde la pestaña Atacar.",
			tsFarmNoUnits: "Escribe arriba las tropas o crea antes una plantilla de raid.",
			tsFarmAdded: "añadido a la farmlist con la plantilla",
			groupPlan: "Planificar grupo (beta)",
			groupPlanDesc: "Calcula un ataque o apoyo desde todas las ciudades de un perfil para que lleguen a la vez. No envía nada: al confirmar, el plan pasa a la cola de Ataques cronometrados.",
			groupProfile: "Grupo (perfil)",
			groupOffense: "Ofensiva y escolta naval",
			groupDefense: "Defensa y barcos defensivos",
			groupAll: "Todo",
			groupArrival: "Llegada (vacía = lo antes posible para todo el grupo)",
			groupCalc: "Calcular",
			groupCalculating: "Calculando…",
			groupArrivalAt: "Llegada:",
			groupTravel: "viaje",
			groupConfirm: "Confirmar",
			groupNothing: "Ninguna ciudad del grupo puede ir.",
			groupAdded: "Pasado a la cola de Ataques cronometrados; actívalo para que se envíe",
			groupInvalid: "Elige el perfil y revisa el objetivo, la llegada y los márgenes.",
			groupError: "No se pudo calcular",
			defense: "Defensa",
			defenseDesc: "Ataques que vienen a tus ciudades, quién los manda, milicia y esquivar. Contra los ignorados no se hace nada.",
			defenseMilitiaSeconds: "Pedir milicia cuando falten menos de (s)",
			defenseMilitiaTowns: "Pedir milicia en",
			defenseIgnore: "No hacer nada contra",
			defenseIgnorePlayers: "Jugadores (separados por comas)",
			defenseIgnoreAlliances: "Alianzas (separadas por comas)",
			defenseIgnoreOwn: "Mi alianza",
			defenseAttacks: "Ataques entrantes",
			defenseNoAttacks: "No viene ningún ataque.",
			defenseUnknown: "atacante desconocido",
			defenseNoOwner: "ciudad sin dueño",
			defenseColony: "barco colono",
			defenseIgnored: "ignorado",
			defenseResults: "Último resultado",
			defenseDodge: "Esquivar",
			defenseDodgeNote: "Unos segundos antes del impacto, las tropas salen de apoyo a otra ciudad y se cancela el envío para que estén de vuelta cuando haya pasado.",
			dodgeMixed: "Unidades mixtas al esquivar",
			dodgeMixed_offense: "Ofensa",
			dodgeMixed_defense: "Defensa",
			dodgeMixed_both: "Las dos",
			dodgeTown: "Ciudad",
			dodgeEnabled: "Esquivar en esta ciudad",
			dodgeLand: "Mover tropas de tierra",
			dodgeFleet: "Mover la flota",
			dodgeSeparate: "Tierra y flota por separado",
			dodgeUnits: "Qué tropas",
			dodgeUnits_offense: "Ofensa",
			dodgeUnits_defense: "Defensa",
			dodgeUnits_all: "Todas",
			dodgeBefore: "Salir antes del impacto (s)",
			dodgeDestination: "Destino",
			dodgeDest_nearest: "Ciudad propia más cercana",
			dodgeDest_random: "Aleatoria de las cercanas",
			dodgeDest_town: "Una ciudad concreta (ID)",
			dodgeDestinationId: "ID de la ciudad de destino",
			dodgeReturn: "Vuelta",
			dodgeReturn_impact: "Tras el impacto",
			dodgeReturn_beforeColony: "Antes del barco colono",
			dodgeReturn_afterColony: "Tras el barco colono",
			dodgeOffset: "Margen de la vuelta (s)",
			dodgeBacksnipe: "Backsnipe: atacar su ciudad cuando vuelvan sus tropas",
			dodgeBacksnipeOffset: "Llegar tras su vuelta (s)",
			dodgeCopyAll: "Copiar a todas las ciudades",
			dodgeOn: "Esquivan",
			dodgeNone: "Ninguna ciudad esquiva.",
			defenseSpell: "Hechizo sobre ataques",
			defenseSpellNote: "Uno por ataque, en las ciudades marcadas. Qué hechizos acepta un ataque aún no se sabe: mira el último resultado.",
			defenseSpellOn: "Lanzar hechizo sobre los ataques",
			defenseSpellPower: "Hechizo",
			defenseSpellWhen: "Cuándo",
			spellWhen_midway: "A mitad del trayecto",
			spellWhen_end: "Al final",
			defenseSpellSeconds: "Segundos antes del impacto",
			defenseSpellTowns: "En los ataques a",
			cityFarm: "Farmeo de ciudades",
			cityFarmDesc: "Ataca una y otra vez las ciudades de la farmlist con las tropas de su plantilla, cuando están en casa. Un objetivo se apaga solo si cambia de dueño.",
			cfAdd: "Añadir objetivo",
			cfAddNote: "También desde la pestaña Atacar de la ciudad en el juego, con «Añadir a farmlist».",
			cfTarget: "Ciudad objetivo (ID)",
			cfFrom: "Desde",
			cfTemplate: "Plantilla",
			cfAddButton: "Añadir",
			cfInvalid: "Escribe el ID de una ciudad que no sea tuya y elige el origen y la plantilla.",
			cfDuplicate: "Ese objetivo ya está en la farmlist desde esa ciudad.",
			cfFull: "La farmlist está llena.",
			cfNoTemplates: "Crea antes una plantilla de raid.",
			cfList: "Farmlist",
			cfEmpty: "La farmlist está vacía.",
			cfSends: "envíos",
			cfOff: "apagado",
			cfOwnerChanged: "cambió de dueño: apagado",
			cfPending: "pendiente",
			cfRemove: "Quitar de la farmlist",
			cfSearch: "Buscar objetivos (beta)",
			cfSearchDesc: "Ciudades de otros jugadores cerca de las tuyas, de jugadores que no crecen. Solo lee los datos del mundo; no ataca.",
			cfSearchRadius: "Radio (islas)",
			cfSearchInactive: "Días sin crecer (mín.)",
			cfSearchMaxPlayer: "Puntos del jugador (máx.)",
			cfSearchMaxTown: "Puntos de la ciudad (máx.)",
			cfSearchNoLimit: "sin límite",
			cfSearchGhosts: "Incluir ciudades fantasma (sin dueño)",
			cfSearchOwnAlliance: "Sin mi alianza",
			cfSearchTemplate: "Plantilla para añadir",
			cfSearchGo: "Buscar",
			cfSearching: "Buscando…",
			cfSearchError: "No se pudo buscar",
			cfSearchNoHistory: "Aún no hay lecturas de actividad: con días sin crecer > 0 no saldrá nadie hasta pasados esos días.",
			cfSearchTracked: "Actividad anotada desde el",
			cfSearchDays: "días",
			cfSearchNone: "Ninguna ciudad cumple los filtros.",
			cfSearchShowing: "Se muestran las más cercanas:",
			cfSearchAdded: "Añadida",
			cfColTown: "Ciudad",
			cfColPlayer: "Jugador",
			cfColPoints: "Puntos",
			cfColInactive: "Sin crecer",
			cfColIslands: "Islas",
			cfColFrom: "Desde",
			cfColSends: "Envíos",
			cfGhost: "fantasma",
			raidTemplates: "Plantillas de raid (beta)",
			raidTemplatesDesc: "Las tropas de cada ataque. En amarillo, los objetivos en otra isla que su origen: la plantilla necesita barcos de transporte.",
			raidNew: "Nueva plantilla",
			raidName: "Nombre de la plantilla",
			raidDefaultName: "Raid",
			raidDuplicate: "Duplicar",
			raidCopy: "copia",
			raidDelete: "Borrar",
			raidInUse: "La usan objetivos de la farmlist: cámbiales la plantilla antes de borrarla.",
			raidMyth: "Míticas",
			raidUsedBy: "La usan",
			raidUnused: "Ningún objetivo la usa.",
			raidFar: "Otra isla: hacen falta barcos de transporte",
			raidEmpty: "No hay plantillas.",
			raidFull: "No caben más plantillas de raid.",
			intelWorld: "Datos del mundo",
			intelWorldDesc: "Jugadores, ciudades y alianzas del mundo, que el juego publica cada hora. Los usan Buscar objetivos, la defensa y la inactividad de los jugadores. Solo se leen.",
			intelRefreshHours: "Leer cada (horas)",
			intelRefresh: "Refrescar ahora",
			intelRefreshing: "Descargando…",
			intelRefreshError: "No se pudo refrescar",
			intelPlayers: "Jugadores",
			intelTowns: "Ciudades",
			intelAlliances: "Alianzas",
			intelNever: "sin descargar",
			intelNotTracked: "Aún no se anota la actividad: empieza con el bot activado o con Refrescar ahora.",
			intelTrackedPlayers: "jugadores",
			watchTitle: "Jugadores vigilados",
			watchDesc: "Los jugadores con alguna ciudad cerca de las tuyas (sin tu alianza) y los que fijes: puntos, puntos de ataque, cuánto han cambiado en el último día y días sin crecer. Con el interruptor, se anota cada 6 horas con el bot activado. Solo lee.",
			watchEnabled: "Anotar cada 6 horas",
			watchRadius: "Radio (islas, 0 = solo fijados)",
			watchInactiveDays: "Inactivo tras (días)",
			watchLoad: "Actualizar",
			watchPinLabel: "Fijar jugador",
			watchPinPlaceholder: "Nombre o ID",
			watchPin: "Fijar",
			watchUnpin: "Desfijar",
			watchFull: "No caben más jugadores fijados.",
			watchNotFound: "No hay ningún jugador con ese nombre o ID.",
			watchAlready: "Ese jugador ya está fijado.",
			watchNone: "No hay nadie a quien vigilar: sube el radio o fija algún jugador.",
			watchNoAtt: "No se leen los puntos de ataque",
			watchNoHistory: "Aún no hay una anotación anterior: los cambios salen a partir de la siguiente (cada 6 horas).",
			watchDeltaSince: "Cambios desde el",
			watchInactive: "inactivo",
			watchColAlliance: "Alianza",
			watchColAtt: "Ataque",
			watchColDelta: "±",
			monitorTitle: "Monitor IO y MA (beta)",
			monitorDesc: "Sobre las alianzas que elijas. IO: ciudades que pasan de un miembro a otro de la misma alianza (últimos 7 días). MA: miembros que ganan en 6 horas varias veces su defensa habitual. Con el interruptor, lo mira cada 6 horas con el bot activado y lo deja en el registro. Solo lee.",
			monitorEnabled: "Mirar cada 6 horas",
			monitorAddLabel: "Añadir alianza",
			monitorRemove: "Dejar de vigilar",
			monitorNoAlliances: "No vigilas ninguna alianza.",
			monitorFull: "No caben más alianzas.",
			monitorNotFound: "No hay ninguna alianza con ese nombre o ID.",
			monitorAlready: "Esa alianza ya está en la lista.",
			monitorFactor: "Aviso MA a partir de (× lo habitual)",
			monitorMembers: "miembros vigilados",
			monitorLearning: "Aún no hay anotaciones de defensa: el aviso MA necesita un día de anotaciones (una cada 6 horas).",
			monitorTracked: "Defensa anotada desde el",
			monitorIo: "IO: ciudades entre miembros",
			monitorIoNone: "Ninguna ciudad ha cambiado de manos dentro de estas alianzas en 7 días.",
			monitorMa: "MA: defensa en las últimas 6 horas",
			monitorMaNone: "Aún no hay una anotación de hace 6 horas para comparar.",
			monitorColWhen: "Cuándo",
			monitorColFrom: "De",
			monitorColTo: "A",
			monitorColGain: "Defensa 6 h",
			monitorColUsual: "Habitual 6 h",
			monitorColRatio: "×",
			alertsTitle: "Alertas por Discord",
			alertsDesc: "Avisa en Discord de lo que elijas. Solo se envía a los webhooks que pongas aquí; ningún otro dato sale del navegador. Va con su propio interruptor, aunque el bot esté apagado, mientras el juego esté abierto.",
			alertsEnabled: "Enviar alertas",
			alertsWebhook: "Webhook de Discord",
			alertsWebhookPlaceholder: "https://discord.com/api/webhooks/…",
			alertsTypeWebhook: "Webhook propio (opcional)",
			alertsInvalid: "No es un webhook de Discord (https://discord.com/api/webhooks/…).",
			alertsTypeAttacks: "Ataques entrantes",
			alertsTypeConquest: "Ataques que pueden tomar la ciudad (barco colono)",
			alertsTypeCombat: "Acciones de combate del bot",
			alertsTypeFinished: "Edificios e investigaciones terminadas",
			alertsTypeMonitor: "Avisos del monitor IO y MA",
			alertsTest: "Mensaje de prueba",
			alertsTestNone: "Pon antes un webhook.",
			alertsTestSending: "Enviando…",
			alertsTestSent: "Discord lo ha recibido en",
			alertsTestFailed: "Discord no lo ha recibido en todos: mira la pestaña Errores del registro.",
			alertsWebhooks: "webhooks",
			ghostTowns: "Ciudades fantasma",
			ghostTownsDesc: "Ciudades sin dueño cerca de las tuyas, de los datos del mundo.",
			ghostColIsland: "Isla",
			ghostNone: "No hay ciudades fantasma en ese radio.",
			logDesc: "Qué pasa, ciclo a ciclo.",
			soon: "Próximamente",
			soonDesc: "Todavía no está hecho. Esto es lo que irá aquí:",
			soonCulture: "Orfeo: llevar el héroe a la ciudad que va a cobrar cultura",
			soonCulture2: "Misiones de isla: aceptarlas, elegir bando y hacerlas avanzar",
			soonPhase6: "Fase 6 del plan (docs/roadmap.md).",
			soonCombat: "Planificar grupo: varias oleadas con velocidades mixtas",
			soonCombat2: "Defensa: purificar hechizos (falta una captura)",
			soonCityFarms: "Pausa cuando el botín no llena las tropas (falta capturar un informe)",
			soonPhase7: "Fase 7 del plan (docs/roadmap.md).",
			soonIntel: "Registros de ciudades desde informes y botón Monitorizar en el ranking",
			soonPhase8: "Fase 8 del plan (docs/roadmap.md).",
			decrease: "Bajar",
			increase: "Subir",
			importErrors: "Perfiles o datos rechazados:",
			tpl_inicio_cs: "Primera ciudad (hasta barco colono)",
			tpl_naval_ofensiva: "Naval ofensiva (barcos ligeros)",
			tpl_naval_defensiva: "Naval defensiva (birremes)",
			tpl_terrestre_ofensiva: "Terrestre ofensiva",
			tpl_terrestre_defensiva: "Terrestre defensiva",
			recruit: "Reclutamiento",
			recruitDesc: "Con Reclutamiento auto activado, recluta en cada ciudad con perfil hasta el objetivo de cada tropa: un lote por ciclo en el cuartel y otro en el puerto.",
			troops: "Tropas",
			troopBarracks: "Cuartel",
			troopDocks: "Puerto",
			troopAnyGod: "Cualquier dios",
			troopTarget: "Objetivo",
			troopBatch: "Lote mín.",
			troopHave: "hay",
			statusNextRecruit: "tropas",
			rs_done: "objetivo alcanzado",
			rs_ready: "se reclutan",
			rs_ordered: "encargadas",
			rs_waiting: "espera a",
			rs_building: "falta edificio",
			rs_research: "falta investigación",
			rs_god: "falta el dios",
			rs_queueFull: "cola llena",
			rs_population: "falta población",
			rs_resources: "faltan recursos",
			rs_favor: "falta favor",
			rs_away: "tropas de camino",
			rs_unknown: "sin datos",
			rs_noGod: "la ciudad no tiene dios",
			rs_free: "libres",
			res_wood: "madera",
			res_stone: "piedra",
			res_iron: "plata",
			focusAcademyNote: "antes de Conquista",
			focusColonyNote: "investigación y construcción",
			worksInInfo: "Qué hace este perfil en las ciudades que lo usan. Los interruptores de Automatización mandan: apagado allí es apagado aquí.",
			heroes: "Héroes",
			heroesTile: "Enviar héroes a estas ciudades",
			heroesNote: "reciben un héroe libre (Distribución de héroes, en Automatización)",
			peTabBuildings: "Edificios",
			peTabResearch: "Investigación",
			peTabTroops: "Tropas",
			popFloorDesc: "En el umbral, solo se construye la Granja hasta que los niveles de abajo estén en cola.",
			stageMoveLeft: "Mover antes",
			stageMoveRight: "Mover después",
			stageRemove: "Quitar tramo",
			stagesHint: "Se trabaja con el primer tramo sin completar: el siguiente empieza cuando todos sus edificios están alcanzados o en cola.",
			bHintClick: "Haz clic en un edificio para activarlo o desactivarlo",
			bHintLevel: "▲▼ nivel objetivo (Mayús: ±5)",
			hintPriority: "# prioridad, la más baja primero",
			bHintReached: "objetivo alcanzado en",
			levelUp: "Subir nivel",
			levelDown: "Bajar nivel",
			nowLevel: "ahora",
			notBuilt: "sin construir",
			otherStage: "activado en otro tramo",
			rOf: "de",
			rCount: "investigaciones en este perfil",
			statusIn: "Estado en",
			r_done: "Hecho",
			r_queued: "En cola",
			r_ready: "Listo",
			r_academy: "Academia",
			r_points: "Puntos",
			r_resources: "Recursos",
			r_dependency: "Falta otra investigación",
			r_unknown: "Sin datos",
			rWhy_done: "hecha",
			rWhy_queued: "en cola",
			rWhy_ready: "lista",
			rWhy_academy: "falta Academia",
			rWhy_dependency: "falta otra investigación",
			rWhy_points: "faltan puntos",
			rWhy_resources: "faltan recursos",
			rWhy_unknown: "sin datos",
			blk_dependency: "falta",
			blk_group: "ya hay otro especial de su grupo",
			blk_storage: "no cabe en el almacén y el tramo no sube el Almacén",
			blk_population: "sin población y la Granja está al máximo",
			rAll: "Activar todo",
			rNone: "Desactivar todo",
			rAcademy: "Academia",
			rHint: "Haz clic en una investigación para activarla o desactivarla",
			rAvoid: "Evitar: \"Activar todo\" se la salta",
			spells: "Hechizos de reclutamiento",
			spellsInfo: "Se lanza en la ciudad si su dios es el del templo, no está ya activo, el favor llega a \"Desde favor\", la cola de ese edificio tiene al menos \"Espacios libres\" huecos y queda alguna tropa activada de ese edificio que se pueda reclutar (no cuentan las que esperan un edificio, una investigación o el dios, ni si hay tropas de la ciudad de camino). Tras lanzarlo no se repite en esa ciudad en 30 min.",
			spellFrom: "Desde favor",
			spellSlots: "Espacios libres",
			sp_active: "Ya activo",
			sp_noGod: "Sin templo",
			sp_ready: "Listo",
			sp_favor: "Falta favor",
			sp_queue: "Cola llena",
			sp_idle: "Nada que reclutar",
			sp_unknown: "Sin datos",
			favor: "favor",
			tHintClick: "Haz clic en una unidad para activarla o desactivarla",
			tHintTarget: "Casilla: cantidad objetivo",
			tHintBatch: "▣ lote mínimo",
			tHintHave: "tropas en la ciudad (dentro, fuera y en cola)",
			tHaveUnknown: "no se pueden contar las tropas de la ciudad",
			troopMythTitle: "Unidades míticas"
		},
		en: {
			title: "grepo-helper",
			close: "Close",
			sectionAutomation: "Automation",
			sectionEconomy: "Economy",
			general: "Enabled (master switch)",
			dryRun: "Dry run (log actions without sending them)",
			safetyStopped: "Paused",
			stop_captcha: "the server asks for a captcha",
			stop_botcheck: "the server opened a bot check",
			stop_verification: "the server asks for a verification code",
			safetyHint: "Solve it yourself in the game; the script never tries. Then press Resume.",
			safetyResume: "Resume",
			safetyCooldown: "The server asks to wait (HTTP 429/503):",
			autoBuild: "Auto-build",
			autoResearch: "Auto-research",
			autoRecruit: "Auto-recruit",
			heroDispatch: "Hero dispatch",
			pollInterval: "Interval (s)",
			pollFrom: "from",
			pollTo: "to",
			rest: "Rest hours",
			restFrom: "from",
			restTo: "to",
			restNote: "A daily break in your local time. Rest pauses the economy; attacks, supports and defense keep running.",
			freeFinish: "Free finish",
			farmVillages: "Farming villages",
			collectLongest: "Longest cycle before resting",
			autoTrade: "Auto-trade",
			language: "Language",
			modulesNote: "Nothing acts without the Bot on switch in the header: not these tiles, nor Farming villages or Free finish (Island tab).",
			towns: "Town assignment",
			townsDesc: "Which profile each town uses. A town without a profile doesn't research or follow stages; it only builds its Senate queue.",
			noProfile: "No profile",
			refreshTowns: "Refresh towns",
			townsEmpty: "No towns yet: they show up on their own once the game loads them (ITowns.towns).",
			research: "Research",
			researchDesc: "With Auto-research on, queues in each town with a profile the first ready research by priority.",
			researchEmpty: "No results yet.",
			build: "Building",
			buildDesc: "With Auto-build on, queues one level per cycle in each town with a profile, from the first unfinished stage.",
			farmMaxClaims: "Max villages per cycle without Captain",
			farmTowns: "Towns (comma-separated IDs; empty = all)",
			farmNext: "Next collection",
			farmNextNow: "as soon as they are ready",
			farmNextIn: "in",
			farmRunning: "collecting…",
			farmCollectNow: "Collect now",
			farmLastResults: "Last result per town",
			farmDesc: "Collects ready villages from your towns. Skips towns with a full warehouse; with Captain, all in one request. Then waits the chosen interval.",
			farmInterval: "Collection interval",
			farmOptions: "Options",
			freeFinishDesc: "Finishes buildings and research only when the game allows it for free (under 5 min). Never spends gold.",
			autoTradeDesc: "Moves resources from towns with a full queue to towns waiting for resources for their next build (Auto-build), without overflowing the warehouse, counting what is on the way.",
			automationDesc: "Master switches. Off here means off everywhere, whatever a profile says.",
			collapse: "Collapse or expand",
			modeOff: "Off",
			modeDry: "Dry run",
			modeLive: "Live",
			log: "Log",
			clear: "Clear",
			logEmpty: "No entries",
			tab_activity: "Activity",
			tab_market: "Market",
			tab_festivals: "Festivals",
			tab_missions: "Missions",
			tab_errors: "Errors",
			farm_300: "5 min",
			farm_1200: "20 min",
			farm_5400: "1 h 30",
			farm_14400: "4 h",
			profiles: "Profiles",
			profilesDesc: "A town specialization: what it builds, researches and recruits. Templates (🔒) are read-only: duplicate them to edit.",
			profileNew: "New",
			profileDuplicate: "Duplicate",
			profileDelete: "Delete",
			profileDeleteConfirm: "Delete? Click again",
			profileReadOnly: "Template (read-only). Duplicate it to edit.",
			profileName: "Name",
			newProfileName: "New profile",
			copyOf: "Copy of",
			stages: "Building stages",
			stage: "Stage",
			stageAdd: "Add stage",
			stagesEmpty: "No building stages.",
			level: "Level",
			priority: "Priority",
			specials: "Special buildings",
			special1: "Slot 1",
			special2: "Slot 2",
			none: "none",
			specialsNote: "One per slot: enabling another one swaps it. It is built in the stage where you enable it.",
			remove: "Remove",
			budget: "Research points",
			budgetUsed: "Profile",
			budgetOutside: "spent outside the profile",
			budgetNow: "town now",
			budgetAtTarget: "with Academy",
			budgetWarn: "The profile does not fit: it needs more points than the town will have with the profile's Academy.",
			budgetUnknown: "No point data",
			budgetNoData: "No game data.",
			townStatus: "Status per town",
			statusNoData: "no data",
			statusAllDone: "all stages complete",
			statusReached: "targets reached",
			statusQueued: "queued",
			statusBlocked: "blocked",
			statusNextResearch: "next research",
			statusNoTowns: "No town uses this profile.",
			sqTitle: "QUEUE",
			sqEmpty: "Empty: press + on a building.",
			sqPlus: "Add to the grepo-helper queue",
			sqAdd: "Add",
			sqSave: "Save",
			sqRemove: "Remove",
			sqLevel: "Level",
			sqNow: "now",
			sqMaxShort: "max.",
			sqUp: "Move up",
			sqDown: "Move down",
			sqMax: "Already at max level",
			sqOff: "Auto-build is off",
			sqDryRun: "Dry-run mode",
			sqThen: "Then, the profile's stages",
			sq_reached: "done",
			sq_queued: "in the game queue",
			sq_pending: "pending",
			sq_blocked: "blocked",
			tabProfiles: "Profiles",
			tabTrade: "Trade",
			tabIsland: "Island",
			tabCulture: "Culture & quests",
			tabCombat: "Combat",
			tabCityFarms: "City farms",
			tabIntel: "Intel",
			tabActivity: "Activity",
			switchOn: "Bot on",
			switchDry: "Dry run",
			tileBuild: "Auto-build",
			tileResearch: "Auto-research",
			tileRecruit: "Auto-recruit",
			tileHeroes: "Hero dispatch",
			noModule: "no module yet",
			pollSlider: "Poll interval (seconds)",
			pollHint: "Each cycle waits a random time between the two values.",
			allTowns: "All towns",
			townQueue: "Senate queue",
			profileTitle: "Profile",
			profileRename: "Rename",
			profileExport: "Export",
			profileImport: "Import",
			exportHint: "Copy this text to keep the profile or take it to another world.",
			importHint: "Paste exported profiles here and press Import.",
			importOk: "Imported",
			importNone: "Nothing was imported.",
			save: "Save",
			cancel: "Cancel",
			buildFocus: "Build focus",
			focusAcademy: "Academy 28 first",
			focusColony: "Colony ship first",
			worksIn: "Works in these towns",
			pauseBuild: "Building",
			pauseResearch: "Research",
			pauseRecruit: "Recruitment",
			popFloor: "Population threshold",
			popFloorOn: "Population threshold on",
			popFloorMin: "Free population threshold",
			popFloorFarm: "Farm levels to build",
			buildings: "Buildings",
			tradeDonorFill: "Donor warehouse fill (min %)",
			tradeReserve: "Keep in donor warehouse (%)",
			tradeMinSend: "Minimum shipment (resources)",
			tradeMaxTransfers: "Max transfers per cycle",
			tradePool: "Emergency pool",
			tradePoolDesc: "With Auto-trade on, all other towns pour what they have into the target town, with no minimum fill or reserve, until its warehouse is full (an allied town’s warehouse can’t be read). While on, normal trading stops.",
			tradePoolTarget: "Target town",
			tradePoolNone: "— choose —",
			tradePoolOther: "Other town (ID)",
			tradePoolId: "Town ID",
			tradeResults: "Latest trade",
			villageTrade: "Farm village trade",
			villageTradeDesc: "Buys from farm villages on the same island what a town lacks for its next build (Auto-build), paying with what the village asks for without touching what that build needs. Stops when the ratio drops below the minimum.",
			villageMinRatio: "Minimum ratio",
			villageMinAmount: "Minimum purchase (resources)",
			marketTitle: "Market between players",
			marketDesc: "Accepts offers from other players that even out a town’s warehouse, at the price and delivery time you set, and publishes offers with what is left over. It runs after own trade and villages. Never gold.",
			marketPending: "Accepting offers is verified: with Simulation off it really accepts, paying each offer in full and never with gold. Publishing and withdrawing own offers wait on a capture (instrucciones.md §3, A.5): in simulation it only notes what it would do in the Market tab of the log, and in real mode nothing is published.",
			marketEnabled: "Accept offers",
			marketBalance: "Even out with own offers",
			marketMaxPay: "Max. pay per 1 received",
			marketOverflowPay: "Max. pay if what you pay fills the warehouse",
			marketDelivery: "Max. delivery (min)",
			marketMinTrade: "Minimum trade",
			marketTrades: "Trades per round",
			marketWithdraw: "Withdraw own after (h, 0 = never)",
			marketPartners: "With whom",
			marketPartnersNotEnemies: "Everyone but enemies",
			marketPartnersAll: "Everyone",
			marketPartnersAlliancePacts: "Alliance and pacts",
			marketPartnersAlliance: "Only my alliance",
			marketView: "See offers (current town)",
			marketOffers: "offers",
			marketOwnOffers: "Own offers published",
			marketWouldPublish: "Would publish",
			marketWouldAccept: "would accept",
			marketColGet: "You get",
			marketColPay: "You pay",
			marketColRatio: "Price",
			marketColTime: "Delivery",
			marketColVerdict: "What it would do",
			marketReasonType: "not wood, stone or silver",
			marketReasonPartner: "not your alliance",
			marketReasonUnknownPact: "unverified relation",
			marketReasonDelivery: "takes too long",
			marketReasonMinTrade: "below the minimum",
			marketReasonBalance: "does not even out the warehouse",
			marketReasonRatio: "too expensive",
			marketReasonCapacity: "not enough traders",
			marketReasonResources: "resources not read",
			villageExpansion: "Expand farm villages",
			villageExpansionDesc: "Spends battle points (never gold) to unlock the farm villages on your islands and then upgrade them, all one level before moving to the next, up to the maximum level. Never goes below the reserve.",
			villageMaxLevel: "Maximum level",
			villageReservePoints: "Battle point reserve",
			expansionResults: "Latest expansion",
			hide: "Silver to the cave",
			hideDesc: "When a town fills its warehouse with silver, stores the given amount in the cave, never more than fits. Stored silver cannot be taken out (it is only for spying) and is safe from plundering.",
			hideAmount: "Silver per deposit",
			hideTowns: "Towns",
			hideResults: "Latest deposit",
			heroesDesc: "Sends free heroes (no town, not injured) to the towns whose profile has “Send heroes to these towns”, until each has its own. A hero already in another town is never moved. Same switch as the Automation tile.",
			heroesResults: "Latest dispatches",
			festivals: "Festivals",
			festivalsDesc: "Starts the ticked festivals that are not already running in the chosen towns. The triumph costs 300 battle points; the theater and the city festival cost resources, and only when the town is not waiting for resources for its next build.",
			festivalTriumph: "Triumph (300 battle points)",
			festivalTriumphMin: "Only with at least this many free points",
			festivalTheater: "Theater (resources, needs a Theater)",
			festivalParty: "City festival (resources, Academy 30)",
			festivalOlympic: "The Olympic Games cost gold: never started.",
			festivalTowns: "Towns",
			festivalTownsAll: "All",
			festivalTownsNone: "None",
			festivalResults: "Latest festivals",
			bandits: "Bandit camp",
			banditsDesc: "From the chosen town, attacks the next wave with every troop at home of the ticked types, once the camp is no longer cooling down and no other attack is under way. It only attacks when the game simulator predicts a win against the camp defenders with the worst luck. The reward goes to the inventory when it can; otherwise it is used.",
			banditTown: "Attacking town (the one on the camp island)",
			banditTownNone: "Choose a town",
			banditUnits: "Troops sent (no swordsmen or archers)",
			banditResults: "Latest result",
			missions: "Quests",
			missionsDesc: "Collects finished quests. Never closes one early.",
			missionBeginner: "Beginner quests: collect finished ones (from the open town)",
			missionIsland: "Island quests: stash the reward of finished ones in the inventory (left uncollected if it does not fit)",
			missionResults: "Latest quests",
			scheduledSpells: "Scheduled spells",
			scheduledSpellsDesc: "Casts each spell at its exact time on the server clock, on one of your towns or someone else's by ID. Keeps running during rest hours. With the game tab in the background the browser may delay it by up to a minute; after 90 s it is given up.",
			spellTarget: "Town (ID; yours are in the list)",
			spellPower: "Spell (game ID)",
			spellAt: "Exact time (your browser's)",
			spellRepeat: "Repeat every (min; 0 = once)",
			spellAdd: "Add",
			spellRemove: "Remove",
			spellList: "Scheduled",
			spellEmpty: "No scheduled spells.",
			spellEvery: "every",
			spellInvalid: "Check the town, the spell, the time and how often it repeats.",
			spellFull: "There are already 50 scheduled spells: remove some.",
			timedCommands: "Timed attacks",
			timedCommandsDesc: "Attacks and supports that land at an exact time on the server clock: it sends them, reads the arrival and, if it falls outside the tolerance, cancels and sends again. Whatever cannot be fixed in time is withdrawn.",
			timedType: "Type",
			timedAttack: "Attack",
			timedSupport: "Support",
			timedFrom: "From",
			timedTarget: "Target (town ID; yours are in the list)",
			timedUnits: "Troops",
			timedNoUnits: "No troops can be read in that town.",
			timedArrival: "Arrival (your browser's time)",
			timedEarly: "Tolerance before (s)",
			timedLate: "Tolerance after (s)",
			timedTravel: "Travel time (H:MM:SS; empty = read it from the game)",
			timedPower: "Spell once fixed (optional)",
			timedAdd: "Schedule",
			timedRemove: "Remove",
			timedList: "Queue",
			timedEmpty: "Nothing scheduled.",
			timedInvalid: "Check the origin, target, troops, arrival, tolerance, travel time and spell.",
			timedFull: "There are already 50 scheduled: remove some.",
			timedOk: "Success",
			timedFail: "Failure",
			timedClear: "Clear",
			timedNone: "None.",
			tsArriveAt: "Arrive at",
			tsSchedule: "Schedule",
			tsBadTime: "Invalid time (hh 0-23; mm and ss 0-59).",
			tsNoUnits: "Type the troops above.",
			tsNoTab: "The target is unknown: close the tab and open it again.",
			tsScheduled: "queued, lands on",
			tsTurnOn: "To have it sent, turn on in the panel",
			tsFarmTurnOn: "To have it attack, turn on in the panel",
			tsTab: "tab",
			tsHeader: "at the very top",
			tsAnd: "and",
			tsDryRun: "Simulation is on: it is only written to the log, nothing is sent.",
			tsWillSend: "It will be sent automatically on time.",
			tsAddFarm: "Add to farmlist",
			tsFarmOnlyAttack: "Targets are added to the farmlist only from the Attack tab.",
			tsFarmNoUnits: "Type the troops above or create a raid template first.",
			tsFarmAdded: "added to the farmlist with the template",
			groupPlan: "Group planning (beta)",
			groupPlanDesc: "Plans an attack or support from every town of a profile so they land together. Nothing is sent: once confirmed, the plan goes to the Timed attacks queue.",
			groupProfile: "Group (profile)",
			groupOffense: "Offense and naval escort",
			groupDefense: "Defense and defensive ships",
			groupAll: "Everything",
			groupArrival: "Arrival (empty = as soon as possible for the whole group)",
			groupCalc: "Calculate",
			groupCalculating: "Calculating…",
			groupArrivalAt: "Arrival:",
			groupTravel: "travel",
			groupConfirm: "Confirm",
			groupNothing: "No town of the group can go.",
			groupAdded: "Moved to the Timed attacks queue; turn it on so it gets sent",
			groupInvalid: "Pick the profile and check the target, arrival and margins.",
			groupError: "Could not calculate",
			defense: "Defense",
			defenseDesc: "Attacks coming to your towns, who sends them, militia and dodging. Nothing is done against ignored ones.",
			defenseMilitiaSeconds: "Request militia when less than (s) remain",
			defenseMilitiaTowns: "Request militia in",
			defenseIgnore: "Do nothing against",
			defenseIgnorePlayers: "Players (comma separated)",
			defenseIgnoreAlliances: "Alliances (comma separated)",
			defenseIgnoreOwn: "My alliance",
			defenseAttacks: "Incoming attacks",
			defenseNoAttacks: "No attack is coming.",
			defenseUnknown: "unknown attacker",
			defenseNoOwner: "town without owner",
			defenseColony: "colony ship",
			defenseIgnored: "ignored",
			defenseResults: "Last result",
			defenseDodge: "Dodge",
			defenseDodgeNote: "A few seconds before impact, troops leave as support to another town and the command is cancelled so they are back once it has passed.",
			dodgeMixed: "Mixed units when dodging",
			dodgeMixed_offense: "Offense",
			dodgeMixed_defense: "Defense",
			dodgeMixed_both: "Both",
			dodgeTown: "Town",
			dodgeEnabled: "Dodge in this town",
			dodgeLand: "Move land troops",
			dodgeFleet: "Move the fleet",
			dodgeSeparate: "Land and fleet separately",
			dodgeUnits: "Which troops",
			dodgeUnits_offense: "Offense",
			dodgeUnits_defense: "Defense",
			dodgeUnits_all: "All",
			dodgeBefore: "Leave before impact (s)",
			dodgeDestination: "Destination",
			dodgeDest_nearest: "Nearest own town",
			dodgeDest_random: "Random nearby town",
			dodgeDest_town: "A specific town (ID)",
			dodgeDestinationId: "Destination town ID",
			dodgeReturn: "Return",
			dodgeReturn_impact: "After the impact",
			dodgeReturn_beforeColony: "Before the colony ship",
			dodgeReturn_afterColony: "After the colony ship",
			dodgeOffset: "Return margin (s)",
			dodgeBacksnipe: "Backsnipe: attack their town when their troops are back",
			dodgeBacksnipeOffset: "Arrive after their return (s)",
			dodgeCopyAll: "Copy to all towns",
			dodgeOn: "Dodging in",
			dodgeNone: "No town dodges.",
			defenseSpell: "Spell on attacks",
			defenseSpellNote: "One per attack, in the marked towns. Which spells an attack accepts is not known yet: check the last result.",
			defenseSpellOn: "Cast a spell on attacks",
			defenseSpellPower: "Spell",
			defenseSpellWhen: "When",
			spellWhen_midway: "Halfway",
			spellWhen_end: "At the end",
			defenseSpellSeconds: "Seconds before impact",
			defenseSpellTowns: "On attacks to",
			cityFarm: "City farming",
			cityFarmDesc: "Attacks the farmlist towns again and again with their template troops, when they are at home. A target switches itself off if its owner changes.",
			cfAdd: "Add target",
			cfAddNote: "Also from the town’s Attack tab in the game, with “Add to farmlist”.",
			cfTarget: "Target town (ID)",
			cfFrom: "From",
			cfTemplate: "Template",
			cfAddButton: "Add",
			cfInvalid: "Type the ID of a town that is not yours and pick the origin and the template.",
			cfDuplicate: "That target is already on the farmlist from that town.",
			cfFull: "The farmlist is full.",
			cfNoTemplates: "Create a raid template first.",
			cfList: "Farmlist",
			cfEmpty: "The farmlist is empty.",
			cfSends: "sent",
			cfOff: "off",
			cfOwnerChanged: "owner changed: off",
			cfPending: "pending",
			cfRemove: "Remove from the farmlist",
			cfSearch: "Search targets (beta)",
			cfSearchDesc: "Other players’ towns near yours, from players who are not growing. It only reads the world data; it does not attack.",
			cfSearchRadius: "Radius (islands)",
			cfSearchInactive: "Days not growing (min.)",
			cfSearchMaxPlayer: "Player points (max.)",
			cfSearchMaxTown: "Town points (max.)",
			cfSearchNoLimit: "no limit",
			cfSearchGhosts: "Include ghost towns (no owner)",
			cfSearchOwnAlliance: "Without my alliance",
			cfSearchTemplate: "Template to add with",
			cfSearchGo: "Search",
			cfSearching: "Searching…",
			cfSearchError: "Could not search",
			cfSearchNoHistory: "No activity readings yet: with days not growing > 0 nobody will show up until those days have passed.",
			cfSearchTracked: "Activity tracked since",
			cfSearchDays: "days",
			cfSearchNone: "No town matches the filters.",
			cfSearchShowing: "Showing the closest:",
			cfSearchAdded: "Added",
			cfColTown: "Town",
			cfColPlayer: "Player",
			cfColPoints: "Points",
			cfColInactive: "Not growing",
			cfColIslands: "Islands",
			cfColFrom: "From",
			cfColSends: "Sends",
			cfGhost: "ghost",
			raidTemplates: "Raid templates (beta)",
			raidTemplatesDesc: "The troops of each attack. In yellow, targets on another island than their origin: the template needs transport ships.",
			raidNew: "New template",
			raidName: "Template name",
			raidDefaultName: "Raid",
			raidDuplicate: "Duplicate",
			raidCopy: "copy",
			raidDelete: "Delete",
			raidInUse: "Farmlist targets use it: change their template before deleting it.",
			raidMyth: "Mythical",
			raidUsedBy: "Used by",
			raidUnused: "No target uses it.",
			raidFar: "Another island: transport ships are needed",
			raidEmpty: "No templates.",
			raidFull: "No room for more raid templates.",
			intelWorld: "World data",
			intelWorldDesc: "The world’s players, towns and alliances, which the game publishes every hour. Used by Search targets, defence and player activity. Read only.",
			intelRefreshHours: "Read every (hours)",
			intelRefresh: "Refresh now",
			intelRefreshing: "Downloading…",
			intelRefreshError: "Could not refresh",
			intelPlayers: "Players",
			intelTowns: "Towns",
			intelAlliances: "Alliances",
			intelNever: "not downloaded",
			intelNotTracked: "Activity is not tracked yet: it starts with the bot on or with Refresh now.",
			intelTrackedPlayers: "players",
			watchTitle: "Watched players",
			watchDesc: "Players with a town near yours (not your alliance) and the ones you pin: points, attack points, how much they changed in the last day and days not growing. With the switch on, it is noted every 6 hours while the bot is on. Read only.",
			watchEnabled: "Note every 6 hours",
			watchRadius: "Radius (islands, 0 = pinned only)",
			watchInactiveDays: "Inactive after (days)",
			watchLoad: "Update",
			watchPinLabel: "Pin player",
			watchPinPlaceholder: "Name or ID",
			watchPin: "Pin",
			watchUnpin: "Unpin",
			watchFull: "No room for more pinned players.",
			watchNotFound: "There is no player with that name or ID.",
			watchAlready: "That player is already pinned.",
			watchNone: "Nobody to watch: raise the radius or pin a player.",
			watchNoAtt: "Attack points cannot be read",
			watchNoHistory: "No earlier note yet: changes show from the next one (every 6 hours).",
			watchDeltaSince: "Changes since",
			watchInactive: "inactive",
			watchColAlliance: "Alliance",
			watchColAtt: "Attack",
			watchColDelta: "±",
			monitorTitle: "IO and MA monitor (beta)",
			monitorDesc: "On the alliances you pick. IO: towns passing from one member to another of the same alliance (last 7 days). MA: members gaining several times their usual defence in 6 hours. With the switch on, it checks every 6 hours while the bot is on and writes it to the log. Read only.",
			monitorEnabled: "Check every 6 hours",
			monitorAddLabel: "Add alliance",
			monitorRemove: "Stop watching",
			monitorNoAlliances: "You are not watching any alliance.",
			monitorFull: "No room for more alliances.",
			monitorNotFound: "There is no alliance with that name or ID.",
			monitorAlready: "That alliance is already on the list.",
			monitorFactor: "MA alert from (× usual)",
			monitorMembers: "members watched",
			monitorLearning: "No defence notes yet: the MA alert needs a day of notes (one every 6 hours).",
			monitorTracked: "Defence noted since",
			monitorIo: "IO: towns between members",
			monitorIoNone: "No town changed hands inside these alliances in 7 days.",
			monitorMa: "MA: defence in the last 6 hours",
			monitorMaNone: "No note from 6 hours ago to compare with yet.",
			monitorColWhen: "When",
			monitorColFrom: "From",
			monitorColTo: "To",
			monitorColGain: "Defence 6 h",
			monitorColUsual: "Usual 6 h",
			monitorColRatio: "×",
			alertsTitle: "Discord alerts",
			alertsDesc: "Sends what you pick to Discord. It only goes to the webhooks you set here; no other data leaves the browser. It has its own switch and works with the bot off, while the game is open.",
			alertsEnabled: "Send alerts",
			alertsWebhook: "Discord webhook",
			alertsWebhookPlaceholder: "https://discord.com/api/webhooks/…",
			alertsTypeWebhook: "Own webhook (optional)",
			alertsInvalid: "Not a Discord webhook (https://discord.com/api/webhooks/…).",
			alertsTypeAttacks: "Incoming attacks",
			alertsTypeConquest: "Attacks that can take the town (colony ship)",
			alertsTypeCombat: "Bot combat actions",
			alertsTypeFinished: "Finished buildings and research",
			alertsTypeMonitor: "IO and MA monitor notices",
			alertsTest: "Test message",
			alertsTestNone: "Set a webhook first.",
			alertsTestSending: "Sending…",
			alertsTestSent: "Discord received it on",
			alertsTestFailed: "Discord did not receive it on all of them: see the Errors tab in the log.",
			alertsWebhooks: "webhooks",
			ghostTowns: "Ghost towns",
			ghostTownsDesc: "Towns without an owner near yours, from the world data.",
			ghostColIsland: "Island",
			ghostNone: "No ghost towns within that radius.",
			logDesc: "What is happening, cycle by cycle.",
			soon: "Coming soon",
			soonDesc: "Not built yet. This is what will go here:",
			soonCulture: "Orpheus: move the hero to the town about to collect culture",
			soonCulture2: "Island quests: accept them, pick a side and progress them",
			soonPhase6: "Phase 6 of the plan (docs/roadmap.md).",
			soonCombat: "Group planning: several waves with mixed speeds",
			soonCombat2: "Defense: cleansing spells (needs a capture)",
			soonCityFarms: "Pause when the loot does not fill the troops (needs a report capture)",
			soonPhase7: "Phase 7 of the plan (docs/roadmap.md).",
			soonIntel: "Town records from reports and a Monitor button in the ranking",
			soonPhase8: "Phase 8 of the plan (docs/roadmap.md).",
			decrease: "Decrease",
			increase: "Increase",
			importErrors: "Rejected profiles or data:",
			tpl_inicio_cs: "First city (until colony ship)",
			tpl_naval_ofensiva: "Naval offensive (light ships)",
			tpl_naval_defensiva: "Naval defensive (biremes)",
			tpl_terrestre_ofensiva: "Land offensive",
			tpl_terrestre_defensiva: "Land defensive",
			recruit: "Recruiting",
			recruitDesc: "With Auto-recruit on, recruits in each town with a profile up to each troop target: one batch per cycle in the barracks and another in the harbor.",
			troops: "Troops",
			troopBarracks: "Barracks",
			troopDocks: "Harbor",
			troopAnyGod: "Any god",
			troopTarget: "Target",
			troopBatch: "Min. batch",
			troopHave: "now",
			statusNextRecruit: "troops",
			rs_done: "target reached",
			rs_ready: "to recruit",
			rs_ordered: "ordered",
			rs_waiting: "waits for",
			rs_building: "building missing",
			rs_research: "research missing",
			rs_god: "god missing",
			rs_queueFull: "queue full",
			rs_population: "not enough population",
			rs_resources: "not enough resources",
			rs_favor: "not enough favor",
			rs_away: "troops on the move",
			rs_unknown: "no data",
			rs_noGod: "the town has no god",
			rs_free: "free",
			res_wood: "wood",
			res_stone: "stone",
			res_iron: "silver",
			focusAcademyNote: "before Conquest",
			focusColonyNote: "research and building",
			worksInInfo: "What this profile does in the towns that use it. The Automation switches win: off there means off here.",
			heroes: "Heroes",
			heroesTile: "Send heroes to these towns",
			heroesNote: "get a free hero (Hero dispatch, in Automation)",
			peTabBuildings: "Buildings",
			peTabResearch: "Research",
			peTabTroops: "Troops",
			popFloorDesc: "At the threshold, only the Farm is built until the levels below are queued.",
			stageMoveLeft: "Move earlier",
			stageMoveRight: "Move later",
			stageRemove: "Remove stage",
			stagesHint: "Work goes to the first unfinished stage: the next one starts when all its buildings are reached or queued.",
			bHintClick: "Click a building to enable or disable it",
			bHintLevel: "▲▼ target level (Shift: ±5)",
			hintPriority: "# priority, lowest first",
			bHintReached: "target reached in",
			levelUp: "Level up",
			levelDown: "Level down",
			nowLevel: "now",
			notBuilt: "not built",
			otherStage: "enabled in another stage",
			rOf: "of",
			rCount: "researches in this profile",
			statusIn: "Status in",
			r_done: "Done",
			r_queued: "Queued",
			r_ready: "Ready",
			r_academy: "Academy",
			r_points: "Points",
			r_resources: "Resources",
			r_dependency: "Needs another research",
			r_unknown: "No data",
			rWhy_done: "done",
			rWhy_queued: "queued",
			rWhy_ready: "ready",
			rWhy_academy: "Academy too low",
			rWhy_dependency: "needs another research",
			rWhy_points: "not enough points",
			rWhy_resources: "not enough resources",
			rWhy_unknown: "no data",
			blk_dependency: "needs",
			blk_group: "another special of its group is built",
			blk_storage: "does not fit in the warehouse and the stage does not raise the Warehouse",
			blk_population: "no population and the Farm is at its maximum",
			rAll: "Enable all",
			rNone: "Disable all",
			rAcademy: "Academy",
			rHint: "Click a research to enable or disable it",
			rAvoid: "Avoid: \"Enable all\" skips it",
			spells: "Recruitment spells",
			spellsInfo: "Cast in the town when the temple has its god, it is not active yet, favor reaches \"From favor\", the queue of that building has at least \"Free slots\" free and an enabled troop of that building can still be recruited (not one waiting for a building, a research or its god, and not while troops of the town are on the way). Once cast, it is not cast again in that town for 30 min.",
			spellFrom: "From favor",
			spellSlots: "Free slots",
			sp_active: "Already active",
			sp_noGod: "No temple",
			sp_ready: "Ready",
			sp_favor: "Needs favor",
			sp_queue: "Queue full",
			sp_idle: "Nothing to recruit",
			sp_unknown: "No data",
			favor: "favor",
			tHintClick: "Click a unit to enable or disable it",
			tHintTarget: "Box: target amount",
			tHintBatch: "▣ min. batch",
			tHintHave: "troops in the town (home, away and queued)",
			tHaveUnknown: "the town troops cannot be counted",
			troopMythTitle: "Mythical units"
		}
	};
	var LANGUAGE_NAMES = {
		es: "Español",
		en: "English"
	};
	function t(lang, key) {
		return DICTIONARIES[lang][key];
	}
	function tabKey(tab) {
		return `tab_${tab}`;
	}
	var PROFILES_EXPORT_FORMAT = "grepo-helper/profiles";
	function exportProfiles(settings, ids, now = new Date()) {
		const selected = {};
		for (const id of ids ?? Object.keys(settings.profiles)) {
			const profile = resolveProfile(settings, id);
			if (profile) selected[id] = profile;
		}
		const data = {
			format: PROFILES_EXPORT_FORMAT,
			version: 3,
			exportedAt: now.toISOString(),
			profiles: selected
		};
		return JSON.stringify(data, null, 2);
	}
	var PROFILE_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
	function freeId(id, taken) {
		const isTaken = (candidate) => candidate in taken || isPredefinedProfileId(candidate);
		if (!isTaken(id)) return id;
		let n = 2;
		while (isTaken(`${id}-${n}`)) n += 1;
		return `${id}-${n}`;
	}
	function importProfiles(settings, json, options = {}) {
		const fail = (msg) => ({
			settings,
			imported: [],
			errors: [msg]
		});
		let data;
		try {
			data = JSON.parse(json);
		} catch (err) {
			return fail(`JSON no válido: ${String(err)}`);
		}
		if (!isRecord$4(data)) return fail("el JSON debe ser un objeto");
		if (data.format !== "grepo-helper/profiles") return fail(`formato desconocido: ${String(data.format)}`);
		if (typeof data.version !== "number" || data.version > 3) return fail(`versión de exportación no soportada: ${String(data.version)}`);
		if (!isRecord$4(data.profiles)) return fail("falta el objeto \"profiles\"");
		const profiles = { ...settings.profiles };
		const imported = [];
		const errors = [];
		for (const [id, raw] of Object.entries(data.profiles)) {
			if (!PROFILE_ID_RE.test(id)) {
				errors.push(`profiles.${id}: ID no válido (letras, números, - y _)`);
				continue;
			}
			const v2 = data.version < 2 ? migrateProfileV1toV2(raw) : raw;
			const result = parseProfile(data.version < 3 ? migrateProfileV2toV3(v2) : v2, `profiles.${id}`);
			if (!result.profile) {
				errors.push(...result.errors);
				continue;
			}
			const target = options.overwrite && !isPredefinedProfileId(id) ? id : freeId(id, profiles);
			profiles[target] = result.profile;
			imported.push(target);
		}
		return {
			settings: {
				...settings,
				profiles
			},
			imported,
			errors
		};
	}
	function localBuildingName(lang, id) {
		return lang === "es" ? buildingName(id) : buildingNameEn(id);
	}
	function blockText(lang, reason) {
		switch (reason.kind) {
			case "dependency": return `${t(lang, "blk_dependency")} ${localBuildingName(lang, reason.building)}${reason.level > 0 ? ` ${reason.level}` : ""}`;
			case "group": return t(lang, "blk_group");
			case "storage": return t(lang, "blk_storage");
			case "population": return t(lang, "blk_population");
		}
	}
	function researchBudget(input) {
		const { profile } = input;
		const avoid = new Set(profile.avoidResearches);
		const list = profile.researches.filter((id) => !avoid.has(id));
		let used = 0;
		const unknown = [];
		for (const id of list) {
			const p = input.pointsOf(id);
			if (p === null) unknown.push(id);
			else used += p;
		}
		let spentOutside = 0;
		for (const id of input.done) {
			if (list.includes(id)) continue;
			spentOutside += input.pointsOf(id) ?? 0;
		}
		let academyTarget = input.levels?.academy ?? 0;
		let libraryTarget = input.levels?.library ?? 0;
		for (const stage of profile.buildStages) for (const [key, t] of Object.entries(stage.targets)) {
			const building = resolveStageKey(key, profile.specialBuildings);
			if (building === "academy") academyTarget = Math.max(academyTarget, t.level);
			if (building === "library") libraryTarget = Math.max(libraryTarget, t.level);
		}
		academyTarget = Math.min(academyTarget, maxLevelOf(input, "academy"));
		libraryTarget = Math.min(libraryTarget, maxLevelOf(input, "library"));
		const ppl = input.pointsPerLevel;
		const availableNow = ppl && input.levels ? (input.levels.academy ?? 0) * ppl.academy + (input.levels.library ?? 0) * ppl.library : null;
		const availableAtTarget = ppl ? academyTarget * ppl.academy + libraryTarget * ppl.library : null;
		return {
			used,
			spentOutside,
			unknown,
			availableNow,
			availableAtTarget,
			academyTarget,
			fits: availableAtTarget === null ? null : used + spentOutside <= availableAtTarget
		};
	}
	var FOCUS_KEYS = [
		"action",
		"field",
		"toggle",
		"profileChip",
		"townFilter",
		"townProfile",
		"view",
		"tab",
		"interval",
		"collapse",
		"peTab",
		"stageChip"
	];
	function createKit(ctx) {
		const { el, listen, store, root } = ctx;
		let idSeq = 0;
		const newId = () => `gh-${++idSeq}`;
		function keepFocus(fn) {
			const active = root.activeElement;
			const key = active ? FOCUS_KEYS.find((k) => active.dataset[k] !== void 0) : void 0;
			const value = key && active ? active.dataset[key] : void 0;
			const oldAlt = active?.dataset.focusAlt;
			fn();
			if (!active || !key || active.isConnected) return;
			const attr = `data-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
			const next = [...root.querySelectorAll(`[${attr}]`)].find((e) => e.dataset[key] === value && !e.closest("[hidden]"));
			if (!next) {
				const altEl = oldAlt ? root.querySelector(oldAlt) : null;
				if (altEl && usable(altEl)) altEl.focus();
				return;
			}
			if (!isDisabled(next)) {
				next.focus();
				return;
			}
			const alt = next.dataset.focusAlt;
			const altEl = alt ? root.querySelector(alt) : null;
			(altEl && usable(altEl) ? altEl : nearestFocusable(next))?.focus();
		}
		const FOCUSABLE = "button, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
		function isDisabled(e) {
			return e.matches(":disabled");
		}
		function usable(e) {
			return e instanceof HTMLElement && e.matches(FOCUSABLE) && !isDisabled(e) && !e.closest("[hidden]");
		}
		function nearestFocusable(from) {
			const siblings = [...from.parentElement?.children ?? []];
			const i = siblings.indexOf(from);
			for (let d = 1; d < siblings.length; d++) for (const s of [siblings[i - d], siblings[i + d]]) if (s && usable(s)) return s;
			for (let box = from.parentElement; box; box = box.parentElement) {
				const found = [...box.querySelectorAll(FOCUSABLE)].find((e) => e !== from && usable(e));
				if (found) return found;
				if (box.matches("[tabindex]")) return box;
			}
			return null;
		}
		function toggleInput(id, get, set) {
			const input = el("input");
			input.type = "checkbox";
			input.dataset.toggle = id;
			listen(input, "change", () => {
				store.update((s) => {
					set(s, input.checked);
				});
			}, "ajuste");
			ctx.syncers.push((s) => {
				input.checked = get(s);
			});
			return input;
		}
		function switchRow(id, text, get, set) {
			const label = el("label", { className: "opt" });
			const vis = el("span", { className: "switch-vis" });
			vis.append(toggleInput(id, get, set), el("span", { className: "track" }));
			label.append(el("span", { textContent: text }), vis);
			return label;
		}
		function switchOnly(id, text, get, set) {
			const label = el("label", {
				className: "switch",
				title: text
			});
			const input = toggleInput(id, get, set);
			input.setAttribute("aria-label", text);
			label.append(input, el("span", { className: "track" }));
			return label;
		}
		function tile(spec, get, set) {
			const label = el("label", { className: "tile" });
			label.dataset.tile = spec.id;
			const input = toggleInput(spec.id, get, set);
			if (spec.soon) {
				label.dataset.soon = "";
				ctx.syncers.push((s) => {
					input.disabled = !get(s);
				});
			}
			label.append(input, el("span", {
				className: "tile-ico",
				textContent: spec.icon
			}), el("span", {
				className: "tile-lbl",
				textContent: spec.label
			}));
			if (spec.note) label.append(el("small", { textContent: spec.note }));
			return label;
		}
		function numberInput(id, min, max, get, set, label) {
			const input = el("input");
			input.type = "number";
			input.min = String(min);
			input.max = String(max);
			input.dataset.field = id;
			if (label) input.setAttribute("aria-label", label);
			listen(input, "change", () => {
				const value = Math.round(Number(input.value));
				if (input.value === "" || !Number.isFinite(value) || value < min || value > max) {
					input.value = String(get(store.get()));
					return;
				}
				store.update((s) => {
					set(s, value);
				});
			}, "ajuste");
			ctx.syncers.push((s) => {
				if (root.activeElement !== input) input.value = String(get(s));
			});
			return input;
		}
		function slider(id, text, range, get, set, format = (v) => String(v), opts = {}) {
			const wrap = el("div", { className: "slider" });
			const labelId = newId();
			const input = el("input");
			input.type = "range";
			input.min = String(range.min);
			input.max = String(range.max);
			input.step = String(range.step ?? 1);
			input.dataset.field = id;
			input.setAttribute("aria-labelledby", labelId);
			const value = el("span", { className: "slider-val" });
			let out = null;
			if (opts.number) {
				const box = numberInput(opts.number.id, range.min, opts.number.max, get, set, text);
				value.append(box);
			} else {
				out = el("output");
				value.append(out);
			}
			value.append(...opts.after ?? []);
			listen(input, "input", () => {
				if (out) out.textContent = format(Number(input.value), store.get());
			}, "ajuste");
			listen(input, "change", () => {
				const v = Number(input.value);
				store.update((s) => {
					set(s, v);
				});
			}, "ajuste");
			ctx.syncers.push((s) => {
				const cur = get(s);
				input.min = String(Math.min(range.min, cur));
				input.max = String(Math.max(range.max, cur));
				if (root.activeElement !== input) input.value = String(cur);
				input.setAttribute("aria-valuetext", format(cur, s));
				if (out) out.textContent = format(cur, s);
			});
			const label = el("span", {
				className: "lbl",
				textContent: text
			});
			label.id = labelId;
			wrap.append(label, input, value);
			return wrap;
		}
		function stepper(id, text, range, get, set) {
			const wrap = el("span", { className: "stepper" });
			wrap.dataset.field = id;
			wrap.setAttribute("role", "group");
			wrap.setAttribute("aria-label", text);
			const out = el("output");
			out.setAttribute("aria-live", "polite");
			const step = (delta, symbol, action, label) => {
				const b = el("button", {
					textContent: symbol,
					title: label
				});
				b.type = "button";
				b.dataset.action = action;
				b.setAttribute("aria-label", label);
				listen(b, "click", () => {
					const cur = get(store.get());
					const next = Math.min(range.max, Math.max(range.min, cur + delta));
					if (next === cur) return;
					store.update((s) => {
						set(s, next);
					});
				}, "ajuste");
				return b;
			};
			const minus = step(-1, "−", `${id}Down`, ctx.tr("decrease"));
			const plus = step(1, "+", `${id}Up`, ctx.tr("increase"));
			ctx.syncers.push((s) => {
				const v = get(s);
				out.textContent = String(v);
				minus.disabled = v <= range.min;
				plus.disabled = v >= range.max;
			});
			wrap.append(minus, out, plus);
			return wrap;
		}
		function field(text, ...controls) {
			const div = el("div");
			const label = el("span", {
				className: "lbl",
				textContent: text
			});
			label.id = newId();
			for (const c of controls) {
				if (c.hasAttribute("aria-label") || c.hasAttribute("aria-labelledby")) continue;
				if (!(c instanceof HTMLInputElement || c instanceof HTMLSelectElement)) c.setAttribute("role", "group");
				c.setAttribute("aria-labelledby", label.id);
			}
			div.append(label, ...controls);
			return div;
		}
		function row(...children) {
			const div = el("div", { className: "row" });
			div.append(...children);
			return div;
		}
		function sub(title, ...children) {
			const box = el("div", { className: "sub" });
			box.append(el("h3", { textContent: title }), ...children);
			return box;
		}
		function button(text, action, onClick, opts = {}) {
			const b = el("button", {
				className: opts.className ?? "btn",
				textContent: text
			});
			if (opts.title) {
				b.title = opts.title;
				b.setAttribute("aria-label", opts.title);
			}
			b.type = "button";
			b.dataset.action = action;
			listen(b, "click", onClick, action);
			return b;
		}
		function chip(text, opts) {
			const b = el("button", { className: "chip" });
			b.type = "button";
			if (opts.small) b.classList.add("small");
			if (opts.active) b.classList.add("active");
			b.setAttribute("aria-pressed", String(Boolean(opts.active)));
			b.title = opts.title ?? text;
			if (opts.dot !== void 0) {
				const dot = el("span", { className: "dot" });
				dot.style.background = opts.dot;
				b.append(dot);
			}
			b.append(el("span", {
				className: "chip-txt",
				textContent: text
			}));
			if (opts.count !== void 0) b.append(el("span", {
				className: "count",
				textContent: String(opts.count)
			}));
			return b;
		}
		function card(spec, ...body) {
			const sec = el("section", { className: `card${spec.className ? ` ${spec.className}` : ""}` });
			sec.dataset.card = spec.id;
			const head = el("div", { className: "card-hd" });
			const text = el("div", { className: "card-txt" });
			text.append(el("h2", { textContent: spec.title }));
			if (spec.desc) text.append(el("p", { textContent: spec.desc }));
			head.append(el("div", {
				className: "card-icon",
				textContent: spec.icon
			}), text);
			if (spec.actions && spec.actions.length > 0) {
				const actions = el("div", { className: "card-actions" });
				actions.append(...spec.actions);
				head.append(actions);
			}
			sec.append(head);
			if (body.length === 0) {
				if (spec.actions && spec.actions.length > 0) {
					const ph = el("span", { className: "chev-ph" });
					ph.setAttribute("aria-hidden", "true");
					head.append(ph);
				}
				return sec;
			}
			head.classList.add("has-body");
			const content = el("div", { className: "card-bd" });
			content.append(...body);
			const chev = el("button", {
				className: "chev",
				title: ctx.tr("collapse")
			});
			chev.type = "button";
			chev.dataset.collapse = spec.id;
			chev.setAttribute("aria-label", ctx.tr("collapse"));
			const apply = () => {
				const isCollapsed = ctx.collapsed.has(spec.id);
				content.hidden = isCollapsed;
				sec.classList.toggle("collapsed", isCollapsed);
				chev.setAttribute("aria-expanded", String(!isCollapsed));
			};
			listen(chev, "click", () => {
				if (ctx.collapsed.has(spec.id)) ctx.collapsed.delete(spec.id);
				else ctx.collapsed.add(spec.id);
				apply();
			}, "plegar");
			apply();
			head.append(chev);
			sec.append(content);
			return sec;
		}
		return {
			el,
			listen,
			keepFocus,
			toggleInput,
			switchRow,
			switchOnly,
			tile,
			numberInput,
			slider,
			stepper,
			field,
			row,
			sub,
			button,
			chip,
			card
		};
	}
	var PROFILE_COLORS = [
		"#d8a94b",
		"#5aa0e0",
		"#e07a4a",
		"#7cc46a",
		"#b98be0",
		"#4ac0b0",
		"#e05a8a",
		"#c9c9c9"
	];
	function profileColor(index) {
		return PROFILE_COLORS[index % PROFILE_COLORS.length] ?? "#d8a94b";
	}
	var TEMPLATE_NAMES = {
		inicio_cs: "tpl_inicio_cs",
		naval_ofensiva: "tpl_naval_ofensiva",
		naval_defensiva: "tpl_naval_defensiva",
		terrestre_ofensiva: "tpl_terrestre_ofensiva",
		terrestre_defensiva: "tpl_terrestre_defensiva"
	};
	function profileName(p, tr) {
		const key = p.predefined ? TEMPLATE_NAMES[p.id] : void 0;
		return key ? tr(key) : p.profile.name;
	}
	function profileLabel(p, tr) {
		return p.predefined ? `🔒 ${profileName(p, tr)}` : profileName(p, tr);
	}
	var TABS = [
		{
			id: "buildings",
			key: "peTabBuildings",
			icon: "🏛"
		},
		{
			id: "research",
			key: "peTabResearch",
			icon: "⚗"
		},
		{
			id: "troops",
			key: "peTabTroops",
			icon: "⚔"
		}
	];
	var BUILDING_TILES = [
		"main",
		"farm",
		"lumber",
		"stoner",
		"ironer",
		"storage",
		"barracks",
		"academy",
		"temple",
		"market",
		"docks",
		"hide",
		"wall"
	];
	var SPECIAL_SLOTS = [{
		key: "special1",
		slot: "slot1",
		ids: SPECIAL_SLOT_1
	}, {
		key: "special2",
		slot: "slot2",
		ids: SPECIAL_SLOT_2
	}];
	var RESEARCH_TILES = Object.keys(RESEARCH_ACADEMY_LEVELS);
	var RESEARCH_LEGEND = [
		"done",
		"queued",
		"ready",
		"academy",
		"points",
		"resources"
	];
	var MAX_PRIORITY = 1e3;
	var MAX_NAME_LENGTH = 60;
	var MAX_TROOP_TARGET = 5e4;
	var MAX_TROOP_BATCH = 5e3;
	var MAX_SPELL_FAVOR = 1e4;
	var MAX_SPELL_SLOTS = 7;
	function troopRule(profile, unit) {
		return profile.troops[unit] ?? {
			enabled: false,
			target: 0,
			priority: (UNIT_IDS.indexOf(unit) + 1) * 10,
			minBatch: 10
		};
	}
	function spellRule(profile, id) {
		return profile.recruitSpells[id] ?? defaultSpellRule(id);
	}
	function createProfileEditor(ctx) {
		const { kit, tr, store, state } = ctx;
		const { el, listen } = kit;
		const root = el("div", { className: "pe" });
		root.dataset.profileEditor = "";
		const actions = el("div", { className: "contents" });
		actions.dataset.profileActions = "";
		const name = (b) => localBuildingName(ctx.lang, b);
		const maxLevel = (b) => ctx.data?.maxLevel(b) ?? BUILDING_MAX_LEVELS[b];
		function button(text, action, onClick, title) {
			return kit.button(text, action, onClick, {
				className: "mini",
				title
			});
		}
		function numberField(value, min, max, field, readOnly, commit, label) {
			const input = el("input");
			input.type = "number";
			input.min = String(min);
			input.max = String(max);
			input.value = String(value);
			input.dataset.field = field;
			input.disabled = readOnly;
			if (label) input.setAttribute("aria-label", label);
			listen(input, "change", () => {
				const v = Math.round(Number(input.value));
				if (input.value === "" || !Number.isFinite(v)) {
					input.value = String(value);
					return;
				}
				commit(Math.min(max, Math.max(min, v)));
			}, `perfiles: ${field}`);
			return input;
		}
		function icon(kind, id, size, fallback, alt) {
			const box = el("span", { className: "gi" });
			box.style.width = `${size}px`;
			box.style.height = `${size}px`;
			box.setAttribute("aria-hidden", "true");
			const text = () => {
				box.classList.add("gi-txt");
				box.style.fontSize = `${Math.round(size * .55)}px`;
				box.textContent = fallback;
			};
			if (!(ctx.icons?.paint(box, kind, id, size, text) === true || alt !== void 0 && ctx.icons?.paint(box, alt[0], alt[1], size, text) === true)) text();
			return box;
		}
		function emoji(text, size) {
			const box = el("span", {
				className: "gi gi-txt",
				textContent: text
			});
			box.style.width = `${size}px`;
			box.style.height = `${size}px`;
			box.style.fontSize = `${Math.round(size * .55)}px`;
			box.setAttribute("aria-hidden", "true");
			return box;
		}
		function info(text) {
			const i = el("span", {
				className: "info-i",
				textContent: "i",
				title: text
			});
			i.setAttribute("role", "img");
			i.setAttribute("aria-label", text);
			return i;
		}
		function profileTile(field, iconNode, label, note, checked, readOnly, commit) {
			const tile = el("label", { className: "tile" });
			const input = el("input");
			input.type = "checkbox";
			input.checked = checked;
			input.disabled = readOnly;
			input.dataset.field = field;
			listen(input, "change", () => {
				commit(input.checked);
			}, `perfiles: ${field}`);
			const ico = el("span", { className: "tile-ico" });
			ico.append(iconNode);
			tile.append(input, ico, el("span", {
				className: "tile-lbl",
				textContent: label
			}));
			if (note) tile.append(el("small", { textContent: note }));
			return tile;
		}
		function selected() {
			const all = listProfiles(store.get());
			const entry = all.find((p) => p.id === state.profileId) ?? all[0] ?? null;
			state.profileId = entry?.id ?? null;
			return entry;
		}
		function mutate(fn) {
			const id = state.profileId;
			if (id === null || isPredefinedProfileId(id)) return;
			store.update((s) => {
				const p = s.profiles[id];
				if (p) fn(p);
			});
			render();
		}
		function resetTransient() {
			state.confirmDelete = null;
			state.renaming = false;
		}
		function addProfile(profile, baseId) {
			let id = baseId;
			store.update((s) => {
				id = freeId(baseId, s.profiles);
				s.profiles = {
					...s.profiles,
					[id]: profile
				};
			});
			state.profileId = id;
			state.stage = 0;
			resetTransient();
			ctx.onProfilesChanged();
			render();
		}
		function deleteSelected() {
			const id = state.profileId;
			if (id === null || isPredefinedProfileId(id)) return;
			if (state.confirmDelete !== id) {
				state.confirmDelete = id;
				render();
				return;
			}
			store.update((s) => {
				const { [id]: _removed, ...profiles } = s.profiles;
				s.profiles = profiles;
				s.townProfiles = Object.fromEntries(Object.entries(s.townProfiles).filter(([, pid]) => pid !== id));
			});
			state.profileId = null;
			resetTransient();
			ctx.onProfilesChanged();
			render();
		}
		function townCounts() {
			const known = new Set(ctx.towns().map((t) => String(t.id)));
			const counts = new Map();
			for (const [town, pid] of Object.entries(store.get().townProfiles)) {
				if (known.size > 0 && !known.has(town)) continue;
				counts.set(pid, (counts.get(pid) ?? 0) + 1);
			}
			return counts;
		}
		function renderActions(entry) {
			const btn = (text, action, onClick, className = "btn") => kit.button(text, action, onClick, { className });
			const out = [btn(tr("profileNew"), "profileNew", () => {
				addProfile(createEmptyProfile(tr("newProfileName")), "perfil");
			})];
			if (entry) {
				out.push(btn(tr("profileDuplicate"), "profileDuplicate", () => {
					const copy = structuredClone(entry.profile);
					copy.name = `${tr("copyOf")} ${profileName(entry, tr)}`;
					addProfile(copy, entry.id);
				}));
				if (!entry.predefined) out.push(btn(tr("profileRename"), "profileRename", () => {
					state.renaming = !state.renaming;
					state.confirmDelete = null;
					render();
				}), btn(state.confirmDelete === entry.id ? tr("profileDeleteConfirm") : tr("profileDelete"), "profileDelete", deleteSelected, "btn danger"));
				out.push(el("span", { className: "sep" }));
				out.push(btn(tr("profileExport"), "profileExport", () => {
					state.io = state.io === "export" ? null : "export";
					state.confirmDelete = null;
					render();
				}));
			}
			out.push(btn(tr("profileImport"), "profileImport", () => {
				state.io = state.io === "import" ? null : "import";
				state.importResult = null;
				state.confirmDelete = null;
				render();
			}));
			actions.replaceChildren(...out);
		}
		function chipsRow(entry) {
			const counts = townCounts();
			const row = el("div", { className: "chips" });
			row.dataset.profileChips = "";
			listProfiles(store.get()).forEach((p, i) => {
				const chip = kit.chip(profileLabel(p, tr), {
					dot: profileColor(i),
					count: counts.get(p.id) ?? 0,
					active: p.id === entry?.id
				});
				chip.dataset.profileChip = p.id;
				listen(chip, "click", () => {
					if (state.profileId !== p.id) state.stage = 0;
					state.profileId = p.id;
					resetTransient();
					render();
				}, "perfiles: elegir");
				row.append(chip);
			});
			return row;
		}
		function renameBox(profile) {
			const input = el("input");
			input.type = "text";
			input.maxLength = MAX_NAME_LENGTH;
			input.value = profile.name;
			input.dataset.field = "profileName";
			input.setAttribute("aria-label", tr("profileName"));
			const save = () => {
				const value = input.value.trim();
				if (value === "") {
					input.value = profile.name;
					return;
				}
				state.renaming = false;
				mutate((p) => {
					p.name = value;
				});
				ctx.onProfilesChanged();
			};
			const cancel = () => {
				state.renaming = false;
				render();
			};
			listen(input, "keydown", (event) => {
				const e = event;
				if (e.key === "Enter" && !e.isComposing) {
					e.preventDefault();
					save();
				} else if (e.key === "Escape") {
					e.preventDefault();
					e.stopPropagation();
					cancel();
				}
			}, "perfiles: nombre");
			queueMicrotask(() => {
				if (input.isConnected) input.focus();
			});
			return kit.row(el("span", {
				className: "lbl",
				textContent: tr("profileName")
			}), input, button(tr("save"), "profileRenameSave", save), button(tr("cancel"), "profileRenameCancel", cancel));
		}
		function ioBox(entry) {
			if (!state.io) return null;
			const box = el("div", { className: "sub pe-io" });
			box.dataset.profileIo = state.io;
			const text = el("textarea");
			text.dataset.field = state.io === "export" ? "exportText" : "importText";
			if (state.io === "export") {
				if (!entry) return null;
				text.readOnly = true;
				text.value = exportProfiles(store.get(), [entry.id]);
				listen(text, "focus", () => {
					text.select();
				}, "perfiles: exportar");
				box.append(el("h3", { textContent: `${tr("profileExport")}: ${profileName(entry, tr)}` }), el("p", {
					className: "note",
					textContent: tr("exportHint")
				}), text);
				return box;
			}
			text.value = state.importText ?? "";
			text.setAttribute("aria-label", tr("profileImport"));
			listen(text, "input", () => {
				state.importText = text.value;
			}, "perfiles: importar");
			box.append(el("h3", { textContent: tr("profileImport") }), el("p", {
				className: "note",
				textContent: tr("importHint")
			}), text, kit.row(button(tr("profileImport"), "profileImportDo", () => {
				state.importText = text.value;
				const result = importProfiles(store.get(), text.value);
				if (result.imported.length > 0) {
					store.update((s) => {
						s.profiles = result.settings.profiles;
					});
					state.profileId = result.imported[0] ?? state.profileId;
					state.stage = 0;
					resetTransient();
					ctx.onProfilesChanged();
				}
				if (result.errors.length === 0) state.importText = "";
				state.importResult = {
					imported: result.imported.map((id) => result.settings.profiles[id]?.name ?? id),
					errors: result.errors
				};
				render();
			})));
			const res = state.importResult;
			if (res) {
				const out = el("div");
				out.dataset.importResult = "";
				out.append(el("p", {
					className: res.imported.length > 0 ? "success" : "warn",
					textContent: res.imported.length > 0 ? `${tr("importOk")}: ${res.imported.join(", ")}` : tr("importNone")
				}), ...res.errors.length > 0 ? [el("p", {
					className: "error",
					textContent: tr("importErrors")
				}), ...res.errors.map((e) => el("p", {
					className: "note mono",
					textContent: e
				}))] : []);
				box.append(out);
			}
			return box;
		}
		function headerBoxes(profile, ro) {
			const focus = el("div", { className: "tiles small" });
			focus.append(profileTile("focusAcademy", icon("research", "take_over", 44, "🏛", ["building", "academy"]), tr("focusAcademy"), tr("focusAcademyNote"), profile.buildFocus.academy28BeforeConquest, ro, (v) => {
				mutate((p) => {
					p.buildFocus.academy28BeforeConquest = v;
				});
			}), profileTile("focusColony", icon("unit", "colonize_ship", 44, "⛵", ["research", "colonize_ship"]), tr("focusColony"), tr("focusColonyNote"), profile.buildFocus.colonyShipFirst, ro, (v) => {
				mutate((p) => {
					p.buildFocus.colonyShipFirst = v;
				});
			}));
			const works = el("div", { className: "tiles small" });
			works.dataset.worksIn = "";
			works.append(profileTile("profileAutoBuild", icon("building", "main", 44, "🏗"), tr("pauseBuild"), void 0, profile.autoBuild, ro, (v) => {
				mutate((p) => {
					p.autoBuild = v;
				});
			}), profileTile("profileAutoResearch", icon("building", "academy", 44, "📜"), tr("pauseResearch"), void 0, profile.autoResearch, ro, (v) => {
				mutate((p) => {
					p.autoResearch = v;
				});
			}), profileTile("profileAutoRecruit", icon("building", "barracks", 44, "⚔"), tr("pauseRecruit"), void 0, profile.autoRecruit, ro, (v) => {
				mutate((p) => {
					p.autoRecruit = v;
				});
			}));
			const worksSub = kit.sub(tr("worksIn"), works);
			worksSub.querySelector("h3")?.append(info(tr("worksInInfo")));
			const heroes = el("div", { className: "tiles small" });
			heroes.append(profileTile("sendHeroes", emoji("🧔", 44), tr("heroesTile"), tr("heroesNote"), profile.sendHeroes, ro, (v) => {
				mutate((p) => {
					p.sendHeroes = v;
				});
			}));
			const top = el("div", { className: "pe-top" });
			top.append(kit.sub(tr("buildFocus"), focus), worksSub, kit.sub(tr("heroes"), heroes));
			return top;
		}
		function tabsBar(tab) {
			const bar = el("div", { className: "pe-tabs" });
			bar.setAttribute("role", "tablist");
			for (const t of TABS) {
				const b = el("button", { className: t.id === tab ? "active" : "" });
				b.type = "button";
				b.dataset.peTab = t.id;
				b.setAttribute("role", "tab");
				b.setAttribute("aria-selected", String(t.id === tab));
				b.append(el("span", {
					className: "ico",
					textContent: t.icon
				}), el("span", { textContent: tr(t.key) }));
				listen(b, "click", () => {
					state.tab = t.id;
					render();
				}, "perfiles: pestaña");
				bar.append(b);
			}
			return bar;
		}
		function statusTownId() {
			const towns = ctx.towns();
			if (towns.length === 0) return null;
			const valid = (id) => id !== null && towns.some((t) => t.id === id);
			if (state.townPinned === true && valid(state.townId)) return state.townId;
			state.townPinned = false;
			const current = ctx.data?.currentTownId?.() ?? null;
			if (valid(current)) state.townId = current;
			else if (!valid(state.townId)) {
				const assigned = Object.entries(store.get().townProfiles).filter(([, pid]) => pid === state.profileId).map(([t]) => Number(t));
				state.townId = towns.find((t) => assigned.includes(t.id))?.id ?? towns[0]?.id ?? null;
			}
			return state.townId;
		}
		function townPicker(prefix, lead) {
			const towns = ctx.towns();
			const townId = statusTownId();
			if (towns.length === 0 || townId === null) return null;
			const select = el("select");
			select.dataset.field = "statusTown";
			select.setAttribute("aria-label", prefix);
			for (const t of towns) {
				const option = el("option", { textContent: t.name });
				option.value = String(t.id);
				select.append(option);
			}
			select.value = String(townId);
			listen(select, "change", () => {
				state.townId = Number(select.value);
				state.townPinned = state.townId !== (ctx.data?.currentTownId?.() ?? null);
				render();
			}, "perfiles: ciudad");
			const label = el("label", { className: "pe-town" });
			if (lead) label.append(lead);
			label.append(el("span", { textContent: prefix }), select);
			return label;
		}
		function legend(...parts) {
			const line = el("div", { className: "pe-legend" });
			for (const part of parts) {
				if (part === null) continue;
				line.append(typeof part === "string" ? el("span", { textContent: part }) : part);
			}
			return line;
		}
		function floorCard(profile, ro) {
			const pf = profile.populationFloor;
			const box = el("div", { className: pf.enabled ? "pe-floor" : "pe-floor off" });
			box.dataset.popFloor = "";
			const text = el("div", { className: "pe-floor-txt" });
			text.append(el("strong", { textContent: tr("popFloor") }), el("p", {
				className: "note",
				textContent: tr("popFloorDesc")
			}));
			const farm = el("span", { className: "stepper" });
			const farmInput = numberField(pf.farmLevels, 1, 10, "floorFarm", ro, (v) => {
				mutate((p) => {
					p.populationFloor.farmLevels = v;
				});
			});
			const step = (delta, symbol, action, title) => {
				const b = button(symbol, action, () => {
					mutate((p) => {
						const next = Math.min(10, Math.max(1, p.populationFloor.farmLevels + delta));
						p.populationFloor.farmLevels = next;
					});
				}, title);
				b.disabled = ro || pf.farmLevels + delta < 1 || pf.farmLevels + delta > 10;
				b.dataset.focusAlt = "[data-field=\"floorFarm\"]";
				return b;
			};
			farm.append(step(-1, "−", "floorFarmDown", tr("decrease")), farmInput, step(1, "+", "floorFarmUp", tr("increase")));
			const on = el("input");
			on.type = "checkbox";
			on.checked = pf.enabled;
			on.disabled = ro;
			on.dataset.field = "floorEnabled";
			on.setAttribute("aria-label", tr("popFloorOn"));
			listen(on, "change", () => {
				mutate((p) => {
					p.populationFloor.enabled = on.checked;
				});
			}, "perfiles: umbral");
			const toggle = el("label", {
				className: "switch",
				title: tr("popFloorOn")
			});
			toggle.append(on, el("span", { className: "track" }));
			box.append(icon("building", "farm", 48, "🌾"), text, kit.field(tr("popFloorMin"), numberField(pf.minFreePopulation, 0, 1e3, "floorMin", ro, (v) => {
				mutate((p) => {
					p.populationFloor.minFreePopulation = v;
				});
			})), kit.field(tr("popFloorFarm"), farm), toggle);
			return box;
		}
		function stageIndex(profile) {
			const last = Math.max(profile.buildStages.length - 1, 0);
			const i = Math.min(Math.max(state.stage ?? 0, 0), last);
			state.stage = i;
			return i;
		}
		function paintStageDot(chip, townStage, townName) {
			const i = Number(chip.dataset.stageChip);
			const here = townStage === i && townName !== null;
			chip.querySelector(".dot")?.remove();
			chip.title = `${tr("stage")} ${i + 1}` + (here ? ` · ${townName}` : "");
			if (!here) return;
			const dot = el("span", { className: "dot" });
			dot.style.background = "#86c98a";
			chip.prepend(dot);
		}
		function stageBar(profile, ro, current, townStage, townName) {
			const row = el("div", { className: "chips pe-stagebar" });
			row.dataset.stages = "";
			profile.buildStages.forEach((stage, i) => {
				const chip = kit.chip(`${tr("stage")} ${i + 1}`, {
					count: Object.keys(stage.targets).length,
					active: i === current
				});
				chip.dataset.stageChip = String(i);
				paintStageDot(chip, townStage, townName);
				listen(chip, "click", () => {
					state.stage = i;
					render();
				}, "perfiles: tramo");
				row.append(chip);
			});
			if (ro) return row;
			if (profile.buildStages.length < 20) {
				const add = kit.button(`+ ${tr("stage")}`, "stageAdd", () => {
					state.stage = profile.buildStages.length;
					mutate((p) => p.buildStages.push({ targets: {} }));
				}, {
					className: "chip add",
					title: tr("stageAdd")
				});
				add.dataset.focusAlt = `[data-stage-chip="${profile.buildStages.length}"]`;
				row.append(add);
			}
			if (profile.buildStages.length > 0) {
				const n = profile.buildStages.length;
				const left = button("◀", "stageUp", () => {
					state.stage = current - 1;
					mutate((p) => {
						moveItem(p.buildStages, current, current - 1);
					});
				}, tr("stageMoveLeft"));
				left.disabled = current === 0;
				left.dataset.focusAlt = `[data-stage-chip="${current}"]`;
				const right = button("▶", "stageDown", () => {
					state.stage = current + 1;
					mutate((p) => {
						moveItem(p.buildStages, current, current + 1);
					});
				}, tr("stageMoveRight"));
				right.disabled = current >= n - 1;
				right.dataset.focusAlt = `[data-stage-chip="${current}"]`;
				const remove = button("✕", "stageRemove", () => {
					state.stage = Math.max(0, current - 1);
					mutate((p) => p.buildStages.splice(current, 1));
				}, tr("stageRemove"));
				remove.dataset.focusAlt = "[data-action=\"stageAdd\"]";
				row.append(el("span", { className: "spacer" }), left, right, remove);
			}
			return row;
		}
		function nextPriority(stage) {
			const priorities = Object.values(stage.targets).map((t) => t.priority);
			return Math.min(MAX_PRIORITY, Math.max(0, ...priorities) + 10);
		}
		function defaultLevel(p, si, key) {
			const before = p.buildStages.slice(0, si).map((s) => s.targets[key]?.level ?? 0);
			const prev = Math.max(0, ...before);
			return Math.min(maxLevel(key), prev > 0 ? prev + 5 : 10);
		}
		function stageOf(p, si) {
			if (p.buildStages.length === 0) p.buildStages.push({ targets: {} });
			return p.buildStages[si] ?? null;
		}
		function removeTarget(stage, key) {
			stage.targets = Object.fromEntries(Object.entries(stage.targets).filter(([k]) => k !== key));
		}
		function setTarget(si, key, patch) {
			mutate((p) => {
				const target = p.buildStages[si]?.targets[key];
				if (target) Object.assign(target, patch);
			});
		}
		function toggleBuilding(si, key, on) {
			mutate((p) => {
				const stage = stageOf(p, si);
				if (!stage) return;
				if (on) removeTarget(stage, key);
				else stage.targets[key] = {
					level: defaultLevel(p, si, key),
					priority: nextPriority(stage)
				};
			});
		}
		function toggleSpecial(si, slot, building, on) {
			mutate((p) => {
				if (on) {
					const stage = p.buildStages[si];
					if (stage) removeTarget(stage, slot.key);
					if (!p.buildStages.some((s) => slot.key in s.targets)) p.specialBuildings[slot.slot] = null;
					return;
				}
				const stage = stageOf(p, si);
				if (!stage) return;
				if (slot.slot === "slot1") p.specialBuildings.slot1 = building;
				else p.specialBuildings.slot2 = building;
				stage.targets[slot.key] ??= {
					level: 1,
					priority: nextPriority(stage)
				};
			});
		}
		function nowText(now) {
			if (now === null) return " ";
			return now === 0 ? tr("notBuilt") : `${tr("nowLevel")} ${now}`;
		}
		function fillBuildingLive(tile, now) {
			const target = tile.dataset.target === void 0 ? null : Number(tile.dataset.target);
			const reached = target !== null && now !== null && now >= target;
			tile.classList.toggle("reached", reached);
			let dot = tile.querySelector("[data-reached]");
			if (!reached) dot?.remove();
			else if (!dot) {
				dot = el("span", {
					className: "bt-dot",
					title: tr("bHintReached")
				});
				dot.dataset.reached = "";
				tile.querySelector(".bt-ico")?.append(dot);
			}
			const line = tile.querySelector(".bt-now");
			if (line) line.textContent = nowText(now);
		}
		function buildingTile(o, si, ro) {
			const tile = el("div", { className: o.on ? "bt on" : "bt" });
			tile.dataset.building = o.building;
			if (o.on) tile.dataset.target = String(o.level);
			if (ro) tile.classList.add("ro");
			const pick = el("button", {
				className: "bt-pick",
				title: name(o.building)
			});
			pick.type = "button";
			pick.dataset.field = `bt:${o.building}`;
			pick.setAttribute("aria-pressed", String(o.on));
			pick.disabled = ro;
			pick.append(icon("building", o.building, 56, "🏛"));
			listen(pick, "click", o.toggle, "perfiles: edificio");
			const ico = el("div", { className: "bt-ico" });
			ico.append(pick);
			if (o.on) {
				const level = numberField(o.level, 1, o.max, `level:${si}:${o.key}`, ro, (v) => {
					setTarget(si, o.key, { level: v });
				}, `${name(o.building)}: ${tr("level")}`);
				level.className = "bt-lvl";
				ico.append(level);
			} else ico.append(el("span", {
				className: "bt-lvl",
				textContent: "0"
			}));
			const arrows = el("div", { className: "bt-arrows" });
			const arrow = (dir, symbol, title) => {
				const b = el("button", {
					textContent: symbol,
					title: `${title} · ${name(o.building)}`
				});
				b.type = "button";
				b.dataset.field = `bt:${o.building}:${dir > 0 ? "up" : "down"}`;
				b.setAttribute("aria-label", b.title);
				b.disabled = ro || !o.on || (dir > 0 ? o.level >= o.max : o.level <= 1);
				b.dataset.focusAlt = `[data-field="level:${si}:${o.key}"]`;
				listen(b, "click", (event) => {
					const step = event.shiftKey ? 5 : 1;
					setTarget(si, o.key, { level: Math.min(o.max, Math.max(1, o.level + dir * step)) });
				}, "perfiles: nivel");
				return b;
			};
			arrows.append(arrow(1, "▲", tr("levelUp")), arrow(-1, "▼", tr("levelDown")));
			const head = el("div", { className: "bt-hd" });
			head.append(ico, arrows);
			tile.append(head, el("span", {
				className: "bt-name",
				textContent: name(o.building)
			}), el("span", { className: "bt-now" }));
			if (!ro) {
				const controls = "button, input, label, select, a, .bt-arrows";
				let fromControl = false;
				listen(tile, "pointerdown", (event) => {
					fromControl = event.target?.closest(controls) != null;
				}, "perfiles: edificio");
				listen(tile, "click", (event) => {
					const started = fromControl;
					fromControl = false;
					if (started || event.target?.closest(controls)) return;
					o.toggle();
				}, "perfiles: edificio");
			}
			if (o.on) {
				const prio = el("label", {
					className: "bt-prio",
					title: tr("hintPriority")
				});
				prio.append(el("span", { textContent: "#" }), numberField(o.priority, 0, MAX_PRIORITY, `priority:${si}:${o.key}`, ro, (v) => {
					setTarget(si, o.key, { priority: v });
				}, `${name(o.building)}: ${tr("priority")}`));
				tile.append(prio);
			} else if (o.note) tile.append(el("small", {
				className: "bt-note",
				textContent: o.note
			}));
			fillBuildingLive(tile, o.now);
			return tile;
		}
		function specialsBlock(profile, stage, si, levels, ro) {
			const wrap = el("div", { className: "pe-specials" });
			for (const slot of SPECIAL_SLOTS) {
				const chosen = profile.specialBuildings[slot.slot];
				const target = stage?.targets[slot.key];
				const box = el("div", { className: "pe-slot" });
				box.dataset.slot = slot.slot;
				box.append(el("h4", { textContent: tr(slot.key) }));
				const grid = el("div", { className: "bt-grid" });
				for (const b of slot.ids) {
					const on = chosen === b && target !== void 0;
					const elsewhere = chosen === b && !on && profile.buildStages.some((s) => slot.key in s.targets);
					grid.append(buildingTile({
						key: slot.key,
						building: b,
						on,
						level: target?.level ?? 1,
						priority: target?.priority ?? 100,
						max: 1,
						now: levels ? levels[b] ?? 0 : null,
						note: elsewhere ? tr("otherStage") : void 0,
						toggle: () => {
							toggleSpecial(si, slot, b, on);
						}
					}, si, ro));
				}
				box.append(grid);
				wrap.append(box);
			}
			const sub = kit.sub(tr("specials"), wrap, el("p", {
				className: "note",
				textContent: tr("specialsNote")
			}));
			sub.dataset.specials = "";
			return sub;
		}
		function buildingsTab(profile, ro) {
			const townId = statusTownId();
			const townName = ctx.towns().find((t) => t.id === townId)?.name ?? null;
			const levels = townId === null ? null : ctx.data?.townLevels(townId) ?? null;
			const status = townId === null ? null : ctx.data?.townStatus(townId, profile) ?? null;
			const si = stageIndex(profile);
			const stage = profile.buildStages[si];
			const grid = el("div", { className: "bt-grid" });
			grid.dataset.buildingGrid = "";
			for (const b of BUILDING_TILES) {
				const target = stage?.targets[b];
				grid.append(buildingTile({
					key: b,
					building: b,
					on: target !== void 0,
					level: target?.level ?? 0,
					priority: target?.priority ?? 0,
					max: maxLevel(b),
					now: levels ? levels[b] ?? 0 : null,
					toggle: () => {
						toggleBuilding(si, b, target !== void 0);
					}
				}, si, ro));
			}
			return [
				floorCard(profile, ro),
				stageBar(profile, ro, si, status?.stages?.current ?? null, townName),
				el("p", {
					className: "note",
					textContent: tr("stagesHint")
				}),
				legend(tr("bHintClick"), tr("bHintLevel"), tr("hintPriority"), townPicker(tr("bHintReached"), el("span", { className: "bt-dot" })) ?? tr("bHintReached")),
				grid,
				specialsBlock(profile, stage, si, levels, ro)
			];
		}
		function toggleResearch(id, on) {
			mutate((p) => {
				if (on) {
					p.researches = p.researches.filter((r) => r !== id);
					return;
				}
				p.avoidResearches = p.avoidResearches.filter((r) => r !== id);
				p.researches = [...p.researches, id];
			});
		}
		function setResearchPriority(id, priority) {
			mutate((p) => {
				const tie = priority > (p.researches.indexOf(id) + 1) * 10 ? .5 : -.5;
				const ranked = p.researches.map((r, i) => ({
					r,
					priority: r === id ? priority + tie : (i + 1) * 10,
					i
				}));
				ranked.sort((a, b) => a.priority - b.priority || a.i - b.i);
				p.researches = ranked.map((x) => x.r);
			});
		}
		function fillResearchDot(tile, st) {
			let dot = tile.querySelector("[data-rs-state]");
			if (st === void 0 || st === "unknown") {
				dot?.remove();
				return;
			}
			if (!dot) {
				dot = el("span");
				tile.querySelector(".rs-ico")?.append(dot);
			}
			dot.className = `rs-dot ${st}`;
			dot.title = tr(`r_${st}`);
			dot.dataset.rsState = st;
		}
		function researchTile(id, index, avoided, st, ro) {
			const on = index >= 0;
			const tile = el("div", { className: `rs${on ? " on" : ""}${avoided ? " avoid" : ""}` });
			tile.dataset.research = id;
			const pick = el("button", { className: "rs-pick" });
			pick.type = "button";
			pick.dataset.field = `rs:${id}`;
			pick.setAttribute("aria-pressed", String(on));
			pick.disabled = ro;
			const ico = el("span", { className: "rs-ico" });
			ico.append(icon("research", id, 44, "📜"));
			pick.append(ico, el("span", {
				className: "rs-name",
				textContent: researchName(ctx.lang, id)
			}));
			listen(pick, "click", () => {
				toggleResearch(id, on);
			}, "perfiles: investigación");
			tile.append(pick);
			fillResearchDot(tile, st);
			if (on) {
				const prio = el("label", {
					className: "bt-prio",
					title: tr("hintPriority")
				});
				prio.append(el("span", { textContent: "#" }), numberField((index + 1) * 10, 0, MAX_PRIORITY, `research:${id}:priority`, ro, (v) => {
					setResearchPriority(id, v);
				}, `${researchName(ctx.lang, id)}: ${tr("priority")}`));
				tile.append(prio);
			} else if (!ro) {
				const avoid = el("button", {
					className: "rs-avoid",
					textContent: "⊘",
					title: tr("rAvoid")
				});
				avoid.type = "button";
				avoid.dataset.field = `research:${id}:avoid`;
				avoid.setAttribute("aria-pressed", String(avoided));
				avoid.setAttribute("aria-label", `${researchName(ctx.lang, id)}: ${tr("rAvoid")}`);
				listen(avoid, "click", () => {
					mutate((p) => {
						p.avoidResearches = avoided ? p.avoidResearches.filter((r) => r !== id) : [...p.avoidResearches, id];
					});
				}, "perfiles: evitar");
				tile.append(avoid);
			} else if (avoided) tile.append(el("span", {
				className: "rs-avoid",
				textContent: "⊘",
				title: tr("rAvoid")
			}));
			return tile;
		}
		function budgetLine(profile, townId) {
			const box = el("div", { className: "pe-budget" });
			box.dataset.budget = "";
			const data = ctx.data;
			if (!data) {
				box.append(el("p", {
					className: "note",
					textContent: tr("budgetNoData")
				}));
				return box;
			}
			const levels = townId === null ? null : data.townLevels(townId);
			const done = townId === null ? null : data.researchesDone(townId);
			const b = researchBudget({
				profile,
				pointsOf: (id) => data.researchPoints(id),
				pointsPerLevel: data.pointsPerLevel(),
				levels,
				done: new Set(done ?? []),
				maxLevel: (building) => data.maxLevel(building)
			});
			const n = (v) => v === null ? "?" : String(v);
			box.append(el("p", { textContent: `${tr("budget")}: ${tr("budgetUsed")} ${b.used}` + (b.spentOutside > 0 ? ` (+${b.spentOutside} ${tr("budgetOutside")})` : "") + ` · ${tr("budgetNow")}: ${n(b.availableNow)} · ${tr("budgetAtTarget")} ${b.academyTarget}: ${n(b.availableAtTarget)}` }));
			if (b.fits === false) {
				const warn = el("p", {
					className: "warn",
					textContent: `⚠ ${tr("budgetWarn")}`
				});
				warn.dataset.budgetWarn = "";
				box.append(warn);
			}
			if (b.unknown.length > 0) box.append(el("p", {
				className: "note",
				textContent: `${tr("budgetUnknown")}: ${b.unknown.join(", ")}`
			}));
			return box;
		}
		function researchStates(profile) {
			const townId = statusTownId();
			return townId === null ? null : ctx.data?.researchStates?.(townId, profile) ?? null;
		}
		function researchTab(profile, ro) {
			const townId = statusTownId();
			const states = researchStates(profile);
			const avoided = new Set(profile.avoidResearches);
			const dots = RESEARCH_LEGEND.map((s) => {
				const item = el("span", { className: "pe-dot" });
				item.append(el("span", { className: `rs-dot ${s}` }), el("span", { textContent: tr(`r_${s}`) }));
				return item;
			});
			const head = legend(`${profile.researches.length} ${tr("rOf")} ${RESEARCH_IDS.length} ${tr("rCount")}`, townPicker(tr("statusIn")), ...dots);
			head.dataset.researchHead = "";
			if (!ro) {
				const btns = el("span", { className: "pe-btns" });
				head.append(btns);
				btns.append(kit.button(tr("rAll"), "researchAll", () => {
					mutate((p) => {
						const skip = new Set([...p.researches, ...p.avoidResearches]);
						p.researches = [...p.researches, ...RESEARCH_TILES.filter((r) => !skip.has(r))];
					});
				}), kit.button(tr("rNone"), "researchNone", () => {
					mutate((p) => {
						p.researches = [];
					});
				}));
			}
			const levelOf = (id) => ctx.data?.researchAcademy?.(id) ?? RESEARCH_ACADEMY_LEVELS[id];
			const groups = new Map();
			for (const id of RESEARCH_TILES) {
				const level = levelOf(id);
				groups.set(level, [...groups.get(level) ?? [], id]);
			}
			const grid = el("div", { className: "rs-grid" });
			grid.dataset.researchGrid = "";
			for (const [level, ids] of [...groups.entries()].sort((a, b) => a[0] - b[0])) {
				const group = el("div", { className: "rs-group" });
				group.dataset.academy = String(level);
				const label = el("div", { className: "rs-lvl" });
				label.append(el("span", { textContent: tr("rAcademy") }), el("strong", { textContent: String(level) }));
				group.append(label);
				for (const id of ids) group.append(researchTile(id, profile.researches.indexOf(id), avoided.has(id), states?.[id], ro));
				grid.append(group);
			}
			return [
				head,
				legend(tr("rHint"), tr("hintPriority"), `⊘ ${tr("rAvoid")}`),
				budgetLine(profile, townId),
				grid
			];
		}
		function troopStateText(item) {
			const key = `rs_${item.state}`;
			const text = tr(key);
			if ((item.state === "ready" || item.state === "ordered") && item.amount !== void 0) return `${text}: ${item.amount}`;
			const info = item.info;
			if (!info) return text;
			switch (info.kind) {
				case "building": return `${text}: ${name(info.building)} ${info.level}`;
				case "storage": return `${text}: ${name("storage")} (${info.need} > ${info.storage})`;
				case "research": {
					const id = RESEARCH_IDS.find((r) => r === info.research);
					return `${text}: ${id ? researchName(ctx.lang, id) : info.research}`;
				}
				case "god": return info.god === null ? tr("rs_noGod") : `${text}: ${godName(ctx.lang, info.god)}`;
				case "waiting": return `${text} ${unitName(ctx.lang, info.unit)}`;
				case "queue": return `${text}: ${info.queued}/${info.limit}`;
				case "resources": {
					const short = [
						"wood",
						"stone",
						"iron"
					].filter((r) => (info.short[r] ?? 0) > 0).map((r) => `${info.short[r]} ${tr(`res_${r}`)}`);
					return short.length > 0 ? `${text}: ${short.join(", ")}` : text;
				}
				case "population": return `${text}: ${info.need} (${info.free} ${tr("rs_free")})`;
				case "favor": return `${text}: ${info.need} ${godName(ctx.lang, info.god)} (${info.have})`;
			}
		}
		function fillTroopLive(tile, have, item) {
			let count = tile.querySelector("[data-troop-have]");
			if (!count) {
				count = el("span", { className: "ut-have" });
				tile.querySelector(".ut-ico")?.append(count);
			}
			count.textContent = have === null ? "?" : String(have);
			count.title = have === null ? tr("tHaveUnknown") : tr("tHintHave");
			count.dataset.troopHave = have === null ? "unknown" : String(have);
			let line = tile.querySelector("[data-troop-state]");
			if (!item) line?.remove();
			else {
				if (!line) {
					line = el("p");
					tile.append(line);
				}
				line.className = `troop-state ${item.state}`;
				line.textContent = troopStateText(item);
				line.dataset.troopState = item.state;
			}
		}
		function troopData(profile) {
			const townId = statusTownId();
			const counts = townId === null ? null : ctx.data?.troopCounts?.(townId) ?? null;
			const plan = townId === null ? null : ctx.data?.recruitPlan?.(townId, profile) ?? null;
			return {
				counts,
				itemOf: (unit) => plan?.items.find((i) => i.unit === unit)
			};
		}
		function setTroop(unit, patch) {
			mutate((p) => {
				p.troops = {
					...p.troops,
					[unit]: {
						...troopRule(p, unit),
						...patch
					}
				};
			});
		}
		function troopTile(unit, profile, ro, have, item) {
			const rule = troopRule(profile, unit);
			const tile = el("div", { className: rule.enabled ? "ut on" : "ut" });
			tile.dataset.troop = unit;
			const pick = el("button", {
				className: "ut-pick",
				title: unitName(ctx.lang, unit)
			});
			pick.type = "button";
			pick.dataset.field = `troop:${unit}:enabled`;
			pick.setAttribute("aria-pressed", String(rule.enabled));
			pick.disabled = ro;
			const ico = el("span", { className: "ut-ico" });
			const fallback = MYTH_UNIT_GODS[unit] !== void 0 || unit === "godsent" ? "✦" : isNavalUnit(unit) ? "⛵" : "⚔";
			ico.append(icon("unit", unit, 56, fallback));
			pick.append(ico, el("span", {
				className: "ut-name",
				textContent: unitName(ctx.lang, unit)
			}));
			listen(pick, "click", () => {
				setTroop(unit, { enabled: !rule.enabled });
			}, "perfiles: tropa");
			const target = numberField(rule.target, 0, MAX_TROOP_TARGET, `troop:${unit}:target`, ro, (v) => {
				setTroop(unit, { target: v });
			}, `${unitName(ctx.lang, unit)}: ${tr("troopTarget")}`);
			target.className = "ut-target";
			tile.append(pick, target);
			if (rule.enabled) {
				const sub = el("div", { className: "ut-sub" });
				sub.append(el("span", {
					textContent: "▣",
					title: tr("troopBatch")
				}), numberField(rule.minBatch, 1, MAX_TROOP_BATCH, `troop:${unit}:minBatch`, ro, (v) => {
					setTroop(unit, { minBatch: v });
				}, `${unitName(ctx.lang, unit)}: ${tr("troopBatch")}`), el("span", {
					textContent: "#",
					title: tr("priority")
				}), numberField(rule.priority, 0, MAX_PRIORITY, `troop:${unit}:priority`, ro, (v) => {
					setTroop(unit, { priority: v });
				}, `${unitName(ctx.lang, unit)}: ${tr("priority")}`));
				tile.append(sub);
			}
			fillTroopLive(tile, have, item);
			return tile;
		}
		function setSpell(id, patch) {
			mutate((p) => {
				p.recruitSpells = {
					...p.recruitSpells,
					[id]: {
						...spellRule(p, id),
						...patch
					}
				};
			});
		}
		function fillSpellBadge(card, st) {
			let badge = card.querySelector("[data-spell-state]");
			if (!st || st.state === "unknown") {
				badge?.remove();
				return;
			}
			if (!badge) {
				badge = el("span");
				card.querySelector(".sp-title")?.append(badge);
			}
			badge.className = `sp-badge ${st.state}`;
			badge.textContent = tr(`sp_${st.state}`);
			badge.dataset.spellState = st.state;
		}
		function fillSpellLive(card, st) {
			fillSpellBadge(card, st);
			card.classList.toggle("unavailable", st?.state === "noGod");
		}
		function spellCard(id, profile, ro, st) {
			const rule = spellRule(profile, id);
			const def = RECRUIT_POWERS[id];
			const card = el("div", { className: rule.enabled ? "sp on" : "sp" });
			card.dataset.spell = id;
			const pick = el("button", {
				className: "sp-pick",
				title: powerName(ctx.lang, id)
			});
			pick.type = "button";
			pick.dataset.field = `spell:${id}:enabled`;
			pick.setAttribute("aria-pressed", String(rule.enabled));
			pick.disabled = ro;
			pick.append(icon("power", id, 64, "✨"));
			listen(pick, "click", () => {
				setSpell(id, { enabled: !rule.enabled });
			}, "perfiles: hechizo");
			const god = st?.god ?? def.god;
			const cost = st?.cost ?? def.favor;
			const title = el("div", { className: "sp-title" });
			title.append(el("strong", { textContent: powerName(ctx.lang, id) }));
			const meta = el("div", { className: "sp-meta" });
			meta.append(icon("god", god, 18, godName(ctx.lang, god).charAt(0)), el("span", { textContent: `${tr(def.lane === "docks" ? "troopDocks" : "troopBarracks")} · ${cost} ${tr("favor")}` }));
			const fields = el("div", { className: "fields" });
			fields.append(kit.field(tr("spellFrom"), numberField(rule.fromFavor, 0, MAX_SPELL_FAVOR, `spell:${id}:fromFavor`, ro, (v) => {
				setSpell(id, { fromFavor: v });
			})), kit.field(tr("spellSlots"), numberField(rule.freeSlots, 0, MAX_SPELL_SLOTS, `spell:${id}:freeSlots`, ro, (v) => {
				setSpell(id, { freeSlots: v });
			})));
			const bd = el("div", { className: "sp-bd" });
			bd.append(title, meta, fields);
			card.append(pick, bd);
			fillSpellLive(card, st);
			return card;
		}
		function spellStatuses(profile) {
			const townId = statusTownId();
			return townId === null ? null : ctx.data?.spellStatus?.(townId, profile) ?? null;
		}
		function troopsTab(profile, ro) {
			const { counts, itemOf } = troopData(profile);
			const tiles = (units) => {
				const box = el("div", { className: "ut-grid" });
				for (const unit of units) box.append(troopTile(unit, profile, ro, counts ? counts[unit] ?? 0 : null, itemOf(unit)));
				return box;
			};
			const heading = (iconNode, text) => {
				const h = el("h3", { className: "pe-h" });
				h.append(iconNode, el("span", { textContent: text }));
				return h;
			};
			const statuses = spellStatuses(profile);
			const spells = el("div", { className: "sp-grid" });
			for (const id of RECRUIT_POWER_IDS) spells.append(spellCard(id, profile, ro, statuses?.[id]));
			const spellsSub = kit.sub(tr("spells"), spells);
			spellsSub.querySelector("h3")?.append(info(tr("spellsInfo")));
			spellsSub.dataset.spells = "";
			const lanes = el("div", { className: "pe-lanes" });
			for (const [building, key, units] of [[
				"barracks",
				"troopBarracks",
				BARRACKS_UNIT_IDS
			], [
				"docks",
				"troopDocks",
				DOCKS_UNIT_IDS
			]]) {
				const lane = el("div", { className: "pe-lane" });
				lane.dataset.troops = building;
				lane.append(heading(icon("building", building, 24, "🏛"), tr(key)), tiles(units));
				lanes.append(lane);
			}
			const gods = el("div", { className: "god-grid" });
			gods.dataset.troops = "myth";
			for (const god of GOD_IDS) {
				const box = el("div", { className: "god-block" });
				box.dataset.god = god;
				const units = Object.keys(MYTH_UNIT_GODS).filter((u) => MYTH_UNIT_GODS[u] === god);
				box.append(heading(icon("god", god, 22, godName(ctx.lang, god).charAt(0)), godName(ctx.lang, god)), tiles(units));
				gods.append(box);
			}
			const any = el("div", { className: "god-block" });
			any.dataset.god = "any";
			any.append(heading(emoji("✦", 22), tr("troopAnyGod")), tiles(["godsent"]));
			gods.append(any);
			return [
				spellsSub,
				legend(tr("tHintClick"), tr("tHintTarget"), tr("tHintBatch"), tr("hintPriority"), `123 = ${tr("tHintHave")}`, townPicker(tr("statusIn"))),
				lanes,
				heading(icon("building", "temple", 24, "⛩"), tr("troopMythTitle")),
				gods
			];
		}
		function statusLine(townName, profile, st) {
			const parts = [];
			const ev = st.stages;
			if (!ev) parts.push(`${tr("stage")}: ${tr("statusNoData")}`);
			else if (profile.buildStages.length === 0) parts.push(tr("stagesEmpty"));
			else if (ev.current === null) parts.push(tr("statusAllDone"));
			else {
				const counted = ev.stages[ev.current]?.targets.filter((t) => t.state !== "skipped") ?? [];
				const reached = counted.filter((t) => t.state === "reached").length;
				const queued = counted.filter((t) => t.state === "queued").length;
				parts.push(`${tr("stage")} ${ev.current + 1}/${profile.buildStages.length}`, `${reached}/${counted.length} ${tr("statusReached")}` + (queued > 0 ? ` (+${queued} ${tr("statusQueued")})` : ""));
				const blocked = counted.filter((t) => t.state === "blocked");
				if (blocked.length > 0) parts.push(`${tr("statusBlocked")}: ` + blocked.map((t) => `${name(t.building ?? t.key)} (${t.block ? blockText(ctx.lang, t.block) : t.reason ?? ""})`).join(", "));
			}
			const next = RESEARCH_IDS.find((r) => r === st.nextResearch);
			parts.push(st.nextResearch ? `${tr("statusNextResearch")}: ${next ? researchName(ctx.lang, next) : st.nextResearch}` + (st.nextResearchState ? ` (${tr(`rWhy_${st.nextResearchState}`)})` : "") : `${tr("statusNextResearch")}: —`);
			const troop = st.nextRecruit;
			if (troop) parts.push(`${tr("statusNextRecruit")}: ${unitName(ctx.lang, troop.unit)} (${troopStateText(troop)})`);
			return `${townName}: ${parts.join(" · ")}`;
		}
		function statusSection(id, profile) {
			const towns = ctx.towns();
			const assigned = Object.entries(store.get().townProfiles).filter(([, pid]) => pid === id).map(([t]) => Number(t));
			const box = el("ol", { className: "farm-results" });
			box.dataset.townStatus = "";
			if (assigned.length === 0 || !ctx.data) box.append(el("li", {
				className: "empty",
				textContent: tr("statusNoTowns")
			}));
			else for (const townId of assigned) {
				const townName = towns.find((t) => t.id === townId)?.name ?? String(townId);
				box.append(el("li", { textContent: statusLine(townName, profile, ctx.data.townStatus(townId, profile)) }));
			}
			return kit.sub(tr("townStatus"), box);
		}
		function body(entry) {
			const { profile, predefined: ro } = entry;
			const out = [];
			if (ro) out.push(el("p", {
				className: "ro-note",
				textContent: `🔒 ${tr("profileReadOnly")}`
			}));
			else if (state.renaming) out.push(renameBox(profile));
			const tab = state.tab ?? "buildings";
			const view = el("div", { className: "pe-view" });
			view.dataset.peView = tab;
			view.setAttribute("role", "tabpanel");
			view.append(...tab === "buildings" ? buildingsTab(profile, ro) : tab === "research" ? researchTab(profile, ro) : troopsTab(profile, ro));
			out.push(headerBoxes(profile, ro), tabsBar(tab), view, statusSection(entry.id, profile));
			return out;
		}
		function editingField() {
			const active = root.getRootNode().activeElement;
			return active instanceof HTMLElement && root.contains(active) && active.matches("input:not([type=\"checkbox\"]), textarea");
		}
		let drawnTownId = null;
		let drawnTowns = "";
		let townPending = false;
		function draw() {
			const entry = selected();
			renderActions(entry);
			const io = ioBox(entry);
			root.replaceChildren(chipsRow(entry), ...io ? [io] : [], ...entry ? body(entry) : []);
			drawnTownId = statusTownId();
			drawnTowns = townListKey(ctx.towns());
			townPending = false;
		}
		function render() {
			kit.keepFocus(draw);
		}
		function refreshLive() {
			const entry = selected();
			if (!entry) return;
			const townId = statusTownId();
			if (townId !== drawnTownId || townListKey(ctx.towns()) !== drawnTowns) {
				if (!state.renaming && !editingField()) render();
				else townPending = true;
				return;
			}
			const { profile } = entry;
			const buildingTiles = root.querySelectorAll("[data-building]");
			if (buildingTiles.length > 0) {
				const levels = townId === null ? null : ctx.data?.townLevels(townId) ?? null;
				for (const tile of buildingTiles) {
					const b = BUILDING_IDS.find((id) => id === tile.dataset.building);
					if (b) fillBuildingLive(tile, levels ? levels[b] ?? 0 : null);
				}
				const status = townId === null ? null : ctx.data?.townStatus(townId, profile) ?? null;
				const townName = ctx.towns().find((t) => t.id === townId)?.name ?? null;
				for (const chip of root.querySelectorAll("[data-stage-chip]")) paintStageDot(chip, status?.stages?.current ?? null, townName);
			}
			const troopTiles = root.querySelectorAll("[data-troop]");
			if (troopTiles.length > 0) {
				const { counts, itemOf } = troopData(profile);
				for (const tile of troopTiles) {
					const unit = UNIT_IDS.find((u) => u === tile.dataset.troop);
					if (unit) fillTroopLive(tile, counts ? counts[unit] ?? 0 : null, itemOf(unit));
				}
				const statuses = spellStatuses(profile);
				for (const card of root.querySelectorAll("[data-spell]")) {
					const id = RECRUIT_POWER_IDS.find((p) => p === card.dataset.spell);
					if (id) fillSpellLive(card, statuses?.[id]);
				}
			}
			const researchTiles = root.querySelectorAll("[data-research]");
			if (researchTiles.length > 0) {
				const states = researchStates(profile);
				for (const tile of researchTiles) {
					const id = RESEARCH_IDS.find((r) => r === tile.dataset.research);
					if (id) fillResearchDot(tile, states?.[id]);
				}
				root.querySelector("[data-budget]")?.replaceWith(budgetLine(profile, townId));
			}
			root.querySelector("[data-town-status]")?.closest(".sub")?.replaceWith(statusSection(entry.id, profile));
		}
		listen(root, "focusout", () => {
			if (!townPending) return;
			setTimeout(() => {
				if (townPending) refreshLive();
			}, 0);
		}, "perfiles: ciudad");
		render();
		return {
			root,
			actions,
			render,
			refreshLive
		};
	}
	function townListKey(towns) {
		return JSON.stringify(towns.map((t) => [t.id, t.name]));
	}
	function moveItem(list, from, to) {
		if (from < 0 || to < 0 || from >= list.length || to >= list.length || from === to) return;
		const [item] = list.splice(from, 1);
		if (item !== void 0) list.splice(to, 0, item);
	}
	var REGULAR_UNITS = UNIT_IDS.filter((u) => !MYTH_UNIT_IDS.includes(u) && u !== "colonize_ship");
	var MYTH_UNITS = UNIT_IDS.filter((u) => MYTH_UNIT_IDS.includes(u));
	function newId(prefix, n) {
		return `${prefix}-${Date.now().toString(36)}-${String(n)}`;
	}
	function isFarAway(from, target) {
		if (!from || !target || target.islandX === null || target.islandY === null) return null;
		return from.x !== target.islandX || from.y !== target.islandY;
	}
	function buildCityFarmCards(ctx) {
		const { kit, el, listen, tr, lang, store, root, data } = ctx;
		const townNames = () => new Map(ctx.towns().map((t) => [t.id, t.name]));
		const targetLabel = (id) => {
			const name = data?.townInfo(id)?.name;
			return name ? `${name} (#${String(id)})` : `#${String(id)}`;
		};
		const far = (t) => isFarAway(data?.island(t.fromTownId) ?? null, data?.townInfo(t.targetTownId) ?? null) === true;
		const templateOptions = (select, value) => {
			const list = store.get().cityFarm.templates;
			select.replaceChildren(...list.map((tpl) => {
				const option = el("option", { textContent: tpl.name });
				option.value = tpl.id;
				return option;
			}));
			if (value !== null && list.some((tpl) => tpl.id === value)) select.value = value;
		};
		const target = el("input");
		target.type = "text";
		target.inputMode = "numeric";
		target.dataset.field = "cfTarget";
		const from = el("select");
		from.dataset.field = "cfFrom";
		const template = el("select");
		template.dataset.field = "cfTemplate";
		const error = el("p", { className: "note" });
		error.dataset.cfError = "";
		error.hidden = true;
		const say = (key) => {
			error.hidden = key === null;
			error.textContent = key === null ? "" : tr(key);
		};
		let shownTowns = null;
		const renderFrom = () => {
			const list = ctx.towns();
			const key = townListKey(list);
			if (key === shownTowns) return;
			shownTowns = key;
			const previous = from.value;
			from.replaceChildren(...list.map(({ id, name }) => {
				const option = el("option", { textContent: name });
				option.value = String(id);
				return option;
			}));
			if (list.some((t) => String(t.id) === previous)) from.value = previous;
		};
		renderFrom();
		ctx.townListRenderers.push(renderFrom);
		const add = kit.button(tr("cfAddButton"), "cfAdd", () => {
			const targetId = Number(target.value.trim());
			const fromId = Number(from.value);
			const cfg = store.get().cityFarm;
			if (cfg.templates.length === 0) {
				say("cfNoTemplates");
				return;
			}
			const own = new Set(ctx.towns().map((t) => t.id));
			if (!(Number.isInteger(targetId) && targetId > 0 && !own.has(targetId) && own.has(fromId) && cfg.templates.some((tpl) => tpl.id === template.value))) {
				say("cfInvalid");
				return;
			}
			if (cfg.targets.some((t) => t.fromTownId === fromId && t.targetTownId === targetId)) {
				say("cfDuplicate");
				return;
			}
			if (cfg.targets.length >= 300) {
				say("cfFull");
				return;
			}
			say(null);
			const templateId = template.value;
			store.update((st) => {
				st.cityFarm.targets.push({
					id: newId("cf", st.cityFarm.targets.length),
					enabled: true,
					targetTownId: targetId,
					fromTownId: fromId,
					templateId,
					ownerId: null,
					ownerChanged: false,
					sends: 0,
					lastSentAt: null
				});
			});
			target.value = "";
			data?.lookup(targetId).then(() => {
				renderAll();
			}).catch(() => void 0);
		});
		const addRow = el("div", { className: "fields cf-add" });
		addRow.append(kit.field(tr("cfTarget"), target), kit.field(tr("cfFrom"), from), kit.field(tr("cfTemplate"), template), add);
		const listBox = el("div", { className: "farm-box" });
		listBox.dataset.cityFarm = "";
		const listTitle = el("h4", { className: "sub" });
		let shownList = null;
		function renderList() {
			const cfg = store.get().cityFarm;
			const statuses = data?.status() ?? [];
			const key = JSON.stringify([
				cfg.targets,
				cfg.templates.map((tpl) => [tpl.id, tpl.name]),
				statuses.map((r) => [
					r.id,
					r.level,
					r.text
				]),
				cfg.targets.map((t) => [targetLabel(t.targetTownId), far(t)]),
				townListKey(ctx.towns())
			]);
			if (key === shownList) return;
			shownList = key;
			listTitle.textContent = `${tr("cfList")} (${String(cfg.targets.length)})`;
			if (cfg.targets.length === 0) {
				listBox.replaceChildren(el("p", {
					className: "note",
					textContent: tr("cfEmpty")
				}));
				return;
			}
			const names = townNames();
			const status = new Map(statuses.map((r) => [r.id, r]));
			const list = el("ol", { className: "farm-results" });
			for (const t of cfg.targets) {
				const r = status.get(t.id);
				const level = !t.enabled ? t.ownerChanged ? "warn" : "info" : r?.level ?? "info";
				const li = el("li", { className: `cf-row ${level}` });
				li.dataset.cityFarmId = t.id;
				const what = `${names.get(t.fromTownId) ?? `#${String(t.fromTownId)}`} → ${targetLabel(t.targetTownId)}`;
				const toggle = el("input");
				toggle.type = "checkbox";
				toggle.checked = t.enabled;
				toggle.dataset.toggle = `cf:${t.id}`;
				toggle.setAttribute("aria-label", what);
				listen(toggle, "change", () => {
					store.update((st) => {
						const x = st.cityFarm.targets.find((y) => y.id === t.id);
						if (!x) return;
						x.enabled = toggle.checked;
						if (toggle.checked && x.ownerChanged) {
							x.ownerChanged = false;
							x.ownerId = null;
						}
					});
				}, "farmeo: activar");
				const label = el("span", {
					className: "cf-what",
					textContent: what
				});
				if (far(t)) {
					label.classList.add("cf-far");
					label.title = tr("raidFar");
				}
				const select = el("select");
				select.dataset.field = `cfTemplate:${t.id}`;
				select.setAttribute("aria-label", `${tr("cfTemplate")}: ${what}`);
				templateOptions(select, t.templateId);
				if (!cfg.templates.some((tpl) => tpl.id === t.templateId)) {
					const none = el("option", { textContent: "—" });
					none.value = "";
					select.prepend(none);
					select.value = "";
				}
				listen(select, "change", () => {
					if (select.value === "") return;
					store.update((st) => {
						const x = st.cityFarm.targets.find((y) => y.id === t.id);
						if (x) x.templateId = select.value;
					});
				}, "farmeo: plantilla");
				const state = !t.enabled ? tr(t.ownerChanged ? "cfOwnerChanged" : "cfOff") : r?.text ?? tr("cfPending");
				const remove = kit.button("✕", `cfRemove:${t.id}`, () => {
					store.update((st) => {
						st.cityFarm.targets = st.cityFarm.targets.filter((x) => x.id !== t.id);
					});
				}, {
					className: "mini",
					title: tr("cfRemove")
				});
				li.append(toggle, label, select, el("span", { textContent: `${String(t.sends)} ${tr("cfSends")}` }), el("span", {
					className: "cf-state",
					textContent: state
				}), remove);
				list.append(li);
			}
			listBox.replaceChildren(list);
		}
		const farmCard = kit.card({
			id: "cityFarm",
			icon: "🌾",
			title: tr("cityFarm"),
			desc: tr("cityFarmDesc"),
			actions: [kit.switchOnly("cityFarm", tr("cityFarm"), (st) => st.cityFarm.enabled, (st, v) => {
				st.cityFarm.enabled = v;
			})]
		}, el("h4", {
			className: "sub",
			textContent: tr("cfAdd")
		}), el("p", {
			className: "note",
			textContent: tr("cfAddNote")
		}), addRow, error, listTitle, listBox);
		const searchCard = buildSearch();
		function buildSearch() {
			const pointsInput = (id, key, label) => {
				const input = el("input");
				input.type = "text";
				input.inputMode = "numeric";
				input.placeholder = tr("cfSearchNoLimit");
				input.dataset.field = id;
				input.setAttribute("aria-label", label);
				listen(input, "change", () => {
					const text = input.value.trim();
					const n = Number(text);
					if (text !== "" && (!Number.isInteger(n) || n < 1 || n > 1e8)) {
						const cur = store.get().cityFarm.search[key];
						input.value = cur === null ? "" : String(cur);
						return;
					}
					store.update((st) => {
						st.cityFarm.search[key] = text === "" ? null : n;
					});
				}, "buscar objetivos: puntos");
				ctx.syncers.push((st) => {
					if (root.activeElement === input) return;
					const cur = st.cityFarm.search[key];
					input.value = cur === null ? "" : String(cur);
				});
				return input;
			};
			const set = (key) => (st, v) => {
				st.cityFarm.search[key] = v;
			};
			const radius = kit.numberInput("cfRadius", SEARCH_RADIUS_RANGE.min, SEARCH_RADIUS_RANGE.max, (st) => st.cityFarm.search.radius, set("radius"));
			const inactive = kit.numberInput("cfInactive", SEARCH_INACTIVE_RANGE.min, SEARCH_INACTIVE_RANGE.max, (st) => st.cityFarm.search.minInactiveDays, set("minInactiveDays"));
			const maxPlayer = pointsInput("cfMaxPlayer", "maxPlayerPoints", tr("cfSearchMaxPlayer"));
			const maxTown = pointsInput("cfMaxTown", "maxTownPoints", tr("cfSearchMaxTown"));
			const filters = el("div", { className: "fields cf-add" });
			filters.append(kit.field(tr("cfSearchRadius"), radius), kit.field(tr("cfSearchInactive"), inactive), kit.field(tr("cfSearchMaxPlayer"), maxPlayer), kit.field(tr("cfSearchMaxTown"), maxTown));
			const ghosts = kit.switchRow("cfGhosts", tr("cfSearchGhosts"), (st) => st.cityFarm.search.includeGhosts, set("includeGhosts"));
			const alliance = kit.switchRow("cfOwnAlliance", tr("cfSearchOwnAlliance"), (st) => st.cityFarm.search.excludeOwnAlliance, set("excludeOwnAlliance"));
			const searchTemplate = el("select");
			searchTemplate.dataset.field = "cfSearchTemplate";
			let shownOptions = null;
			ctx.syncers.push((st) => {
				const key = JSON.stringify(st.cityFarm.templates.map((tpl) => [tpl.id, tpl.name]));
				if (key === shownOptions) return;
				shownOptions = key;
				const previous = searchTemplate.value;
				templateOptions(searchTemplate, previous === "" ? null : previous);
			});
			const note = el("p", { className: "note" });
			note.dataset.cfSearchNote = "";
			const results = el("div", { className: "farm-box" });
			results.dataset.cfSearchResults = "";
			results.hidden = true;
			let last = null;
			let busy = false;
			const go = kit.button(tr("cfSearchGo"), "cfSearch", () => {
				if (busy || !data?.search) return;
				busy = true;
				go.disabled = true;
				note.textContent = tr("cfSearching");
				data.search(store.get().cityFarm.search).then((r) => {
					last = r;
					renderResults();
				}).catch((err) => {
					last = null;
					results.hidden = true;
					results.replaceChildren();
					note.textContent = `${tr("cfSearchError")}: ${err instanceof Error ? err.message : String(err)}`;
				}).finally(() => {
					busy = false;
					go.disabled = !data.search;
				});
			});
			go.disabled = !data?.search;
			const days = (s) => String(Math.floor(s / 86400));
			const when = (s) => {
				const d = new Date(s * 1e3);
				const p = (n) => String(n).padStart(2, "0");
				return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
			};
			function addRow(row) {
				const templateId = searchTemplate.value;
				store.update((st) => {
					const cf = st.cityFarm;
					if (!cf.templates.some((tpl) => tpl.id === templateId)) return;
					if (cf.targets.length >= 300) return;
					if (cf.targets.some((t) => t.fromTownId === row.fromTownId && t.targetTownId === row.townId)) return;
					cf.targets.push({
						id: newId("cf", cf.targets.length),
						enabled: true,
						targetTownId: row.townId,
						fromTownId: row.fromTownId,
						templateId,
						ownerId: row.playerId ?? 0,
						ownerChanged: false,
						sends: 0,
						lastSentAt: null
					});
				});
				renderResults();
			}
			function renderResults() {
				if (!last) return;
				results.hidden = false;
				const cfg = store.get().cityFarm;
				const since = last.trackedSince;
				const nowS = Math.floor(Date.now() / 1e3);
				note.textContent = since === null ? tr("cfSearchNoHistory") : `${tr("cfSearchTracked")} ${when(since)} (${days(nowS - since)} ${tr("cfSearchDays")}).`;
				if (last.rows.length === 0) {
					results.replaceChildren(el("p", {
						className: "note",
						textContent: tr("cfSearchNone")
					}));
					return;
				}
				const names = townNames();
				const canAdd = cfg.templates.some((tpl) => tpl.id === searchTemplate.value);
				const table = el("table", { className: "cf-table" });
				const head = el("tr");
				for (const key of [
					"cfColTown",
					"cfColPlayer",
					"cfColPoints",
					"cfColInactive",
					"cfColIslands",
					"cfColFrom",
					"cfColSends"
				]) head.append(el("th", { textContent: tr(key) }));
				head.append(el("th"));
				const thead = el("thead");
				thead.append(head);
				const tbody = el("tbody");
				for (const row of last.rows) {
					const tr_ = el("tr");
					tr_.dataset.cfSearchRow = String(row.townId);
					const inList = cfg.targets.filter((t) => t.targetTownId === row.townId);
					const sends = inList.reduce((sum, t) => sum + t.sends, 0);
					const added = inList.some((t) => t.fromTownId === row.fromTownId);
					const cells = [
						row.townName ? `${row.townName} (#${String(row.townId)})` : `#${String(row.townId)}`,
						row.playerId === null ? tr("cfGhost") : row.playerName ?? `#${String(row.playerId)}`,
						row.points === null ? "—" : String(row.points),
						row.inactiveDays === null ? "—" : `${String(row.inactiveDays)} d`,
						String(row.distance),
						names.get(row.fromTownId) ?? `#${String(row.fromTownId)}`,
						inList.length > 0 ? String(sends) : "—"
					];
					for (const text of cells) tr_.append(el("td", { textContent: text }));
					const button = kit.button(added ? tr("cfSearchAdded") : tr("cfAddButton"), `cfSearchAdd:${String(row.townId)}`, () => {
						addRow(row);
					}, { className: "mini" });
					button.disabled = added || !canAdd || cfg.targets.length >= 300;
					if (!canAdd) button.title = tr("cfNoTemplates");
					const cell = el("td", { className: "cf-act" });
					cell.append(button);
					tr_.append(cell);
					tbody.append(tr_);
				}
				table.append(thead, tbody);
				const parts = [table];
				if (last.total > last.rows.length) parts.unshift(el("p", {
					className: "note",
					textContent: `${tr("cfSearchShowing")} ${String(last.rows.length)} / ${String(last.total)}`
				}));
				kit.keepFocus(() => {
					results.replaceChildren(...parts);
				});
			}
			let shownFarm = null;
			ctx.syncers.push((st) => {
				const key = JSON.stringify([st.cityFarm.targets.map((t) => [
					t.fromTownId,
					t.targetTownId,
					t.sends
				]), st.cityFarm.templates.map((tpl) => tpl.id)]);
				if (key === shownFarm) return;
				shownFarm = key;
				renderResults();
			});
			listen(searchTemplate, "change", renderResults, "buscar objetivos: plantilla");
			const run = el("div", { className: "fields cf-add" });
			run.append(kit.field(tr("cfSearchTemplate"), searchTemplate), go);
			return kit.card({
				id: "cityFarmSearch",
				icon: "🔎",
				title: tr("cfSearch"),
				desc: tr("cfSearchDesc")
			}, filters, ghosts, alliance, run, note, results);
		}
		const templatesBox = el("div");
		templatesBox.dataset.raidTemplates = "";
		function unitInput(tpl, unit) {
			const input = el("input");
			input.type = "number";
			input.min = "0";
			input.max = String(MAX_RAID_UNITS);
			input.placeholder = "0";
			input.dataset.field = `rtUnit:${tpl.id}:${unit}`;
			input.dataset.unit = unit;
			const value = tpl.units[unit];
			input.value = value === void 0 ? "" : String(value);
			listen(input, "change", () => {
				const text = input.value.trim();
				const n = text === "" ? 0 : Number(text);
				if (!Number.isInteger(n) || n < 0 || n > 1e5) {
					const cur = store.get().cityFarm.templates.find((x) => x.id === tpl.id)?.units[unit];
					input.value = cur === void 0 ? "" : String(cur);
					return;
				}
				store.update((st) => {
					const x = st.cityFarm.templates.find((y) => y.id === tpl.id);
					if (!x) return;
					const units = {};
					for (const [u, count] of Object.entries(x.units)) if (u !== unit) units[u] = count;
					if (n > 0) units[unit] = n;
					x.units = units;
				});
			}, "plantillas: tropas");
			const label = el("label");
			label.append(el("span", { textContent: unitName(lang, unit) }), input);
			return label;
		}
		function templateBox(tpl, cfg) {
			const box = el("div", { className: "rt-box" });
			box.dataset.raidTemplate = tpl.id;
			const name = el("input");
			name.type = "text";
			name.maxLength = 40;
			name.value = tpl.name;
			name.dataset.field = `rtName:${tpl.id}`;
			name.setAttribute("aria-label", tr("raidName"));
			listen(name, "change", () => {
				const text = name.value.trim();
				if (text === "" || text.length > 40) {
					name.value = store.get().cityFarm.templates.find((x) => x.id === tpl.id)?.name ?? "";
					return;
				}
				store.update((st) => {
					const x = st.cityFarm.templates.find((y) => y.id === tpl.id);
					if (x) x.name = text;
				});
			}, "plantillas: nombre");
			const users = cfg.targets.filter((t) => t.templateId === tpl.id);
			const full = cfg.templates.length >= 50;
			const copy = kit.button(tr("raidDuplicate"), `rtCopy:${tpl.id}`, () => {
				store.update((st) => {
					if (st.cityFarm.templates.length >= 50) return;
					const suffix = ` (${tr("raidCopy")})`;
					st.cityFarm.templates.push({
						id: newId("rt", st.cityFarm.templates.length),
						name: `${tpl.name.slice(0, 40 - suffix.length)}${suffix}`,
						units: { ...tpl.units }
					});
				});
			}, { className: "mini" });
			copy.disabled = full;
			const remove = kit.button(tr("raidDelete"), `rtDelete:${tpl.id}`, () => {
				store.update((st) => {
					if (st.cityFarm.targets.some((t) => t.templateId === tpl.id)) return;
					st.cityFarm.templates = st.cityFarm.templates.filter((x) => x.id !== tpl.id);
				});
			}, { className: "mini" });
			if (users.length > 0) {
				remove.disabled = true;
				remove.title = tr("raidInUse");
			}
			const head = el("div", { className: "row" });
			head.append(name, copy, remove);
			const regular = el("div", { className: "rt-units" });
			regular.append(...REGULAR_UNITS.map((u) => unitInput(tpl, u)));
			const myth = el("details");
			myth.open = MYTH_UNITS.some((u) => tpl.units[u] !== void 0);
			const mythUnits = el("div", { className: "rt-units" });
			mythUnits.append(...MYTH_UNITS.map((u) => unitInput(tpl, u)));
			myth.append(el("summary", { textContent: tr("raidMyth") }), mythUnits);
			const used = el("div", { className: "rt-used" });
			used.dataset.raidUsers = tpl.id;
			if (users.length === 0) used.append(el("span", { textContent: tr("raidUnused") }));
			else {
				const names = townNames();
				used.append(el("span", { textContent: `${tr("raidUsedBy")}:` }));
				for (const t of users) {
					const span = el("span", { textContent: `${names.get(t.fromTownId) ?? `#${String(t.fromTownId)}`} → ${targetLabel(t.targetTownId)}` });
					if (far(t)) {
						span.classList.add("cf-far");
						span.title = tr("raidFar");
					}
					used.append(span);
				}
			}
			box.append(head, regular, myth, used);
			return box;
		}
		const addTemplate = kit.button(tr("raidNew"), "rtNew", () => {
			store.update((st) => {
				if (st.cityFarm.templates.length >= 50) return;
				st.cityFarm.templates.push({
					id: newId("rt", st.cityFarm.templates.length),
					name: `${tr("raidDefaultName")} ${String(st.cityFarm.templates.length + 1)}`,
					units: {}
				});
			});
		});
		let shownTemplates = null;
		function renderTemplates() {
			const cfg = store.get().cityFarm;
			const key = JSON.stringify([
				cfg.templates.map((tpl) => [tpl.id, tpl.name]),
				cfg.targets.map((t) => [
					t.id,
					t.templateId,
					t.fromTownId,
					t.targetTownId,
					far(t)
				]),
				cfg.targets.map((t) => targetLabel(t.targetTownId)),
				townListKey(ctx.towns())
			]);
			addTemplate.disabled = cfg.templates.length >= 50;
			if (key !== shownTemplates) {
				shownTemplates = key;
				kit.keepFocus(() => {
					templatesBox.replaceChildren(...cfg.templates.length > 0 ? cfg.templates.map((tpl) => templateBox(tpl, cfg)) : [el("p", {
						className: "note",
						textContent: tr("raidEmpty")
					})]);
				});
				return;
			}
			for (const tpl of cfg.templates) for (const input of templatesBox.querySelectorAll(`[data-raid-template="${tpl.id}"] input[data-unit]`)) {
				if (root.activeElement === input) continue;
				const n = tpl.units[input.dataset.unit];
				input.value = n === void 0 ? "" : String(n);
			}
		}
		const templatesCard = kit.card({
			id: "raidTemplates",
			icon: "📋",
			title: tr("raidTemplates"),
			desc: tr("raidTemplatesDesc"),
			actions: [addTemplate]
		}, templatesBox);
		let shownTemplateOptions = null;
		function renderAll() {
			const cfg = store.get().cityFarm;
			const options = JSON.stringify(cfg.templates.map((tpl) => [tpl.id, tpl.name]));
			if (options !== shownTemplateOptions) {
				shownTemplateOptions = options;
				const previous = template.value;
				templateOptions(template, previous === "" ? null : previous);
			}
			kit.keepFocus(renderList);
			renderTemplates();
		}
		ctx.syncers.push(() => {
			renderAll();
		});
		ctx.townListRenderers.push(renderAll);
		renderAll();
		return {
			cards: [
				farmCard,
				searchCard,
				templatesCard
			],
			render: () => {
				kit.keepFocus(renderList);
			}
		};
	}
	var TYPES = [
		{
			type: "attacks",
			key: "alertsTypeAttacks"
		},
		{
			type: "conquest",
			key: "alertsTypeConquest"
		},
		{
			type: "combat",
			key: "alertsTypeCombat"
		},
		{
			type: "finished",
			key: "alertsTypeFinished"
		},
		{
			type: "monitor",
			key: "alertsTypeMonitor"
		}
	];
	function buildAlertsCard(ctx) {
		const { kit, el, tr, store, data } = ctx;
		const invalid = el("p", { className: "note warn" });
		invalid.dataset.alertsInvalid = "";
		invalid.hidden = true;
		function webhookInput(id, label, get, set) {
			const input = el("input");
			input.type = "password";
			input.autocomplete = "off";
			input.spellcheck = false;
			input.placeholder = tr("alertsWebhookPlaceholder");
			input.dataset.field = id;
			input.setAttribute("aria-label", label);
			kit.listen(input, "change", () => {
				const value = input.value.trim();
				if (value !== "" && !isDiscordWebhook(value)) {
					invalid.hidden = false;
					invalid.textContent = tr("alertsInvalid");
					input.value = get(store.get());
					return;
				}
				invalid.hidden = true;
				store.update((s) => {
					set(s, value);
				});
			}, "alertas: webhook");
			ctx.syncers.push((s) => {
				if (input.getRootNode().activeElement !== input) input.value = get(s);
			});
			return input;
		}
		const general = webhookInput("alertsWebhook", tr("alertsWebhook"), (s) => s.intel.alerts.webhook, (s, v) => {
			s.intel.alerts.webhook = v;
		});
		const types = el("div", { className: "alert-types" });
		for (const { type, key } of TYPES) {
			const box = el("div", { className: "alert-type" });
			box.dataset.alertType = type;
			box.append(kit.switchRow(`alertType:${type}`, tr(key), (s) => s.intel.alerts.types[type].enabled, (s, v) => {
				s.intel.alerts.types[type].enabled = v;
			}), kit.field(tr("alertsTypeWebhook"), webhookInput(`alertWebhook:${type}`, `${tr(key)}: ${tr("alertsTypeWebhook")}`, (s) => s.intel.alerts.types[type].webhook, (s, v) => {
				s.intel.alerts.types[type].webhook = v;
			})));
			types.append(box);
		}
		const testNote = el("p", { className: "note" });
		testNote.dataset.alertsTestNote = "";
		testNote.hidden = true;
		const test = kit.button(tr("alertsTest"), "alertsTest", () => {
			if (!data) return;
			testNote.hidden = false;
			test.disabled = true;
			testNote.textContent = tr("alertsTestSending");
			data.test().then(({ ok, total }) => {
				testNote.textContent = total === 0 ? tr("alertsTestNone") : ok === total ? `${tr("alertsTestSent")} ${String(ok)} / ${String(total)} ${tr("alertsWebhooks")}.` : `${String(ok)} / ${String(total)}. ${tr("alertsTestFailed")}`;
			}).catch((err) => {
				testNote.textContent = `${tr("alertsTestFailed")} (${err instanceof Error ? err.message : String(err)})`;
			}).finally(() => {
				test.disabled = false;
			});
		});
		test.disabled = !data;
		const enabled = kit.switchOnly("alertsEnabled", tr("alertsEnabled"), (s) => s.intel.alerts.enabled, (s, v) => {
			s.intel.alerts.enabled = v;
		});
		const generalRow = el("div", { className: "fields cf-add" });
		generalRow.append(kit.field(tr("alertsWebhook"), general), test);
		return kit.card({
			id: "discordAlerts",
			icon: "🔔",
			title: tr("alertsTitle"),
			desc: tr("alertsDesc"),
			actions: [enabled]
		}, generalRow, invalid, testNote, types);
	}
	var MA_SHOWN = 50;
	function when$2(ms) {
		const d = new Date(ms);
		const p = (n) => String(n).padStart(2, "0");
		return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
	}
	function buildMonitorCard(ctx) {
		const { kit, el, tr, store, data } = ctx;
		const errorText = (err) => err instanceof Error ? err.message : String(err);
		const allianceLabel = (id) => data?.allianceName(id) ?? `#${String(id)}`;
		const list = el("ul", { className: "intel-files" });
		list.dataset.monitorAlliances = "";
		let shownList = null;
		function renderList(force = false) {
			const ids = store.get().intel.monitor.allianceIds;
			const key = JSON.stringify(ids.map((id) => [id, allianceLabel(id)]));
			if (!force && key === shownList) return;
			shownList = key;
			if (ids.length === 0) {
				list.replaceChildren(el("li", {
					className: "note",
					textContent: tr("monitorNoAlliances")
				}));
				return;
			}
			list.replaceChildren(...ids.map((id) => {
				const li = el("li");
				li.dataset.monitorAlliance = String(id);
				li.append(el("span", { textContent: allianceLabel(id) }), " ", kit.button("✕", `monitorRemove:${String(id)}`, () => {
					store.update((st) => {
						st.intel.monitor.allianceIds = st.intel.monitor.allianceIds.filter((x) => x !== id);
					});
				}, {
					className: "mini",
					title: tr("monitorRemove")
				}));
				return li;
			}));
		}
		ctx.syncers.push(() => {
			renderList();
		});
		const addInput = el("input");
		addInput.type = "text";
		addInput.dataset.field = "monitorAllianceText";
		addInput.placeholder = tr("watchPinPlaceholder");
		const addError = el("p", { className: "note" });
		addError.dataset.monitorAddError = "";
		addError.hidden = true;
		const sayAdd = (text) => {
			addError.hidden = text === null;
			addError.textContent = text ?? "";
		};
		const addButton = kit.button(tr("cfAddButton"), "monitorAdd", () => {
			if (!data || addInput.value.trim() === "") return;
			if (store.get().intel.monitor.allianceIds.length >= 10) {
				sayAdd(tr("monitorFull"));
				return;
			}
			addButton.disabled = true;
			data.findAlliance(addInput.value).then((found) => {
				if (!found) {
					sayAdd(tr("monitorNotFound"));
					return;
				}
				if (store.get().intel.monitor.allianceIds.includes(found.id)) {
					sayAdd(tr("monitorAlready"));
					return;
				}
				sayAdd(null);
				addInput.value = "";
				store.update((st) => {
					st.intel.monitor.allianceIds.push(found.id);
				});
				renderList(true);
			}).catch((err) => {
				sayAdd(`${tr("cfSearchError")}: ${errorText(err)}`);
			}).finally(() => {
				addButton.disabled = false;
			});
		});
		addButton.disabled = !data;
		const addRow = el("div", { className: "fields cf-add" });
		addRow.append(kit.field(tr("monitorAddLabel"), addInput), addButton);
		const factor = kit.numberInput("monitorFactor", MA_FACTOR_RANGE.min, MA_FACTOR_RANGE.max, (st) => st.intel.monitor.maFactor, (st, v) => {
			st.intel.monitor.maFactor = v;
		});
		const note = el("p", { className: "note" });
		note.dataset.monitorNote = "";
		note.hidden = true;
		const results = el("div", { className: "farm-box" });
		results.dataset.monitorResults = "";
		results.hidden = true;
		let loading = false;
		function table(heads, rows) {
			const t = el("table", { className: "cf-table" });
			const head = el("tr");
			for (const key of heads) head.append(el("th", { textContent: tr(key) }));
			const thead = el("thead");
			thead.append(head);
			const tbody = el("tbody");
			tbody.append(...rows);
			t.append(thead, tbody);
			return t;
		}
		function row(cells) {
			const r = el("tr");
			for (const text of cells) r.append(el("td", { textContent: text }));
			return r;
		}
		function render(result) {
			renderList(true);
			note.hidden = false;
			note.textContent = result.trackedSince === null ? `${String(result.members)} ${tr("monitorMembers")}. ${tr("monitorLearning")}` : `${String(result.members)} ${tr("monitorMembers")}. ${tr("monitorTracked")} ${when$2(result.trackedSince * 1e3)}.`;
			results.hidden = false;
			const ioTitle = el("h4", {
				className: "sub",
				textContent: tr("monitorIo")
			});
			const io = result.io.length === 0 ? el("p", {
				className: "note",
				textContent: tr("monitorIoNone")
			}) : table([
				"monitorColWhen",
				"cfColTown",
				"monitorColFrom",
				"monitorColTo",
				"watchColAlliance",
				"cfColPoints"
			], result.io.map((e) => {
				const r = row([
					when$2(e.time * 1e3),
					`#${String(e.townId)}`,
					e.fromName ?? `#${String(e.fromId)}`,
					e.toName ?? `#${String(e.toId)}`,
					e.allianceName ?? `#${String(e.allianceId)}`,
					String(e.points)
				]);
				r.dataset.monitorIo = String(e.townId);
				return r;
			}));
			io.dataset.monitorIoTable = "";
			const maTitle = el("h4", {
				className: "sub",
				textContent: tr("monitorMa")
			});
			const shown = result.ma.slice(0, MA_SHOWN);
			const ma = shown.length === 0 ? el("p", {
				className: "note",
				textContent: tr("monitorMaNone")
			}) : table([
				"cfColPlayer",
				"watchColAlliance",
				"monitorColGain",
				"monitorColUsual",
				"monitorColRatio"
			], shown.map((m) => {
				const r = row([
					m.name,
					m.allianceName ?? `#${String(m.allianceId)}`,
					String(m.gain),
					m.usual === null ? "—" : String(m.usual),
					m.ratio === null ? "—" : `×${String(m.ratio)}`
				]);
				r.dataset.monitorMa = String(m.playerId);
				if (m.alert) r.classList.add("ma-alert");
				return r;
			}));
			ma.dataset.monitorMaTable = "";
			const parts = [
				ioTitle,
				io,
				maTitle
			];
			if (result.ma.length > shown.length) parts.push(el("p", {
				className: "note",
				textContent: `${tr("cfSearchShowing")} ${String(shown.length)} / ${String(result.ma.length)}`
			}));
			parts.push(ma);
			results.replaceChildren(...parts);
		}
		const load = kit.button(tr("watchLoad"), "monitorLoad", () => {
			if (loading || !data) return;
			loading = true;
			load.disabled = true;
			note.hidden = false;
			note.textContent = tr("cfSearching");
			data.load(store.get().intel.monitor).then(render).catch((err) => {
				results.hidden = true;
				note.textContent = `${tr("cfSearchError")}: ${errorText(err)}`;
			}).finally(() => {
				loading = false;
				load.disabled = false;
			});
		});
		load.disabled = !data;
		const runRow = el("div", { className: "fields cf-add" });
		runRow.append(kit.field(tr("monitorFactor"), factor), load);
		const enabled = kit.switchOnly("monitorEnabled", tr("monitorEnabled"), (st) => st.intel.monitor.enabled, (st, v) => {
			st.intel.monitor.enabled = v;
		});
		renderList();
		return kit.card({
			id: "allianceMonitor",
			icon: "📈",
			title: tr("monitorTitle"),
			desc: tr("monitorDesc"),
			actions: [enabled]
		}, addRow, addError, list, runRow, note, results);
	}
	function when$1(ms) {
		const d = new Date(ms);
		const p = (n) => String(n).padStart(2, "0");
		return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
	}
	var signed = (n) => n === null ? "—" : n > 0 ? `+${String(n)}` : String(n);
	function buildWatchCard(ctx) {
		const { kit, el, tr, store, data } = ctx;
		const errorText = (err) => err instanceof Error ? err.message : String(err);
		const radius = kit.numberInput("watchRadius", WATCH_RADIUS_RANGE.min, WATCH_RADIUS_RANGE.max, (st) => st.intel.watch.autoRadius, (st, v) => {
			st.intel.watch.autoRadius = v;
		});
		const inactive = kit.numberInput("watchInactive", WATCH_INACTIVE_RANGE.min, WATCH_INACTIVE_RANGE.max, (st) => st.intel.watch.inactiveDays, (st, v) => {
			st.intel.watch.inactiveDays = v;
		});
		const note = el("p", { className: "note" });
		note.dataset.watchNote = "";
		note.hidden = true;
		const results = el("div", { className: "farm-box" });
		results.dataset.watchResults = "";
		results.hidden = true;
		let loading = false;
		let shown = false;
		function setPinned(playerId, on) {
			store.update((st) => {
				const list = st.intel.watch.pinned;
				if (on && !list.includes(playerId) && list.length < 100) list.push(playerId);
				if (!on) st.intel.watch.pinned = list.filter((id) => id !== playerId);
			});
			if (shown) reload();
		}
		function renderRows(result) {
			results.hidden = false;
			const notes = [];
			if (result.attError !== null) notes.push(`${tr("watchNoAtt")} (${result.attError})`);
			const since = result.rows.find((r) => r.deltaSince !== null)?.deltaSince ?? null;
			notes.push(since === null ? tr("watchNoHistory") : `${tr("watchDeltaSince")} ${when$1(since * 1e3)}.`);
			note.hidden = false;
			note.textContent = notes.join(" ");
			if (result.rows.length === 0) {
				results.replaceChildren(el("p", {
					className: "note",
					textContent: tr("watchNone")
				}));
				return;
			}
			const full = store.get().intel.watch.pinned.length >= 100;
			const table = el("table", { className: "cf-table" });
			const head = el("tr");
			for (const key of [
				"cfColPlayer",
				"watchColAlliance",
				"cfColPoints",
				"watchColDelta",
				"watchColAtt",
				"watchColDelta",
				"cfColInactive",
				"cfColIslands"
			]) head.append(el("th", { textContent: tr(key) }));
			head.append(el("th"));
			const thead = el("thead");
			thead.append(head);
			const tbody = el("tbody");
			for (const row of result.rows) tbody.append(rowElement(row, full));
			table.append(thead, tbody);
			const parts = [table];
			if (result.total > result.rows.length) parts.unshift(el("p", {
				className: "note",
				textContent: `${tr("cfSearchShowing")} ${String(result.rows.length)} / ${String(result.total)}`
			}));
			results.replaceChildren(...parts);
		}
		function rowElement(row, full) {
			const tr_ = el("tr");
			tr_.dataset.watchRow = String(row.playerId);
			if (row.inactive) tr_.classList.add("watch-inactive");
			const days = row.inactiveDays === null ? "—" : `${String(row.inactiveDays)} d${row.inactive ? ` · ${tr("watchInactive")}` : ""}`;
			const deltaTitle = row.deltaSince === null ? "" : `${tr("watchDeltaSince")} ${when$1(row.deltaSince * 1e3)}`;
			const cells = [
				[`${row.pinned ? "📌 " : ""}${row.name}`],
				[row.allianceName ?? "—"],
				[String(row.points)],
				[signed(row.pointsDelta), deltaTitle],
				[row.att === null ? "—" : String(row.att)],
				[signed(row.attDelta), deltaTitle],
				[days],
				[row.distance === null ? "—" : String(row.distance)]
			];
			for (const [text, title] of cells) {
				const td = el("td", { textContent: text });
				if (title) td.title = title;
				tr_.append(td);
			}
			const id = String(row.playerId);
			const button = row.pinned ? kit.button(tr("watchUnpin"), `watchUnpin:${id}`, () => {
				setPinned(row.playerId, false);
			}, { className: "mini" }) : kit.button(tr("watchPin"), `watchPin:${id}`, () => {
				setPinned(row.playerId, true);
			}, { className: "mini" });
			if (!row.pinned && full) {
				button.disabled = true;
				button.title = tr("watchFull");
			}
			const cell = el("td", { className: "cf-act" });
			cell.append(button);
			tr_.append(cell);
			return tr_;
		}
		function reload() {
			if (loading || !data) return;
			loading = true;
			load.disabled = true;
			note.hidden = false;
			note.textContent = tr("cfSearching");
			data.load(store.get().intel.watch).then((result) => {
				shown = true;
				renderRows(result);
			}).catch((err) => {
				results.hidden = true;
				note.textContent = `${tr("cfSearchError")}: ${errorText(err)}`;
			}).finally(() => {
				loading = false;
				load.disabled = false;
			});
		}
		const load = kit.button(tr("watchLoad"), "watchLoad", reload);
		load.disabled = !data;
		const filters = el("div", { className: "fields cf-add" });
		filters.append(kit.field(tr("watchRadius"), radius), kit.field(tr("watchInactiveDays"), inactive), load);
		const pinInput = el("input");
		pinInput.type = "text";
		pinInput.dataset.field = "watchPinText";
		pinInput.placeholder = tr("watchPinPlaceholder");
		const pinError = el("p", { className: "note" });
		pinError.dataset.watchPinError = "";
		pinError.hidden = true;
		const sayPin = (key) => {
			pinError.hidden = key === null;
			pinError.textContent = key === null ? "" : tr(key);
		};
		const pinButton = kit.button(tr("watchPin"), "watchPinAdd", () => {
			if (!data) return;
			const text = pinInput.value;
			if (text.trim() === "") return;
			if (store.get().intel.watch.pinned.length >= 100) {
				sayPin("watchFull");
				return;
			}
			pinButton.disabled = true;
			data.findPlayer(text).then((found) => {
				if (!found) {
					sayPin("watchNotFound");
					return;
				}
				if (store.get().intel.watch.pinned.includes(found.id)) {
					sayPin("watchAlready");
					return;
				}
				sayPin(null);
				pinInput.value = "";
				setPinned(found.id, true);
			}).catch((err) => {
				pinError.hidden = false;
				pinError.textContent = `${tr("cfSearchError")}: ${errorText(err)}`;
			}).finally(() => {
				pinButton.disabled = false;
			});
		});
		pinButton.disabled = !data;
		const pinRow = el("div", { className: "fields cf-add" });
		pinRow.append(kit.field(tr("watchPinLabel"), pinInput), pinButton);
		const enabled = kit.switchOnly("watchEnabled", tr("watchEnabled"), (st) => st.intel.watch.enabled, (st, v) => {
			st.intel.watch.enabled = v;
		});
		return kit.card({
			id: "watchedPlayers",
			icon: "👁",
			title: tr("watchTitle"),
			desc: tr("watchDesc"),
			actions: [enabled]
		}, filters, pinRow, pinError, note, results);
	}
	function when(ms) {
		const d = new Date(ms);
		const p = (n) => String(n).padStart(2, "0");
		return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
	}
	var FILES = [
		{
			kind: "players",
			key: "intelPlayers"
		},
		{
			kind: "towns",
			key: "intelTowns"
		},
		{
			kind: "alliances",
			key: "intelAlliances"
		}
	];
	function buildIntelCards(ctx) {
		const { kit, el, tr, store, data } = ctx;
		const errorText = (err) => err instanceof Error ? err.message : String(err);
		const files = el("ul", { className: "intel-files" });
		files.dataset.intelFiles = "";
		const tracked = el("p", { className: "note" });
		tracked.dataset.intelTracked = "";
		const refreshNote = el("p", { className: "note" });
		refreshNote.dataset.intelRefreshNote = "";
		refreshNote.hidden = true;
		function renderSummary() {
			const s = data?.summary();
			files.replaceChildren(...FILES.map(({ kind, key }) => {
				const at = s?.downloadedAt[kind] ?? null;
				const li = el("li", { textContent: `${tr(key)}: ${at === null ? tr("intelNever") : when(at)}` });
				li.dataset.intelFile = kind;
				return li;
			}));
			tracked.textContent = !s || s.trackedSince === null ? tr("intelNotTracked") : `${tr("cfSearchTracked")} ${when(s.trackedSince * 1e3)} (${String(s.trackedPlayers)} ${tr("intelTrackedPlayers")}).`;
		}
		let refreshing = false;
		const refresh = kit.button(tr("intelRefresh"), "intelRefresh", () => {
			if (refreshing || !data) return;
			refreshing = true;
			refresh.disabled = true;
			refreshNote.hidden = false;
			refreshNote.textContent = tr("intelRefreshing");
			data.refresh().then(() => {
				refreshNote.hidden = true;
			}).catch((err) => {
				refreshNote.textContent = `${tr("intelRefreshError")}: ${errorText(err)}`;
			}).finally(() => {
				refreshing = false;
				refresh.disabled = false;
				renderSummary();
			});
		});
		refresh.disabled = !data;
		const hours = kit.numberInput("intelRefreshHours", WORLD_REFRESH_RANGE.min, WORLD_REFRESH_RANGE.max, (st) => st.intel.worldRefreshHours, (st, v) => {
			st.intel.worldRefreshHours = v;
		});
		const worldRow = el("div", { className: "fields cf-add" });
		worldRow.append(kit.field(tr("intelRefreshHours"), hours), refresh);
		const worldCard = kit.card({
			id: "worldData",
			icon: "🌍",
			title: tr("intelWorld"),
			desc: tr("intelWorldDesc")
		}, worldRow, refreshNote, files, tracked);
		const radius = kit.numberInput("ghostRadius", SEARCH_RADIUS_RANGE.min, SEARCH_RADIUS_RANGE.max, (st) => st.intel.ghostRadius, (st, v) => {
			st.intel.ghostRadius = v;
		});
		const ghostNote = el("p", { className: "note" });
		ghostNote.dataset.ghostNote = "";
		ghostNote.hidden = true;
		const ghostBox = el("div", { className: "farm-box" });
		ghostBox.dataset.ghostResults = "";
		ghostBox.hidden = true;
		let searching = false;
		function renderGhosts(result) {
			ghostBox.hidden = false;
			if (result.rows.length === 0) {
				ghostBox.replaceChildren(el("p", {
					className: "note",
					textContent: tr("ghostNone")
				}));
				return;
			}
			const names = new Map(ctx.towns().map((t) => [t.id, t.name]));
			const table = el("table", { className: "cf-table" });
			const head = el("tr");
			for (const key of [
				"cfColTown",
				"ghostColIsland",
				"cfColPoints",
				"cfColIslands",
				"cfColFrom"
			]) head.append(el("th", { textContent: tr(key) }));
			const thead = el("thead");
			thead.append(head);
			const tbody = el("tbody");
			for (const row of result.rows) {
				const tr_ = el("tr");
				tr_.dataset.ghostRow = String(row.townId);
				for (const text of [
					row.townName ? `${row.townName} (#${String(row.townId)})` : `#${String(row.townId)}`,
					`${String(row.islandX)}|${String(row.islandY)}`,
					row.points === null ? "—" : String(row.points),
					String(row.distance),
					names.get(row.fromTownId) ?? `#${String(row.fromTownId)}`
				]) tr_.append(el("td", { textContent: text }));
				tbody.append(tr_);
			}
			table.append(thead, tbody);
			const parts = [table];
			if (result.total > result.rows.length) parts.unshift(el("p", {
				className: "note",
				textContent: `${tr("cfSearchShowing")} ${String(result.rows.length)} / ${String(result.total)}`
			}));
			ghostBox.replaceChildren(...parts);
		}
		const find = kit.button(tr("cfSearchGo"), "ghostSearch", () => {
			if (searching || !data) return;
			searching = true;
			find.disabled = true;
			ghostNote.hidden = false;
			ghostNote.textContent = tr("cfSearching");
			data.ghosts(store.get().intel.ghostRadius).then((result) => {
				ghostNote.hidden = true;
				renderGhosts(result);
			}).catch((err) => {
				ghostBox.hidden = true;
				ghostNote.textContent = `${tr("cfSearchError")}: ${errorText(err)}`;
			}).finally(() => {
				searching = false;
				find.disabled = false;
			});
		});
		find.disabled = !data;
		const ghostRow = el("div", { className: "fields cf-add" });
		ghostRow.append(kit.field(tr("cfSearchRadius"), radius), find);
		const ghostCard = kit.card({
			id: "ghostTowns",
			icon: "👻",
			title: tr("ghostTowns"),
			desc: tr("ghostTownsDesc")
		}, ghostRow, ghostNote, ghostBox);
		renderSummary();
		return {
			cards: [
				worldCard,
				buildWatchCard({
					kit,
					el,
					tr,
					store,
					data: data?.watch
				}),
				buildMonitorCard({
					kit,
					el,
					tr,
					store,
					syncers: ctx.syncers,
					data: data?.monitor
				}),
				ghostCard,
				buildAlertsCard({
					kit,
					el,
					tr,
					store,
					syncers: ctx.syncers,
					data: data?.alerts
				})
			],
			render: renderSummary
		};
	}
	var PARTNER_KEYS = {
		notEnemies: "marketPartnersNotEnemies",
		all: "marketPartnersAll",
		alliancePacts: "marketPartnersAlliancePacts",
		alliance: "marketPartnersAlliance"
	};
	var REASON_KEYS = {
		type: "marketReasonType",
		partner: "marketReasonPartner",
		unknownPact: "marketReasonUnknownPact",
		delivery: "marketReasonDelivery",
		minTrade: "marketReasonMinTrade",
		balance: "marketReasonBalance",
		ratio: "marketReasonRatio",
		capacity: "marketReasonCapacity",
		resources: "marketReasonResources"
	};
	var RESOURCE_KEYS = {
		wood: "res_wood",
		stone: "res_stone",
		iron: "res_iron"
	};
	function buildMarketCard(ctx) {
		const { kit, el, tr, lang, store, data } = ctx;
		const ratio = (v) => `1:${(v / 100).toFixed(2).replace(".", lang === "es" ? "," : ".")}`;
		const resource = (type, n) => {
			const key = type !== null ? RESOURCE_KEYS[type] : void 0;
			return `${n === null ? "?" : String(n)} ${key ? tr(key) : type ?? "?"}`;
		};
		const pay = kit.slider("marketMaxPay", tr("marketMaxPay"), {
			min: MARKET_RATIO_RANGE.min * 100,
			max: MARKET_RATIO_RANGE.max * 100,
			step: 5
		}, (s) => Math.round(s.market.maxPayRatio * 100), (s, v) => {
			s.market.maxPayRatio = v / 100;
			if (s.market.overflowPayRatio < s.market.maxPayRatio) s.market.overflowPayRatio = s.market.maxPayRatio;
		}, ratio);
		const overflow = kit.slider("marketOverflowPay", tr("marketOverflowPay"), {
			min: MARKET_RATIO_RANGE.min * 100,
			max: MARKET_RATIO_RANGE.max * 100,
			step: 5
		}, (s) => Math.round(s.market.overflowPayRatio * 100), (s, v) => {
			s.market.overflowPayRatio = Math.max(v / 100, s.market.maxPayRatio);
		}, ratio);
		const sliders = el("div", { className: "fields" });
		sliders.append(pay, overflow);
		const number = (id, key, range, get, set) => kit.field(tr(key), kit.numberInput(id, range.min, range.max, get, set));
		const partners = el("select");
		partners.dataset.field = "marketPartners";
		partners.setAttribute("aria-label", tr("marketPartners"));
		for (const p of MARKET_PARTNERS) {
			const option = el("option", { textContent: tr(PARTNER_KEYS[p]) });
			option.value = p;
			partners.append(option);
		}
		kit.listen(partners, "change", () => {
			const value = partners.value;
			const known = MARKET_PARTNERS.find((p) => p === value);
			if (!known) return;
			store.update((s) => {
				s.market.partners = known;
			});
		}, "mercado: con quién");
		ctx.syncers.push((s) => {
			partners.value = s.market.partners;
		});
		const fields = el("div", { className: "fields" });
		fields.append(number("marketDelivery", "marketDelivery", MARKET_DELIVERY_RANGE, (s) => s.market.maxDeliveryMinutes, (s, v) => {
			s.market.maxDeliveryMinutes = v;
		}), number("marketMinTrade", "marketMinTrade", MARKET_MIN_TRADE_RANGE, (s) => s.market.minTrade, (s, v) => {
			s.market.minTrade = v;
		}), number("marketTrades", "marketTrades", MARKET_TRADES_RANGE, (s) => s.market.tradesPerRound, (s, v) => {
			s.market.tradesPerRound = v;
		}), number("marketWithdraw", "marketWithdraw", MARKET_WITHDRAW_RANGE, (s) => s.market.withdrawAfterHours, (s, v) => {
			s.market.withdrawAfterHours = v;
		}), kit.field(tr("marketPartners"), partners));
		const balance = kit.switchRow("marketBalance", tr("marketBalance"), (s) => s.market.balance, (s, v) => {
			s.market.balance = v;
		});
		const note = el("p", { className: "note" });
		note.dataset.marketNote = "";
		note.hidden = true;
		const results = el("div", { className: "farm-box" });
		results.dataset.marketResults = "";
		results.hidden = true;
		function render(p) {
			const own = p.ownOffers === null ? "" : ` ${tr("marketOwnOffers")}: ${String(p.ownOffers)}.`;
			const plan = p.balance ? ` ${tr("marketWouldPublish")} ${resource(p.balance.offerType, p.balance.offer)} → ${resource(p.balance.demandType, p.balance.demand)}.` : "";
			note.textContent = `${p.townName}: ${String(p.verdicts.length)} ${tr("marketOffers")}.${own}${plan}`;
			if (p.verdicts.length === 0) {
				results.hidden = true;
				return;
			}
			results.hidden = false;
			const t = el("table", { className: "cf-table" });
			const head = el("tr");
			for (const key of [
				"cfColPlayer",
				"marketColGet",
				"marketColPay",
				"marketColRatio",
				"marketColTime",
				"marketColVerdict"
			]) head.append(el("th", { textContent: tr(key) }));
			const thead = el("thead");
			thead.append(head);
			const tbody = el("tbody");
			for (const v of p.verdicts) {
				const o = v.offer;
				const r = el("tr");
				r.dataset.marketOffer = String(o.id);
				if (v.reason === null) r.classList.add("market-ok");
				const cells = [
					o.playerName ?? (o.playerId !== null ? `#${String(o.playerId)}` : "?"),
					resource(o.offerType, o.offer),
					resource(o.demandType, o.demand),
					v.pay === null ? "—" : ratio(Math.round(v.pay * 100)),
					o.durationSeconds === null ? "—" : `${String(Math.ceil(o.durationSeconds / 60))} min`,
					v.reason === null ? `✓ ${tr("marketWouldAccept")}` : tr(REASON_KEYS[v.reason])
				];
				for (const text of cells) r.append(el("td", { textContent: text }));
				tbody.append(r);
			}
			t.append(thead, tbody);
			results.replaceChildren(t);
		}
		let loading = false;
		const view = kit.button(tr("marketView"), "marketView", () => {
			if (loading || !data) return;
			loading = true;
			view.disabled = true;
			note.hidden = false;
			note.textContent = tr("cfSearching");
			data.preview().then(render).catch((err) => {
				results.hidden = true;
				note.textContent = `${tr("cfSearchError")}: ${err instanceof Error ? err.message : String(err)}`;
			}).finally(() => {
				loading = false;
				view.disabled = false;
			});
		});
		view.disabled = !data;
		const enabled = kit.switchOnly("marketEnabled", tr("marketEnabled"), (s) => s.market.enabled, (s, v) => {
			s.market.enabled = v;
		});
		return kit.card({
			id: "market",
			icon: "🏪",
			title: tr("marketTitle"),
			desc: tr("marketDesc"),
			actions: [enabled]
		}, el("p", {
			className: "note warn",
			textContent: tr("marketPending")
		}), sliders, fields, balance, view, note, results);
	}
	var BUILDING_SPRITE_PATH = "/images/game/main/buildings_sprite_50x50.png";
	var BUILDING_ICON = 50;
	var BUILDING_SPRITE_WIDTH = 500;
	var BUILDING_SPRITE_POSITIONS = {
		academy: [0, 0],
		barracks: [50, 0],
		docks: [100, 0],
		farm: [150, 0],
		hide: [200, 0],
		ironer: [250, 0],
		lumber: [400, 0],
		main: [450, 0],
		market: [0, 50],
		stoner: [200, 50],
		storage: [250, 50],
		temple: [300, 50],
		wall: [50, 100],
		library: [300, 0],
		lighthouse: [350, 0],
		oracle: [50, 50],
		place: [100, 50],
		statue: [150, 50],
		theater: [350, 50],
		thermal: [400, 50],
		tower: [450, 50],
		trade_office: [0, 100]
	};
	var CDN_SELECTOR = "link[href*=\"innogamescdn.com\"],script[src*=\"innogamescdn.com\"],img[src*=\"innogamescdn.com\"]";
	var GREPOLIS_CDN_HOST = /^gp[a-z0-9-]*\.innogamescdn\.com$/;
	function detectCdnHost(doc) {
		for (const el of Array.from(doc.querySelectorAll(CDN_SELECTOR))) {
			const raw = el.getAttribute("href") ?? el.getAttribute("src");
			if (!raw) continue;
			try {
				const url = new URL(raw, doc.baseURI);
				if (url.protocol === "https:" && GREPOLIS_CDN_HOST.test(url.hostname)) return url.hostname;
			} catch {}
		}
		return null;
	}
	var PROBES = {
		unit: [{
			base: "unit_icon50x50",
			nominal: 50
		}, {
			base: "unit_icon90x90",
			nominal: 90
		}],
		power: [{
			base: "power_icon45x45",
			nominal: 45
		}, {
			base: "power_icon86x86",
			nominal: 86
		}],
		god: [{
			base: "god_mini",
			nominal: null
		}],
		research: [{
			base: "research_icon",
			nominal: null
		}]
	};
	var GAME_ID = /^[a-z0-9_]+$/;
	var RETRY_UNKNOWN_MS = 6e4;
	var PX = /^(-?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)px$/i;
	function px(value) {
		return `${String(Math.round(value * 1e3) / 1e3)}px`;
	}
	function scaleTokens(value, scale) {
		if (value.includes(",") || value.includes("(")) return null;
		const tokens = value.trim().split(/\s+/);
		if (tokens[0] === "") return null;
		return tokens.map((t) => {
			const m = PX.exec(t);
			return m ? px(Number(m[1]) * scale) : t;
		}).join(" ");
	}
	function isAutoSize(value) {
		return value.trim().split(/\s+/).every((t) => t === "auto" || t === "");
	}
	function firstUrl(image) {
		const m = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)\s]*))\s*\)/.exec(image);
		return m?.[1] ?? m?.[2] ?? m?.[3] ?? null;
	}
	function sameBackground(a, b) {
		return a.image === b.image && a.position === b.position && a.size === b.size;
	}
	function createGameIcons(doc = document) {
		const sources = new Map();
		const baselines = new Map();
		const naturalWidths = new Map();
		const waiting = new Map();
		const lastPaint = new WeakMap();
		let paintSeq = 0;
		const pendingFails = new Map();
		let cdnHost = null;
		let cdnCheckedAt = -Infinity;
		function probe(classes, nominal) {
			const win = doc.defaultView;
			const body = doc.body;
			if (!win || !body) return null;
			const el = doc.createElement("div");
			el.className = classes;
			el.setAttribute("aria-hidden", "true");
			el.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none";
			body.append(el);
			try {
				const cs = win.getComputedStyle(el);
				const image = cs.backgroundImage;
				if (!image.includes("url(")) return null;
				const width = Number.parseFloat(cs.width);
				const side = width > 0 ? width : nominal;
				if (side === null || !(side > 0)) return null;
				return {
					image,
					position: cs.backgroundPosition || "0px 0px",
					size: cs.backgroundSize || "auto",
					width: side
				};
			} catch {
				return null;
			} finally {
				el.remove();
			}
		}
		function baseline(spec) {
			if (!baselines.has(spec.base)) baselines.set(spec.base, probe(spec.base, spec.nominal));
			return baselines.get(spec.base) ?? null;
		}
		function probeKind(kind, id) {
			for (const spec of PROBES[kind]) {
				const own = probe(`${spec.base} ${id}`, spec.nominal);
				if (!own) continue;
				const base = baseline(spec);
				if (base && sameBackground(own, base)) continue;
				const alone = probe(id, spec.nominal);
				if (alone && sameBackground(own, alone)) continue;
				return own;
			}
			return null;
		}
		function currentCdnHost() {
			if (cdnHost === null) {
				const now = Date.now();
				if (now - cdnCheckedAt >= RETRY_UNKNOWN_MS) {
					cdnCheckedAt = now;
					cdnHost = detectCdnHost(doc);
				}
			}
			return cdnHost ?? "gpit.innogamescdn.com";
		}
		function buildingSource(id) {
			const pos = Object.hasOwn(BUILDING_SPRITE_POSITIONS, id) ? BUILDING_SPRITE_POSITIONS[id] : void 0;
			if (!pos) return null;
			return {
				image: `url("https://${currentCdnHost()}${BUILDING_SPRITE_PATH}")`,
				position: `${px(-pos[0])} ${px(-pos[1])}`,
				size: `${px(BUILDING_SPRITE_WIDTH)} auto`,
				width: BUILDING_ICON
			};
		}
		function resolve(kind, id) {
			if (kind === "building") {
				const source = buildingSource(id);
				const url = source ? firstUrl(source.image) : null;
				if (url !== null) {
					if (naturalWidths.get(url) === "error") return null;
					if (!naturalWidths.has(url)) loadNaturalWidth(url, () => void 0);
				}
				return source;
			}
			if (!Object.hasOwn(PROBES, kind)) return null;
			const key = `${kind}:${id}`;
			const cached = sources.get(key);
			const now = Date.now();
			if (cached) {
				if (!("unknownAt" in cached)) return cached;
				if (now - cached.unknownAt < RETRY_UNKNOWN_MS) return null;
			}
			const found = probeKind(kind, id);
			sources.set(key, found ?? { unknownAt: now });
			return found;
		}
		function plan(source, side) {
			const scale = side / source.width;
			const position = scaleTokens(source.position, scale);
			if (position === null) return null;
			if (!isAutoSize(source.size)) {
				const size = scaleTokens(source.size, scale);
				return size === null ? null : {
					image: source.image,
					position,
					size
				};
			}
			if (scale === 1) return {
				image: source.image,
				position,
				size: "auto"
			};
			const url = firstUrl(source.image);
			if (url === null) return null;
			const natural = naturalWidths.get(url);
			if (natural === "error") return null;
			if (natural !== void 0) return {
				image: source.image,
				position,
				size: `${px(natural * scale)} auto`
			};
			return {
				image: source.image,
				position,
				waitFor: url,
				scale
			};
		}
		function loadNaturalWidth(url, done) {
			const pending = waiting.get(url);
			if (pending) {
				pending.push(done);
				return;
			}
			waiting.set(url, [done]);
			const img = doc.createElement("img");
			const finish = (width) => {
				const callbacks = waiting.get(url);
				if (!callbacks) return;
				waiting.delete(url);
				naturalWidths.set(url, width > 0 ? width : "error");
				const fails = pendingFails.get(url) ?? [];
				pendingFails.delete(url);
				if (width > 0) {
					for (const cb of callbacks) cb(width);
					return;
				}
				for (const f of fails) {
					if (lastPaint.get(f.target) !== f.token) continue;
					lastPaint.delete(f.target);
					for (const prop of BACKGROUND_PROPS) f.target.style.removeProperty(prop);
					f.onError();
				}
			};
			img.addEventListener("load", () => {
				finish(img.naturalWidth);
			});
			img.addEventListener("error", () => {
				finish(0);
			});
			img.src = url;
			if (img.complete && img.naturalWidth > 0) finish(img.naturalWidth);
		}
		const BACKGROUND_PROPS = [
			"background-image",
			"background-position",
			"background-size",
			"background-repeat"
		];
		function apply(target, image, position, size) {
			target.style.backgroundImage = image;
			target.style.backgroundPosition = position;
			target.style.backgroundSize = size;
			target.style.backgroundRepeat = "no-repeat";
		}
		return { paint(target, kind, id, size, onError) {
			const source = GAME_ID.test(id) ? resolve(kind, id) : null;
			const side = size ?? source?.width ?? NaN;
			const p = source && Number.isFinite(side) && side > 0 ? plan(source, side) : null;
			if (!p) {
				lastPaint.delete(target);
				return false;
			}
			const token = ++paintSeq;
			lastPaint.set(target, token);
			const url = firstUrl(p.image);
			if (onError && url !== null && !naturalWidths.has(url)) {
				pendingFails.set(url, [...pendingFails.get(url) ?? [], {
					target,
					token,
					onError
				}]);
				loadNaturalWidth(url, () => void 0);
			}
			if ("size" in p) {
				apply(target, p.image, p.position, p.size);
				return true;
			}
			loadNaturalWidth(p.waitFor, (width) => {
				if (lastPaint.get(target) !== token) return;
				apply(target, p.image, p.position, `${px(width * p.scale)} auto`);
			});
			return true;
		} };
	}
	var PANEL_STYLE = `
:host {
  all: initial;
  --bg: #1b120a; --bar: #23170c; --card: #24190e; --sub: #1f150c; --line: #4b3620;
  --line-soft: #3a2a19; --frame: #6b5030; --gold: #d8a94b; --gold-hi: #f0c66b;
  --title: #e8b456; --text: #eadbbd; --desc: #cdb994; --muted: #a8916d;
  --ok: #86c98a; --warn: #e6b65a; --err: #ff8173; --rest: #34407e; --rest-hi: #4b59a8;
}
[hidden] { display: none !important; }
* { box-sizing: border-box; font-family: "Trebuchet MS", system-ui, sans-serif; font-size: 13px; }
button, select, input, textarea { color: inherit; font: inherit; }
button { cursor: pointer; }
button:disabled { cursor: default; }
:focus-visible { outline: 2px solid var(--gold); outline-offset: 1px; }

.fab {
  position: fixed; left: 12px; bottom: 12px; z-index: 2147483000;
  width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--gold);
  background: var(--bar); color: var(--gold-hi); font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,.5);
}
.fab:hover { background: #3a2c1d; }
.fab.stopped { background: #8f1d1d; border-color: var(--err); }

/* Ventana */
.panel:focus { outline: none; }
.safety-pop { position: fixed; left: 12px; bottom: 60px; z-index: 2147483001;
  width: min(360px, calc(100vw - 24px)); padding: 10px 14px; border-radius: 6px;
  background: #8f1d1d; color: #fff; font-weight: 700; box-shadow: 0 6px 22px rgba(0,0,0,.6); }
.safety-pop p { margin: 0 0 6px; font-weight: 400; }
.safety-pop button { padding: 4px 12px; border-radius: 4px; font-weight: 700;
  background: #fff; color: #5a1010; border: 0; }
.panel {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2147483000;
  width: min(1180px, calc(100vw - 24px)); height: min(880px, calc(100vh - 24px));
  display: flex; flex-direction: column; overflow: hidden;
  background: var(--bg); color: var(--text);
  border: 1px solid var(--frame); border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0,0,0,.7), inset 0 0 0 1px rgba(240,198,107,.06);
}
header {
  display: flex; align-items: center; gap: 12px; padding: 10px 16px; flex-wrap: wrap;
  background: linear-gradient(#2a1c10, var(--bar)); border-bottom: 1px solid var(--line);
}
header h1 { margin: 0; flex: 1 0 auto; max-width: 100%; display: flex; align-items: baseline; gap: 10px;
  font-size: 16px; font-weight: 700; color: var(--gold-hi); white-space: nowrap; overflow: hidden; }
header h1 small { overflow: hidden; text-overflow: ellipsis; }
header h1 small { color: var(--muted); font-size: 12px; font-weight: 400; }
.hd-switch { display: flex; align-items: center; gap: 6px; padding: 4px 10px; cursor: pointer;
  border-left: 1px solid var(--line-soft); color: var(--desc); font-weight: 700; white-space: nowrap; }
.close { margin-left: auto; background: none; border: 0; color: var(--muted); font-size: 20px; line-height: 1;
  padding: 0 4px; }
.close:hover { color: var(--gold-hi); }
.badge { padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 700;
  border: 1px solid var(--line); white-space: nowrap; }
.badge.off { color: var(--muted); }
.badge.dry { color: var(--warn); border-color: #6b5320; background: #2f2614; }
.badge.live { color: var(--ok); border-color: #2f5a33; background: #17261a; }
select { background: var(--sub); border: 1px solid var(--line); border-radius: 4px;
  padding: 5px 8px; max-width: 100%; }
nav { display: flex; gap: 4px; padding: 0 16px; overflow-x: auto; flex: none;
  background: var(--bar); border-bottom: 1px solid var(--line); }
nav button { background: none; border: 0; border-bottom: 2px solid transparent;
  padding: 11px 12px 9px; color: var(--desc); font-size: 14px; font-weight: 700; white-space: nowrap; }
nav button:hover { color: var(--text); }
nav button.active { color: var(--gold-hi); border-bottom-color: var(--gold); }
nav button.soon { color: var(--muted); font-weight: 400; }
nav .ico { margin-right: 6px; }
.body { flex: 1; overflow-y: auto; padding: 16px 18px; }
.view { display: flex; flex-direction: column; gap: 16px; }
.cols { display: grid; grid-template-columns: minmax(0, 2fr) minmax(260px, 1fr); gap: 16px;
  align-items: start; }
.cols > div { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
@media (max-width: 820px) { .cols { grid-template-columns: minmax(0, 1fr); } }

/* Tarjetas */
.card { background: var(--card); border: 1px solid var(--line); border-radius: 8px; }
.card-hd { display: flex; align-items: center; gap: 14px; padding: 14px 16px; }
.card:not(.collapsed) > .card-hd.has-body { border-bottom: 1px solid var(--line-soft); }
.card-icon { flex: none; width: 56px; height: 56px; display: grid; place-items: center;
  font-size: 28px; border: 1px solid var(--frame); border-radius: 6px;
  background: radial-gradient(circle at 50% 35%, #3a2814, var(--bg)); }
.card-txt { flex: 1 1 280px; min-width: 200px; }
.card-txt h2 { margin: 0; font-size: 17px; font-weight: 700; color: var(--title); }
.card-txt p { margin: 3px 0 0; color: var(--desc); line-height: 1.4; }
.card-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; align-items: center; }
.card-actions .sep { width: 1px; align-self: stretch; background: var(--line); margin: 0 2px; }
.card-bd { padding: 16px; display: flex; flex-direction: column; gap: 14px; }
.chev { flex: none; position: relative; width: 32px; height: 32px; border-radius: 50%;
  border: 1px solid var(--frame); background: var(--sub); }
.chev::before { content: ''; position: absolute; left: 11px; top: 13px; width: 8px; height: 8px;
  border-left: 2px solid var(--gold-hi); border-top: 2px solid var(--gold-hi); transform: rotate(45deg); }
.card.collapsed .chev::before { top: 9px; transform: rotate(225deg); }
.chev:hover { border-color: var(--gold); }
.chev-ph { flex: none; width: 32px; height: 32px; }

/* Botones */
.btn { padding: 7px 16px; border-radius: 4px; font-size: 14px; font-weight: 700;
  background: var(--sub); border: 1px solid var(--frame); color: var(--text); white-space: nowrap; }
.btn:hover:not(:disabled) { border-color: var(--gold); color: var(--gold-hi); }
.btn.danger { color: #f0b8a6; background: #4f2c1d; border-color: #7a3a26; }
.btn.danger:hover:not(:disabled) { border-color: var(--err); color: var(--err); }
.btn.primary, .primary { background: #6e5524; border: 1px solid var(--gold); color: var(--gold-hi);
  padding: 7px 16px; border-radius: 4px; font-weight: 700; }
.primary:hover:not(:disabled) { background: #85682c; }
.btn:disabled, .primary:disabled, .mini:disabled { opacity: .5; }
.mini { padding: 2px 7px; border-radius: 4px; background: var(--sub); border: 1px solid var(--line);
  color: var(--text); line-height: 1.3; }
.mini:hover:not(:disabled) { border-color: var(--gold); color: var(--gold-hi); }

/* Mosaicos (interruptores grandes con icono) */
.tiles { display: flex; gap: 14px; flex-wrap: wrap; }
.tile { position: relative; width: 180px; min-height: 148px; padding: 18px 10px 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 10px;
  border: 1px solid #5a4328; border-radius: 6px; background: var(--sub); cursor: pointer;
  text-align: center; }
.tile:hover { border-color: var(--frame); }
.tile input { position: absolute; opacity: 0; width: 0; height: 0; margin: 0; }
.tile-ico { width: 66px; height: 66px; display: grid; place-items: center; font-size: 36px;
  border: 1px solid var(--frame); border-radius: 4px; background: var(--bg);
  filter: grayscale(.85) brightness(.75); }
.tile-lbl { font-size: 14px; font-weight: 700; color: var(--muted); line-height: 1.25; }
.tile small { color: var(--muted); font-size: 11px; font-style: italic; }
.tile:has(input:checked) { border-color: var(--gold); background: #2e2010;
  box-shadow: inset 0 0 0 1px rgba(240,198,107,.15); }
.tile:has(input:checked) .tile-ico { filter: none; }
.tile:has(input:checked) .tile-lbl { color: var(--text); }
.tile:has(input:checked)::after { content: '✓'; position: absolute; top: 8px; right: 8px;
  width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center;
  background: var(--gold); color: var(--bg); font-weight: 700; font-size: 13px; }
.tile:has(input:focus-visible) { outline: 2px solid var(--gold); outline-offset: 1px; }
.tile:has(input:disabled) { cursor: default; opacity: .7; }
.tile[data-soon] { border-style: dashed; }
.tiles.small .tile { width: 150px; min-height: 112px; gap: 8px; padding-top: 14px; }
.tiles.small .tile-ico { width: 48px; height: 48px; font-size: 26px; }
.tiles.small .tile-lbl { font-size: 13px; }

/* Interruptores pequeños */
.switch { position: relative; flex: none; width: 36px; height: 20px; cursor: pointer; display: inline-block; }
.switch input, .opt .switch-vis input { position: absolute; opacity: 0; width: 0; height: 0; margin: 0; }
.track { position: absolute; inset: 0; border-radius: 10px; background: #3b3024;
  border: 1px solid var(--line); transition: background .15s; }
.track::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px;
  border-radius: 50%; background: var(--muted); transition: transform .15s, background .15s; }
input:checked + .track { background: #8c7334; border-color: var(--gold); }
input:checked + .track::after { transform: translateX(16px); background: var(--gold-hi); }
input:focus-visible + .track { outline: 2px solid var(--gold); outline-offset: 1px; }
.opt { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 2px 0; }
.opt > span:first-child { flex: 1; }
.opt .switch-vis { position: relative; flex: none; width: 36px; height: 20px; }

/* Campos */
.lbl { display: block; margin-bottom: 6px; font-size: 12px; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase; color: var(--desc); }
.fields { display: flex; gap: 18px; flex-wrap: wrap; align-items: flex-start; }
.row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
input[type=number], input[type=text], input[type=password], textarea { background: var(--sub); border: 1px solid var(--line);
  border-radius: 4px; padding: 5px 8px; }
input[type=number] { width: 70px; }
input[type=text], input[type=password] { width: 100%; }
textarea { width: 100%; min-height: 120px; font-family: ui-monospace, monospace; font-size: 12px; }
input:disabled, select:disabled { opacity: .6; }
.slider { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.slider .lbl { margin: 0; flex: 0 0 290px; }
.slider-val { display: inline-flex; align-items: center; gap: 8px; flex-wrap: nowrap; }
.slider-val input[type=number] { width: 76px; font-weight: 700; font-size: 14px; text-align: center; }
.slider input[type=range] { width: 170px; accent-color: var(--gold); }
.slider output { min-width: 96px; padding: 5px 14px; text-align: center; font-weight: 700;
  font-size: 14px; border: 1px solid var(--line); border-radius: 4px; background: var(--sub); }
.stepper { display: inline-flex; align-items: center; border: 1px solid var(--line); border-radius: 4px;
  background: var(--sub); }
.stepper button { width: 28px; height: 28px; background: none; border: 0; color: var(--gold-hi);
  font-size: 16px; font-weight: 700; }
.stepper button:hover:not(:disabled) { background: #2e2010; }
.stepper output { min-width: 40px; text-align: center; font-weight: 700; }
.seg { display: flex; gap: 6px; flex-wrap: wrap; }
.seg button { padding: 6px 12px; border-radius: 4px; font-weight: 700;
  background: var(--sub); border: 1px solid var(--line); color: var(--text); }
.seg button:hover { border-color: var(--gold); }
.seg button.active { border-color: var(--gold); color: var(--gold-hi); background: #3a2d18; }

/* Chips */
.chips { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.chip { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 12px;
  border-radius: 16px; border: 1px solid var(--line); background: var(--sub);
  font-size: 14px; font-weight: 700; color: var(--text); }
.chip:hover { border-color: var(--frame); }
.chip.active { border-color: var(--gold); background: #2e2010; color: var(--gold-hi);
  box-shadow: inset 0 0 0 1px var(--gold); }
.chip .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--muted); }
.chip { max-width: 100%; }
.chip-txt { min-width: 0; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chip .dot, .chip .count { flex: none; }
.chip .count { min-width: 18px; padding: 1px 6px; border-radius: 9px; background: #3a2a19;
  color: var(--desc); font-size: 11px; text-align: center; }
.chip.small { height: 26px; font-size: 12px; padding: 0 10px; }

/* Ciudades */
.town-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px; }
.town-card { display: grid; grid-template-columns: 40px minmax(0, 1fr); grid-template-rows: auto auto 1.2em;
  gap: 4px 10px; align-items: center;
  padding: 10px 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--sub); }
.avatar { grid-row: 1 / -1; width: 40px; height: 40px; border-radius: 50%; display: grid;
  place-items: center; font-weight: 700; font-size: 15px; color: var(--bg);
  background: radial-gradient(circle at 40% 35%, var(--gold-hi), #8c6a2c); }
.town-card .town { font-weight: 700; color: var(--text); font-size: 14px; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap; }
.town-card select { width: 100%; }
.town-card small { grid-column: 2; color: var(--muted); }

/* Editor de perfiles (como la tarjeta Perfil de Grepoworks) */
.pe { display: flex; flex-direction: column; gap: 14px; }
.sub { border: 1px solid var(--line-soft); border-radius: 6px; padding: 12px 14px; background: rgba(0,0,0,.12);
  display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.sub > h3 { margin: 0; font-size: 13px; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; color: #c9a24f; display: flex; align-items: center; gap: 8px; }
.pe-top { display: flex; gap: 14px; flex-wrap: wrap; align-items: stretch; }
.pe-top > .sub { flex: 0 1 auto; }
.info-i { display: inline-grid; place-items: center; width: 16px; height: 16px; border-radius: 50%;
  border: 1px solid var(--desc); font-size: 10px; font-style: italic; font-weight: 700; color: var(--desc);
  text-transform: none; letter-spacing: 0; cursor: help; }
.gi { display: inline-block; flex: none; background-repeat: no-repeat; border-radius: 3px; vertical-align: middle; }
.gi-txt { display: inline-grid; place-items: center; line-height: 1; }
.pe-tabs { display: flex; gap: 2px; align-items: center; flex-wrap: wrap; padding: 4px 10px; border-radius: 6px;
  background: linear-gradient(#f3e3bd, #e0c992); border: 1px solid #b89a5c; }
.pe-tabs button { background: none; border: 0; border-bottom: 2px solid transparent; padding: 6px 12px;
  color: #6b5030; font-size: 14px; font-weight: 700; }
.pe-tabs button:hover { color: #3a2814; }
.pe-tabs button.active { color: #2a1c10; border-bottom-color: #2a1c10; }
.pe-tabs .ico { margin-right: 6px; }
.pe-view { display: flex; flex-direction: column; gap: 12px; }
.pe-legend { display: flex; flex-wrap: wrap; gap: 6px 18px; align-items: center; color: var(--desc); font-size: 12px; }
.pe-town, .pe-reached, .pe-dot { display: inline-flex; align-items: center; gap: 6px; }
.pe-town select { padding: 2px 6px; font-size: 12px; }
.pe-btns { display: flex; gap: 8px; margin-left: auto; }
.pe-h { margin: 0; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase; color: var(--title); }

/* Umbral de población */
.pe-floor { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 12px 14px;
  border: 1px solid var(--line); border-radius: 6px; background: var(--sub); }
.pe-floor-txt { flex: 1 1 320px; min-width: 0; }
.pe-floor-txt strong { color: var(--text); font-size: 15px; }
.pe-floor-txt .note { margin-top: 2px; }
.pe-floor.off > div:not(.pe-floor-txt) { opacity: .55; }
.pe-floor .lbl { font-size: 11px; }
.pe-floor .stepper input[type=number] { width: 48px; border: 0; background: none; text-align: center; font-weight: 700; }

/* Tramos y edificios */
.pe-stagebar .chip.add { border-style: dashed; color: var(--desc); }
.bt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 10px; }
.bt { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px; min-width: 0;
  padding: 8px 6px; border: 1px solid #4a3620; border-radius: 6px; background: var(--sub); }
.bt.on { border-color: #8a6a35; background: #251a0e; }
.bt:not(.ro) { cursor: pointer; }
.bt-hd { display: flex; gap: 4px; align-items: stretch; }
.bt-ico { position: relative; }
.bt-pick, .ut-pick .ut-ico, .rs-ico { line-height: 0; border: 1px solid var(--frame); border-radius: 4px; background: var(--bg); }
.bt-pick { display: block; padding: 0; }
.bt-pick:hover:not(:disabled), .rs-pick:hover:not(:disabled) .rs-ico, .ut-pick:hover:not(:disabled) .ut-ico {
  border-color: var(--gold); }
.bt:not(.on) .gi, .rs:not(.on) .rs-ico .gi, .ut:not(.on) .ut-ico .gi { filter: grayscale(.9) brightness(.6); }
.bt-lvl { position: absolute; left: 2px; bottom: 2px; width: 34px; padding: 0 3px; border: 0; border-radius: 3px;
  background: rgba(0,0,0,.6); color: #8ee07a; font-size: 15px; font-weight: 700; line-height: 18px;
  text-shadow: 0 1px 1px #000; appearance: textfield; -moz-appearance: textfield; }
.bt-ico input.bt-lvl { width: 38px; padding: 0 3px; }
.bt-lvl::-webkit-inner-spin-button, .bt-lvl::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
span.bt-lvl { width: auto; color: var(--muted); }
.bt-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: var(--ok); }
.bt-ico .bt-dot { position: absolute; top: -4px; right: -4px; box-shadow: 0 0 0 2px var(--bg); }
.bt-arrows { display: flex; flex-direction: column; gap: 2px; }
.bt-arrows button { flex: 1; width: 18px; padding: 0; font-size: 9px; color: var(--gold-hi); background: var(--bg);
  border: 1px solid var(--line); border-radius: 3px; }
.bt-arrows button:hover:not(:disabled) { border-color: var(--gold); }
.bt-arrows button:disabled { color: var(--muted); opacity: .45; }
.bt-name { max-width: 100%; font-weight: 700; font-size: 13px; color: var(--text); text-align: center;
  line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bt:not(.on) .bt-name { color: var(--muted); }
.bt-now { min-height: 1.2em; color: var(--muted); font-size: 11px; }
.bt-prio { display: inline-flex; align-items: center; gap: 4px; color: var(--muted); font-size: 12px; }
.bt-prio input[type=number] { width: 58px; padding: 1px 6px; text-align: center; font-weight: 700; }
.bt-note { color: var(--muted); font-size: 11px; font-style: italic; text-align: center; }
.pe-specials { display: flex; gap: 12px; flex-wrap: wrap; }
.pe-slot { flex: 1 1 360px; min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 8px 10px;
  border: 1px dashed var(--line); border-radius: 6px; }
.pe-slot .bt-grid { grid-template-columns: repeat(auto-fill, minmax(112px, 1fr)); }
.pe-slot h4 { margin: 0; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--desc); }

/* Investigación */
.rs-grid { display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch; }
.rs-group { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px; border: 1px solid var(--line-soft);
  border-radius: 6px; background: rgba(0,0,0,.12); }
.rs-lvl { width: 70px; min-height: 96px; display: flex; flex-direction: column; align-items: center; justify-content: center;
  border: 1px solid var(--line); border-radius: 4px; background: var(--bg); color: var(--desc);
  font-size: 9px; letter-spacing: .03em; text-transform: uppercase; }
.rs-lvl strong { font-size: 20px; color: var(--gold-hi); letter-spacing: 0; }
.rs { position: relative; width: 124px; display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 6px 4px; border: 1px solid transparent; border-radius: 6px; }
.rs.on { border-color: #8a6a35; background: #251a0e; }
.rs-pick, .ut-pick { display: flex; flex-direction: column; align-items: center; gap: 4px; max-width: 100%;
  padding: 0; border: 0; background: none; color: var(--muted); }
.rs-ico, .ut-ico { position: relative; display: inline-block; }
.rs.on .rs-pick, .ut.on .ut-pick { color: var(--text); }
.rs-name { font-size: 12px; text-align: center; line-height: 1.2; }
.rs.on .rs-name { font-weight: 700; }
.rs.avoid .rs-name { text-decoration: line-through; }
.rs-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: var(--muted); }
.rs-ico .rs-dot { position: absolute; top: -4px; right: -4px; box-shadow: 0 0 0 2px var(--bg); }
.rs-dot.done { background: #6cc04a; }
.rs-dot.queued { background: #5aa0e0; }
.rs-dot.ready { background: #f0d050; }
.rs-dot.academy { background: #e0904a; }
.rs-dot.points { background: #b98be0; }
.rs-dot.resources { background: #e0604a; }
.rs-dot.dependency { background: #c9a37a; }
.rs-avoid { position: absolute; top: 4px; left: 6px; padding: 0; border: 0; background: none; color: var(--muted);
  opacity: 0; font-size: 14px; line-height: 1; }
.rs:hover .rs-avoid, .rs-avoid:focus-visible { opacity: .8; }
.rs-avoid[aria-pressed=true], span.rs-avoid { opacity: 1; color: var(--err); }
.pe-budget p { margin: 0; }

/* Tropas */
.sp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr)); gap: 10px; }
.sp { display: flex; gap: 12px; min-width: 0; padding: 10px 12px; border: 1px solid var(--line); border-radius: 6px;
  background: var(--sub); }
.sp.on { border-color: var(--gold); background: #251a0e; }
.sp-pick { flex: none; align-self: flex-start; padding: 0; line-height: 0; overflow: hidden;
  border: 1px solid var(--frame); border-radius: 50%; background: var(--bg); }
.sp-pick:hover:not(:disabled) { border-color: var(--gold); }
.sp-pick .gi { border-radius: 50%; }
.sp:not(.on) .sp-pick .gi { filter: grayscale(.9) brightness(.6); }
.sp:not(.on) .sp-bd { opacity: .7; }
/* Sin el dios del hechizo ("Sin templo") toda la tarjeta se apaga, como en Grepoworks. */
.sp.unavailable { opacity: .5; }
.sp-bd { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.sp-title { display: flex; align-items: center; gap: 8px; }
.sp-title strong { flex: 1; min-width: 0; font-size: 16px; color: var(--text); }
.sp-badge { flex: none; padding: 1px 8px; border-radius: 9px; font-size: 11px; font-weight: 700;
  background: #3a2a19; color: var(--desc); }
.sp-badge.active { background: #2f5d9a; color: #e3efff; }
.sp-badge.ready { background: #2f5a33; color: #d9f5da; }
.sp-badge.favor, .sp-badge.queue { background: #6b5320; color: #fbe9c0; }
.sp-meta { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 12px; }
.sp-meta .gi { border-radius: 50%; }
.sp .fields { gap: 10px; }
.sp .lbl { font-size: 10px; margin-bottom: 3px; }
.sp input[type=number] { width: 96px; }
.pe-lanes { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr)); gap: 16px; }
.pe-lane { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.ut-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); gap: 8px; }
.ut { display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 0; padding: 8px 6px;
  border: 1px solid #4a3620; border-radius: 6px; background: var(--sub); }
.ut.on { border-color: #8a6a35; background: #251a0e; }
.ut-name { font-size: 12px; font-weight: 700; text-align: center; line-height: 1.2; }
.ut-have { position: absolute; right: 2px; bottom: 2px; padding: 0 4px; border-radius: 3px;
  background: rgba(0,0,0,.65); color: #fff; font-size: 11px; font-weight: 700; line-height: 16px; }
.ut-have[data-troop-have="0"] { display: none; }
.ut .ut-target { width: 92px; text-align: center; font-weight: 700; }
.ut-sub { display: flex; align-items: center; gap: 3px; color: var(--muted); font-size: 11px; }
.ut-sub input[type=number] { width: 46px; padding: 1px 3px; font-size: 11px; text-align: center; }
.god-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(270px, 100%), 1fr)); gap: 10px; }
.god-block { display: flex; flex-direction: column; gap: 8px; min-width: 0; padding: 8px;
  border: 1px solid var(--line-soft); border-radius: 6px; background: rgba(0,0,0,.12); }
.god-block .pe-h { text-transform: none; letter-spacing: 0; color: var(--gold-hi); }
.god-block .pe-h .gi { border-radius: 50%; }
.troop-state { margin: 0; font-size: 11px; color: var(--muted); text-align: center; }
.pe-io { display: flex; flex-direction: column; gap: 8px; }
.troop-state.ready, .troop-state.ordered, .troop-state.done { color: var(--ok); }
.troop-state.resources, .troop-state.population, .troop-state.favor,
.troop-state.queueFull, .troop-state.away { color: var(--warn); }
.troop-state.building, .troop-state.research, .troop-state.god { color: var(--err); }
.grow { flex: 1; min-width: 0; }
.spacer { flex: 1; }
.note { color: var(--muted); margin: 0; line-height: 1.4; }
.mono { font-family: ui-monospace, monospace; font-size: 12px; word-break: break-word; }
.ro-note { padding: 8px 12px; border: 1px dashed var(--frame); border-radius: 6px; color: var(--desc); margin: 0; }

/* Descanso */
.hours { display: grid; grid-template-columns: repeat(24, 1fr); gap: 2px; }
.hours div { height: 22px; border-radius: 2px; background: #3a2f22; font-size: 10px;
  color: var(--muted); display: grid; place-items: center; }
.hours div.on { background: var(--rest-hi); color: #e5e8ff; }
.hours.disabled div.on { background: var(--rest); opacity: .55; }

/* Aldeas, estado, registro */
.farm-box { background: var(--sub); border: 1px solid var(--line); border-radius: 6px;
  padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }
.farm-next { display: flex; align-items: center; gap: 10px; }
.farm-status { flex: 1; color: var(--desc); }
.farm-status strong { color: var(--text); }
.tabs { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.tabs button[data-tab] { font-size: 13px; font-weight: 700; border: 1px solid var(--line); background: var(--sub);
  border-radius: 14px; padding: 4px 12px; color: var(--desc); }
.tabs button[data-tab].active { color: var(--gold-hi); border-color: var(--gold); background: #2e2010; }
.tabs .spacer { flex: 1; }
ol { list-style: none; margin: 0; padding: 0; overflow-y: auto; max-height: 56vh; }
li { padding: 4px 0; border-bottom: 1px solid var(--line-soft); word-break: break-word; }
li:last-child { border-bottom: 0; }
time { color: var(--muted); margin-right: 6px; font-variant-numeric: tabular-nums; }
.town { color: var(--gold-hi); }
.info { color: var(--text); }
.success { color: var(--ok); }
.warn { color: var(--warn); }
.error { color: var(--err); font-weight: 700; }
.muted { opacity: .55; font-weight: 400; }
.empty { color: var(--muted); font-style: italic; }
.farm-results { max-height: 24vh; }
h4.sub { margin: 4px 0 0; font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--desc); }
.alert { padding: 10px 16px; background: #8f1d1d; color: #fff; font-weight: 700; flex: none; }
.alert p { margin: 0 0 6px; font-weight: 400; }
.alert.wait { background: #7a5408; }
.alert button { padding: 4px 12px; border-radius: 4px; font-weight: 700;
  background: #fff; color: #5a1010; border: 0; }
.contents { display: contents; }
.soon-card .card-icon { filter: grayscale(.8); }
.soon-card ul { margin: 0; padding-left: 18px; color: var(--desc); line-height: 1.6; }

/* Farmeo de ciudades */
.cf-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.cf-row .cf-what { flex: 1 1 220px; }
.cf-row select { max-width: 160px; }
.cf-far { color: var(--warn); }
.cf-add { align-items: flex-end; }
.cf-add input[type=text] { width: 150px; }
.rt-box { border: 1px solid var(--line-soft); border-radius: 6px; padding: 8px 10px; margin: 6px 0; }
.rt-units { display: flex; flex-wrap: wrap; gap: 6px 14px; margin: 6px 0; }
.rt-units label { display: inline-flex; align-items: center; gap: 6px; }
.rt-units input[type=number] { width: 64px; padding: 2px 4px; }
.rt-box input[type=text] { width: 200px; }
.rt-used { display: flex; flex-wrap: wrap; gap: 4px 10px; color: var(--desc); }
.cf-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.cf-table th { text-align: left; color: var(--muted); font-weight: 600; padding: 2px 6px;
  border-bottom: 1px solid var(--line); }
.cf-table td { padding: 3px 6px; border-bottom: 1px solid var(--line-soft); }
.cf-table td.cf-act { text-align: right; }
.cf-table tr.watch-inactive td, .cf-table tr.ma-alert td { color: var(--warn); }
.alert-types { display: grid; gap: 6px; margin-top: 8px; }
.alert-type { border-top: 1px solid var(--line-soft); padding-top: 6px; }
.intel-files { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 4px 18px;
  color: var(--desc); }
`;
	var VIEWS = [
		{
			id: "profiles",
			icon: "📋",
			key: "tabProfiles"
		},
		{
			id: "trade",
			icon: "⚖",
			key: "tabTrade"
		},
		{
			id: "island",
			icon: "🏝",
			key: "tabIsland"
		},
		{
			id: "culture",
			icon: "🎭",
			key: "tabCulture",
			soon: {
				items: ["soonCulture", "soonCulture2"],
				phase: "soonPhase6"
			}
		},
		{
			id: "combat",
			icon: "⚔",
			key: "tabCombat",
			soon: {
				items: ["soonCombat", "soonCombat2"],
				phase: "soonPhase7"
			}
		},
		{
			id: "cityFarms",
			icon: "🌾",
			key: "tabCityFarms",
			soon: {
				items: ["soonCityFarms"],
				phase: "soonPhase7"
			}
		},
		{
			id: "intel",
			icon: "🛡",
			key: "tabIntel",
			soon: {
				items: ["soonIntel"],
				phase: "soonPhase8"
			}
		},
		{
			id: "activity",
			icon: "📊",
			key: "tabActivity"
		}
	];
	var POLL_SLIDER = {
		min: 5,
		max: 120
	};
	var POLL_MAX_S = 600;
	function formatSpellTime(epochS) {
		const d = new Date(epochS * 1e3);
		const p = (n) => String(n).padStart(2, "0");
		return `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
	}
	function formatDuration(total) {
		const p = (n) => String(n).padStart(2, "0");
		return `${String(Math.floor(total / 3600))}:${p(Math.floor(total % 3600 / 60))}:${p(total % 60)}`;
	}
	function formatTownIds(ids) {
		return ids === "all" ? "" : ids.join(", ");
	}
	function formatWait(seconds) {
		const s = Math.round(seconds);
		if (s >= 3600) return `${Math.floor(s / 3600)} h ${String(Math.floor(s % 3600 / 60)).padStart(2, "0")} min`;
		if (s >= 60) return `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`;
		return `${s} s`;
	}
	var hourLabel = (h) => `${String(h).padStart(2, "0")}:00`;
	function createPanel(options) {
		const doc = options.doc ?? document;
		const maxVisible = options.maxVisibleLogs ?? 100;
		const { store } = options;
		const host = doc.createElement("div");
		host.id = "grepo-helper-root";
		const root = host.attachShadow({ mode: "open" });
		const el = (tag, props = {}) => Object.assign(doc.createElement(tag), props);
		const icons = createGameIcons(doc);
		const report = options.onError ?? createErrorReporter(null);
		const listen = (target, type, handler, label) => {
			target.addEventListener(type, contain(`panel: ${label}`, handler, report));
		};
		const fab = el("button", {
			className: "fab",
			textContent: "GH",
			title: "grepo-helper"
		});
		fab.type = "button";
		const panel = el("div", { className: "panel" });
		panel.hidden = true;
		panel.tabIndex = -1;
		panel.setAttribute("role", "dialog");
		panel.setAttribute("aria-labelledby", "gh-title");
		const safetyPop = el("div", { className: "safety-pop" });
		safetyPop.dataset.safetyPop = "";
		safetyPop.hidden = true;
		safetyPop.setAttribute("role", "alert");
		root.append(el("style", { textContent: PANEL_STYLE }), fab, safetyPop, panel);
		function setOpen(open) {
			const focusInside = root.activeElement !== null && root.activeElement !== fab;
			panel.hidden = !open;
			if (open && activeView === "profiles") refreshEditorLive();
			if (open) panel.focus({ preventScroll: true });
			else if (focusInside) fab.focus();
		}
		let lang = store.get().language;
		let activeTab = "activity";
		let activeView = "profiles";
		let townFilter = { kind: "all" };
		const collapsed = new Set();
		const syncers = [];
		let logList = el("ol");
		let tabButtons = new Map();
		let viewParts = new Map();
		let alertBox = el("div");
		let farmBox = el("div");
		let farmNextEl = null;
		let townsBox = el("div");
		let researchBox = el("div");
		let recruitBox = el("div");
		let buildBox = el("div");
		let tradeBox = el("div");
		let villageTradeBox = el("div");
		let villageExpansionBox = el("div");
		let hideBox = el("div");
		let heroesBox = el("div");
		let festivalsBox = el("div");
		let defenseAttacksBox = el("div");
		let defenseBox = el("div");
		let banditsBox = el("div");
		let missionsBox = el("div");
		let renderSpells = () => void 0;
		let renderTimed = () => void 0;
		let renderCityFarm = () => void 0;
		let renderIntel = () => void 0;
		const townListRenderers = [];
		let renderPoolTargets = () => void 0;
		const editorState = {
			profileId: null,
			townId: null,
			confirmDelete: null
		};
		let shownTownProfiles = null;
		let shownTownQueues = null;
		let shownTowns = "";
		let renderEditor = () => void 0;
		let refreshEditorLive = () => void 0;
		const tr = (key) => t(lang, key);
		const kit = createKit({
			el,
			listen,
			tr,
			store,
			root,
			syncers,
			collapsed
		});
		const towns = () => options.towns?.list() ?? [];
		function hourSelect(id, get, set) {
			const select = el("select");
			select.dataset.field = id;
			for (let h = 0; h < 24; h++) {
				const option = el("option", { textContent: hourLabel(h) });
				option.value = String(h);
				select.append(option);
			}
			listen(select, "change", () => {
				const value = Number(select.value);
				store.update((s) => {
					set(s, value);
				});
			}, "descanso");
			syncers.push((s) => {
				select.value = String(get(s));
			});
			return select;
		}
		function headerSwitch(id, key, get, set) {
			const label = el("label", { className: "hd-switch" });
			const vis = el("span", { className: "switch" });
			vis.append(kit.toggleInput(id, get, set), el("span", { className: "track" }));
			label.append(vis, el("span", { textContent: tr(key) }));
			return label;
		}
		function buildHeader() {
			const header = el("header");
			const title = el("h1", { textContent: `⚔ ${tr("title")}` });
			title.id = "gh-title";
			if (options.subtitle) title.append(el("small", { textContent: options.subtitle }));
			const badge = el("span", { className: "badge" });
			badge.dataset.mode = "";
			syncers.push((s) => {
				const mode = !s.enabled ? "off" : s.dryRun ? "dry" : "live";
				badge.className = `badge ${mode}`;
				badge.textContent = tr(mode === "off" ? "modeOff" : mode === "dry" ? "modeDry" : "modeLive");
				badge.hidden = mode === "dry";
			});
			const langSelect = el("select", { title: tr("language") });
			langSelect.dataset.field = "language";
			langSelect.setAttribute("aria-label", tr("language"));
			for (const [code, name] of Object.entries(LANGUAGE_NAMES)) {
				const option = el("option", { textContent: name });
				option.value = code;
				langSelect.append(option);
			}
			langSelect.value = lang;
			listen(langSelect, "change", () => {
				const value = langSelect.value;
				store.update((s) => {
					s.language = value;
				});
			}, "idioma");
			const closeBtn = el("button", {
				className: "close",
				textContent: "×",
				title: tr("close")
			});
			closeBtn.type = "button";
			closeBtn.dataset.action = "close";
			closeBtn.setAttribute("aria-label", tr("close"));
			listen(closeBtn, "click", () => {
				setOpen(false);
			}, "cerrar");
			header.append(title, badge, headerSwitch("enabled", "switchOn", (s) => s.enabled, (s, v) => {
				s.enabled = v;
			}), headerSwitch("dryRun", "switchDry", (s) => s.dryRun, (s, v) => {
				s.dryRun = v;
			}), langSelect, closeBtn);
			return header;
		}
		function paintTileIcon(tile, kind, id) {
			const box = tile.querySelector(".tile-ico");
			if (!box) return;
			const img = el("span", { className: "gi" });
			img.style.width = "60px";
			img.style.height = "60px";
			const emoji = [...box.childNodes];
			if (icons.paint(img, kind, id, 60, () => {
				box.replaceChildren(...emoji);
			})) box.replaceChildren(img);
		}
		function buildAutomation() {
			const masters = [
				{
					id: "autoBuild",
					icon: "🏛",
					key: "tileBuild",
					image: "main"
				},
				{
					id: "autoResearch",
					icon: "📜",
					key: "tileResearch",
					image: "academy"
				},
				{
					id: "autoRecruit",
					icon: "⚔",
					key: "tileRecruit",
					image: "barracks"
				},
				{
					id: "heroDispatch",
					icon: "🦸",
					key: "tileHeroes"
				}
			];
			const tiles = el("div", { className: "tiles" });
			for (const m of masters) {
				const tile = kit.tile({
					id: m.id,
					icon: m.icon,
					label: tr(m.key)
				}, (s) => s.masters[m.id], (s, v) => {
					s.masters[m.id] = v;
				});
				if ("image" in m) paintTileIcon(tile, "building", m.image);
				tiles.append(tile);
			}
			const setPollMin = (s, v) => {
				const spread = Math.max(0, s.pollIntervalMs.maxMs - s.pollIntervalMs.minMs);
				s.pollIntervalMs.minMs = v * 1e3;
				s.pollIntervalMs.maxMs = Math.min(POLL_MAX_S * 1e3, v * 1e3 + spread);
			};
			const poll = kit.slider("pollSlider", tr("pollSlider"), {
				min: POLL_SLIDER.min,
				max: POLL_SLIDER.max
			}, (s) => Math.round(s.pollIntervalMs.minMs / 1e3), setPollMin, (v) => `${v}s`, {
				number: {
					id: "pollMin",
					max: POLL_MAX_S
				},
				after: [
					el("span", {
						className: "note",
						textContent: tr("pollTo")
					}),
					kit.numberInput("pollMax", POLL_SLIDER.min, POLL_MAX_S, (s) => Math.round(s.pollIntervalMs.maxMs / 1e3), (s, v) => {
						s.pollIntervalMs.maxMs = v * 1e3;
						if (s.pollIntervalMs.minMs > v * 1e3) s.pollIntervalMs.minMs = v * 1e3;
					}, `${tr("pollSlider")}: ${tr("pollTo")}`),
					el("span", {
						className: "note",
						textContent: "s"
					})
				]
			});
			return kit.card({
				id: "automation",
				icon: "🏛",
				title: tr("sectionAutomation"),
				desc: tr("automationDesc")
			}, tiles, poll, el("p", {
				className: "note",
				textContent: `${tr("pollHint")} ${tr("modulesNote")}`
			}));
		}
		function buildTowns() {
			townsBox = el("div", { className: "pe" });
			townsBox.dataset.towns = "";
			const refresh = kit.button(tr("refreshTowns"), "refreshTowns", () => {
				renderTowns();
				kit.keepFocus(renderEditor);
			});
			return kit.card({
				id: "towns",
				icon: "🏘",
				title: tr("towns"),
				desc: tr("townsDesc"),
				actions: [refresh]
			}, townsBox);
		}
		function renderTowns() {
			kit.keepFocus(drawTowns);
		}
		function drawTowns() {
			const current = store.get();
			shownTownProfiles = current.townProfiles;
			shownTownQueues = current.townQueues;
			const list = towns();
			shownTowns = townListKey(list);
			if (list.length === 0) {
				townsBox.replaceChildren(el("p", {
					className: "note",
					textContent: tr("townsEmpty")
				}));
				return;
			}
			const s = store.get();
			const profiles = listProfiles(s);
			const profileOf = (id) => s.townProfiles[String(id)];
			if (townFilter.kind === "profile") {
				const wanted = townFilter.id;
				if (!profiles.some((p) => p.id === wanted)) townFilter = { kind: "all" };
			}
			const chips = el("div", { className: "chips" });
			chips.dataset.townFilters = "";
			const addChip = (filter, key, text, count, dot) => {
				const active = filter.kind === townFilter.kind && (filter.kind !== "profile" || townFilter.kind === "profile" && townFilter.id === filter.id);
				const chip = kit.chip(text, {
					count,
					dot,
					active
				});
				chip.dataset.townFilter = key;
				listen(chip, "click", () => {
					townFilter = filter;
					renderTowns();
				}, "ciudades: filtro");
				chips.append(chip);
			};
			addChip({ kind: "all" }, "all", tr("allTowns"), list.length, "#d8a94b");
			profiles.forEach((p, i) => {
				addChip({
					kind: "profile",
					id: p.id
				}, p.id, profileLabel(p, tr), list.filter((town) => profileOf(town.id) === p.id).length, profileColor(i));
			});
			addChip({ kind: "none" }, "none", tr("noProfile"), list.filter((town) => profileOf(town.id) === void 0).length, "#6b5a44");
			const visible = list.filter((town) => {
				const pid = profileOf(town.id);
				if (townFilter.kind === "none") return pid === void 0;
				if (townFilter.kind === "profile") return pid === townFilter.id;
				return true;
			});
			const grid = el("div", { className: "town-grid" });
			for (const { id, name } of visible) {
				const select = el("select");
				select.dataset.townProfile = String(id);
				select.setAttribute("aria-label", `${name}: ${tr("profileTitle")}`);
				const none = el("option", { textContent: tr("noProfile") });
				none.value = "";
				select.append(none);
				for (const p of profiles) {
					const option = el("option", { textContent: profileLabel(p, tr) });
					option.value = p.id;
					select.append(option);
				}
				select.value = profileOf(id) ?? "";
				listen(select, "change", () => {
					const value = select.value;
					store.update((st) => {
						const { [String(id)]: _old, ...rest } = st.townProfiles;
						st.townProfiles = value === "" ? rest : {
							...rest,
							[String(id)]: value
						};
					});
					renderTowns();
					kit.keepFocus(renderEditor);
				}, "perfil de ciudad");
				const town = el("div", { className: "town-card" });
				town.dataset.town = String(id);
				town.append(el("span", {
					className: "avatar",
					textContent: name.trim().charAt(0).toUpperCase()
				}), el("span", {
					className: "town",
					textContent: name,
					title: name
				}), select);
				const queued = s.townQueues[String(id)]?.length ?? 0;
				if (queued > 0) {
					const small = el("small", { textContent: `${tr("townQueue")}: ${queued}` });
					small.dataset.townQueue = String(queued);
					town.append(small);
				}
				grid.append(town);
			}
			const body = [chips];
			if (visible.length === 0) body.push(el("p", {
				className: "empty",
				textContent: "—"
			}));
			else body.push(grid);
			townsBox.replaceChildren(...body);
		}
		function buildProfiles() {
			const editor = createProfileEditor({
				kit,
				tr,
				lang,
				store,
				state: editorState,
				towns,
				data: options.profiles,
				icons,
				onProfilesChanged: renderTowns
			});
			renderEditor = editor.render;
			refreshEditorLive = editor.refreshLive;
			return kit.card({
				id: "profiles",
				icon: "📋",
				title: tr("profileTitle"),
				desc: tr("profilesDesc"),
				actions: [editor.actions]
			}, editor.root);
		}
		function buildTrade() {
			tradeBox = el("div", { className: "farm-box" });
			tradeBox.dataset.trade = "";
			const fields = el("div", { className: "fields" });
			fields.append(kit.slider("tradeDonorFill", tr("tradeDonorFill"), {
				min: 0,
				max: 100,
				step: 5
			}, (s) => Math.round(s.autoTrade.minDonorFillRatio * 100), (s, v) => {
				s.autoTrade.minDonorFillRatio = v / 100;
			}, (v) => `${v} %`), kit.slider("tradeReserve", tr("tradeReserve"), {
				min: 0,
				max: 50
			}, (s) => Math.round(s.autoTrade.reserveRatio * 100), (s, v) => {
				s.autoTrade.reserveRatio = v / 100;
			}, (v) => `${v} %`));
			const more = el("div", { className: "fields" });
			more.append(kit.field(tr("tradeMinSend"), kit.numberInput("tradeMinSend", 0, 1e6, (s) => s.autoTrade.minSendAmount, (s, v) => {
				s.autoTrade.minSendAmount = v;
			})), kit.field(tr("tradeMaxTransfers"), kit.stepper("tradeMaxTransfers", tr("tradeMaxTransfers"), {
				min: 1,
				max: 20
			}, (s) => s.autoTrade.maxTransfersPerCycle, (s, v) => {
				s.autoTrade.maxTransfersPerCycle = v;
			})));
			return kit.card({
				id: "autoTrade",
				icon: "⚖",
				title: tr("autoTrade"),
				desc: tr("autoTradeDesc"),
				actions: [kit.switchOnly("autoTrade", tr("autoTrade"), (s) => s.autoTrade.enabled, (s, v) => {
					s.autoTrade.enabled = v;
				})]
			}, fields, more, el("h4", {
				className: "sub",
				textContent: tr("tradeResults")
			}), tradeBox);
		}
		function renderTrade() {
			renderResults(tradeBox, options.trade?.status() ?? []);
		}
		function buildPool() {
			const OTHER = "other";
			const select = el("select");
			select.dataset.field = "tradePoolTarget";
			const idInput = el("input");
			idInput.type = "number";
			idInput.min = "1";
			idInput.dataset.field = "tradePoolId";
			const idField = kit.field(tr("tradePoolId"), idInput);
			let shownTargets = null;
			const sync = (current) => {
				const { poolTownId: id, poolAllied: allied } = current.autoTrade;
				select.value = allied ? OTHER : id === null ? "" : String(id);
				idField.hidden = !allied;
				if (root.activeElement !== idInput) idInput.value = allied && id !== null ? String(id) : "";
			};
			renderPoolTargets = () => {
				const list = towns();
				const key = townListKey(list);
				if (key === shownTargets) return;
				shownTargets = key;
				const none = el("option", { textContent: tr("tradePoolNone") });
				none.value = "";
				const other = el("option", { textContent: tr("tradePoolOther") });
				other.value = OTHER;
				const items = list.map(({ id, name }) => {
					const option = el("option", { textContent: name });
					option.value = String(id);
					return option;
				});
				select.replaceChildren(none, ...items, other);
				sync(store.get());
			};
			renderPoolTargets();
			syncers.push(sync);
			listen(select, "change", () => {
				const value = select.value;
				store.update((st) => {
					const trade = st.autoTrade;
					if (value === OTHER) {
						if (!trade.poolAllied) trade.poolTownId = null;
						trade.poolAllied = true;
					} else {
						trade.poolTownId = value === "" ? null : Number(value);
						trade.poolAllied = false;
					}
				});
				if (value === OTHER) idInput.focus();
			}, "pool");
			listen(idInput, "change", () => {
				const value = Math.round(Number(idInput.value));
				const id = idInput.value === "" || !Number.isFinite(value) || value < 1 ? null : value;
				store.update((st) => {
					st.autoTrade.poolTownId = id;
					st.autoTrade.poolAllied = true;
				});
			}, "pool");
			const fields = el("div", { className: "fields" });
			fields.append(kit.field(tr("tradePoolTarget"), select), idField);
			return kit.card({
				id: "tradePool",
				icon: "🚨",
				title: tr("tradePool"),
				desc: tr("tradePoolDesc"),
				actions: [kit.switchOnly("tradePool", tr("tradePool"), (st) => st.autoTrade.poolEnabled, (st, v) => {
					st.autoTrade.poolEnabled = v;
				})]
			}, fields);
		}
		function buildVillageTrade() {
			villageTradeBox = el("div", { className: "farm-box" });
			villageTradeBox.dataset.villageTrade = "";
			const fields = el("div", { className: "fields" });
			fields.append(kit.slider("villageMinRatio", tr("villageMinRatio"), {
				min: 25,
				max: 125,
				step: 5
			}, (st) => Math.round(st.villageTrade.minRatio * 100), (st, v) => {
				st.villageTrade.minRatio = v / 100;
			}, (v) => `1:${(v / 100).toFixed(2).replace(".", lang === "es" ? "," : ".")}`), kit.field(tr("villageMinAmount"), kit.numberInput("villageMinAmount", 0, FARM_TRADE_MAX, (st) => st.villageTrade.minAmount, (st, v) => {
				st.villageTrade.minAmount = v;
			})));
			return kit.card({
				id: "villageTrade",
				icon: "⚖",
				title: tr("villageTrade"),
				desc: tr("villageTradeDesc"),
				actions: [kit.switchOnly("villageTrade", tr("villageTrade"), (st) => st.villageTrade.enabled, (st, v) => {
					st.villageTrade.enabled = v;
				})]
			}, fields, el("h4", {
				className: "sub",
				textContent: tr("tradeResults")
			}), villageTradeBox);
		}
		function renderVillageTrade() {
			renderResults(villageTradeBox, options.villageTrade?.status() ?? []);
		}
		function buildVillageExpansion() {
			villageExpansionBox = el("div", { className: "farm-box" });
			villageExpansionBox.dataset.villageExpansion = "";
			const fields = el("div", { className: "fields" });
			fields.append(kit.field(tr("villageMaxLevel"), kit.stepper("villageMaxLevel", tr("villageMaxLevel"), VILLAGE_LEVEL_RANGE, (st) => st.villageExpansion.maxLevel, (st, v) => {
				st.villageExpansion.maxLevel = v;
			})), kit.field(tr("villageReservePoints"), kit.numberInput("villageReservePoints", 0, MAX_RESERVE_POINTS, (st) => st.villageExpansion.reservePoints, (st, v) => {
				st.villageExpansion.reservePoints = v;
			})));
			return kit.card({
				id: "villageExpansion",
				icon: "⛺",
				title: tr("villageExpansion"),
				desc: tr("villageExpansionDesc"),
				actions: [kit.switchOnly("villageExpansion", tr("villageExpansion"), (st) => st.villageExpansion.enabled, (st, v) => {
					st.villageExpansion.enabled = v;
				})]
			}, fields, el("h4", {
				className: "sub",
				textContent: tr("expansionResults")
			}), villageExpansionBox);
		}
		function renderVillageExpansion() {
			renderResults(villageExpansionBox, options.villageExpansion?.status() ?? []);
		}
		function buildBandits() {
			banditsBox = el("div", { className: "farm-box" });
			banditsBox.dataset.bandits = "";
			const select = el("select");
			select.dataset.field = "banditTown";
			select.setAttribute("aria-label", tr("banditTown"));
			let shown = null;
			const syncTown = (s) => {
				const id = s.bandits.townId;
				select.value = id === null ? "" : String(id);
			};
			const renderTowns = () => {
				const list = towns();
				const key = townListKey(list);
				if (key === shown) return;
				shown = key;
				const none = el("option", { textContent: tr("banditTownNone") });
				none.value = "";
				const items = list.map(({ id, name }) => {
					const option = el("option", { textContent: name });
					option.value = String(id);
					return option;
				});
				select.replaceChildren(none, ...items);
				syncTown(store.get());
			};
			renderTowns();
			syncers.push(syncTown);
			townListRenderers.push(renderTowns);
			listen(select, "change", () => {
				const value = select.value;
				store.update((st) => {
					st.bandits.townId = value === "" ? null : Number(value);
				});
			}, "bandidos: ciudad");
			const unitBox = el("div", { className: "town-switches" });
			unitBox.dataset.banditUnits = "";
			const inputs = new Map();
			for (const unit of BANDIT_UNIT_IDS) {
				const input = el("input");
				input.type = "checkbox";
				input.dataset.unit = unit;
				listen(input, "change", () => {
					store.update((st) => {
						const rest = st.bandits.units.filter((u) => u !== unit);
						st.bandits.units = input.checked ? [...rest, unit] : rest;
					});
				}, "bandidos: tropas");
				inputs.set(unit, input);
				const vis = el("span", { className: "switch-vis" });
				vis.append(input, el("span", { className: "track" }));
				const label = el("label", { className: "opt" });
				label.append(el("span", { textContent: unitName(lang, unit) }), vis);
				unitBox.append(label);
			}
			syncers.push((s) => {
				for (const [unit, input] of inputs) input.checked = s.bandits.units.includes(unit);
			});
			return kit.card({
				id: "bandits",
				icon: "🏴",
				title: tr("bandits"),
				desc: tr("banditsDesc"),
				actions: [kit.switchOnly("bandits", tr("bandits"), (st) => st.bandits.enabled, (st, v) => {
					st.bandits.enabled = v;
				})]
			}, kit.field(tr("banditTown"), select), el("h4", {
				className: "sub",
				textContent: tr("banditUnits")
			}), unitBox, el("h4", {
				className: "sub",
				textContent: tr("banditResults")
			}), banditsBox);
		}
		function renderBandits() {
			renderResults(banditsBox, options.bandits?.status() ?? []);
		}
		function buildMissions() {
			missionsBox = el("div", { className: "farm-box" });
			missionsBox.dataset.missions = "";
			return kit.card({
				id: "missions",
				icon: "📜",
				title: tr("missions"),
				desc: tr("missionsDesc"),
				actions: [kit.switchOnly("missions", tr("missions"), (st) => st.missions.enabled, (st, v) => {
					st.missions.enabled = v;
				})]
			}, kit.switchRow("missionBeginner", tr("missionBeginner"), (st) => st.missions.beginner, (st, v) => {
				st.missions.beginner = v;
			}), kit.switchRow("missionIsland", tr("missionIsland"), (st) => st.missions.islandRewards, (st, v) => {
				st.missions.islandRewards = v;
			}), el("h4", {
				className: "sub",
				textContent: tr("missionResults")
			}), missionsBox);
		}
		function renderMissions() {
			renderResults(missionsBox, options.missions?.status() ?? []);
		}
		function buildTimed() {
			const typeSelect = el("select");
			typeSelect.dataset.field = "timedType";
			for (const [value, key] of [["attack", "timedAttack"], ["support", "timedSupport"]]) {
				const option = el("option", { textContent: tr(key) });
				option.value = value;
				typeSelect.append(option);
			}
			const from = el("select");
			from.dataset.field = "timedFrom";
			const target = el("input");
			target.type = "text";
			target.inputMode = "numeric";
			target.dataset.field = "timedTarget";
			const targetList = el("datalist");
			targetList.id = "gh-timed-towns";
			target.setAttribute("list", targetList.id);
			const unitBox = el("div", { className: "town-switches" });
			unitBox.dataset.timedUnits = "";
			const arrival = el("input");
			arrival.type = "datetime-local";
			arrival.step = "1";
			arrival.dataset.field = "timedArrival";
			const tolerance = (field) => {
				const input = el("input");
				input.type = "number";
				input.min = String(TIMED_TOLERANCE_RANGE.min);
				input.max = String(TIMED_TOLERANCE_RANGE.max);
				input.value = "1";
				input.dataset.field = field;
				return input;
			};
			const early = tolerance("timedEarly");
			const late = tolerance("timedLate");
			const bindTolerance = (input, key) => {
				syncers.push((st) => {
					if (root.activeElement !== input) input.value = String(st.timedCommands[key]);
				});
				listen(input, "change", () => {
					const n = Number(input.value);
					if (!Number.isInteger(n) || n < TIMED_TOLERANCE_RANGE.min || n > TIMED_TOLERANCE_RANGE.max) return;
					store.update((st) => {
						st.timedCommands[key] = n;
					});
				}, "cronometrados: tolerancia");
			};
			bindTolerance(early, "defaultEarly");
			bindTolerance(late, "defaultLate");
			const travel = el("input");
			travel.type = "text";
			travel.placeholder = "H:MM:SS";
			travel.dataset.field = "timedTravel";
			const power = el("input");
			power.type = "text";
			power.dataset.field = "timedPower";
			const powerList = el("datalist");
			powerList.id = "gh-timed-powers";
			power.setAttribute("list", powerList.id);
			for (const p of options.spells?.powers() ?? []) {
				const option = el("option", { textContent: p.name ?? p.id });
				option.value = p.id;
				powerList.append(option);
			}
			const error = el("p", { className: "note" });
			error.hidden = true;
			const add = el("button", {
				className: "btn",
				textContent: tr("timedAdd")
			});
			add.type = "button";
			add.dataset.action = "timedAdd";
			const unitInputs = new Map();
			let shownUnits = null;
			const renderUnits = () => {
				const townId = Number(from.value);
				const have = townId > 0 ? options.timed?.units(townId) ?? null : null;
				const key = JSON.stringify([
					townId,
					have,
					lang
				]);
				if (key === shownUnits) return;
				shownUnits = key;
				const typed = new Map([...unitInputs].map(([unit, input]) => [unit, input.value]));
				unitInputs.clear();
				if (!have) {
					unitBox.replaceChildren(el("p", {
						className: "note",
						textContent: tr("timedNoUnits")
					}));
					return;
				}
				const labels = UNIT_IDS.filter((u) => (have[u] ?? 0) > 0).map((unit) => {
					const input = el("input");
					input.type = "number";
					input.min = "0";
					input.max = String(have[unit] ?? 0);
					input.placeholder = String(have[unit] ?? 0);
					input.dataset.unit = unit;
					input.value = typed.get(unit) ?? "";
					unitInputs.set(unit, input);
					const label = el("label", { className: "opt" });
					label.append(el("span", { textContent: unitName(lang, unit) }), input);
					return label;
				});
				unitBox.replaceChildren(...labels.length > 0 ? labels : [el("p", {
					className: "note",
					textContent: tr("timedNoUnits")
				})]);
			};
			let shownTowns = null;
			const renderTowns = () => {
				const list = towns();
				const key = townListKey(list);
				if (key === shownTowns) return;
				shownTowns = key;
				const previous = from.value;
				from.replaceChildren(...list.map(({ id, name }) => {
					const option = el("option", { textContent: name });
					option.value = String(id);
					return option;
				}));
				if (list.some((t) => String(t.id) === previous)) from.value = previous;
				targetList.replaceChildren(...list.map(({ id, name }) => {
					const option = el("option", { textContent: name });
					option.value = String(id);
					return option;
				}));
				renderUnits();
			};
			renderTowns();
			townListRenderers.push(renderTowns);
			listen(from, "change", renderUnits, "cronometrados: origen");
			listen(add, "click", () => {
				const fromId = Number(from.value);
				const targetId = Number(target.value.trim());
				const units = {};
				let unitsOk = true;
				for (const [unit, input] of unitInputs) {
					if (input.value.trim() === "") continue;
					const n = Number(input.value);
					if (!Number.isInteger(n) || n < 0) unitsOk = false;
					else if (n > 0) units[unit] = n;
				}
				const when = arrival.value === "" ? NaN : new Date(arrival.value).getTime();
				const before = Number(early.value);
				const after = Number(late.value);
				const travelText = travel.value.trim();
				const travelS = travelText === "" ? null : parseDuration(travelText);
				const powerId = power.value.trim();
				const inRange = (n) => Number.isInteger(n) && n >= TIMED_TOLERANCE_RANGE.min && n <= TIMED_TOLERANCE_RANGE.max;
				const ok = Number.isInteger(fromId) && fromId > 0 && Number.isInteger(targetId) && targetId > 0 && unitsOk && Object.keys(units).length > 0 && Number.isFinite(when) && inRange(before) && inRange(after) && (travelText === "" || travelS !== null && travelS >= TIMED_TRAVEL_RANGE.min && travelS <= TIMED_TRAVEL_RANGE.max) && (powerId === "" || /^[a-z_]{1,64}$/.test(powerId));
				const full = store.get().timedCommands.items.length >= 50;
				error.hidden = ok && !full;
				error.textContent = full ? tr("timedFull") : tr("timedInvalid");
				if (!ok || full) return;
				store.update((st) => {
					st.timedCommands.items.push({
						id: `tc-${Date.now().toString(36)}-${String(st.timedCommands.items.length)}`,
						enabled: true,
						type: typeSelect.value === "support" ? "support" : "attack",
						fromTownId: fromId,
						targetTownId: targetId,
						units,
						arrivalAt: Math.floor(when / 1e3),
						early: before,
						late: after,
						travelSeconds: travelS,
						powerId: powerId === "" ? null : powerId,
						tuning: false
					});
				});
			}, "cronometrados: programar");
			const box = el("div", { className: "farm-box" });
			box.dataset.timed = "";
			const doneBox = el("div", { className: "farm-box" });
			doneBox.dataset.timedDone = "";
			const townLabel = (names, id) => names.get(id) ?? `#${String(id)}`;
			const typeLabel = (type) => tr(type === "attack" ? "timedAttack" : "timedSupport");
			const renderArchive = (ok, records) => {
				const clear = el("button", {
					className: "mini",
					textContent: tr("timedClear")
				});
				clear.type = "button";
				clear.dataset.action = "timedClear";
				clear.dataset.outcome = ok ? "ok" : "fail";
				clear.disabled = records.length === 0;
				listen(clear, "click", () => {
					store.update((st) => {
						st.timedCommands.done = st.timedCommands.done.filter((r) => r.ok !== ok);
					});
				}, "cronometrados: limpiar");
				const title = el("h4", {
					className: "sub",
					textContent: `${tr(ok ? "timedOk" : "timedFail")} (${String(records.length)}) `
				});
				title.append(clear);
				const list = el("ol", { className: "farm-results" });
				list.dataset.timedOutcome = ok ? "ok" : "fail";
				for (const r of [...records].reverse()) {
					const li = el("li", { className: ok ? "success" : "error" });
					li.append(el("time", { textContent: formatSpellTime(r.at) }), ` ${r.text}`);
					list.append(li);
				}
				const section = el("div");
				section.append(title, records.length > 0 ? list : el("p", {
					className: "note",
					textContent: tr("timedNone")
				}));
				return section;
			};
			renderTimed = () => {
				const cfg = store.get().timedCommands;
				const names = new Map(towns().map((t) => [t.id, t.name]));
				if (cfg.items.length === 0) box.replaceChildren(el("p", {
					className: "note",
					textContent: tr("timedEmpty")
				}));
				else {
					const status = new Map((options.timed?.status() ?? []).map((r) => [r.id, r]));
					const list = el("ol", { className: "farm-results" });
					for (const item of cfg.items) {
						const r = status.get(item.id);
						const li = el("li", { className: r?.level ?? "info" });
						li.dataset.timedId = item.id;
						const what = `${typeLabel(item.type)} ${townLabel(names, item.fromTownId)} → ${townLabel(names, item.targetTownId)}`;
						const toggle = el("input");
						toggle.type = "checkbox";
						toggle.checked = item.enabled;
						toggle.setAttribute("aria-label", what);
						listen(toggle, "change", () => {
							store.update((st) => {
								const it = st.timedCommands.items.find((x) => x.id === item.id);
								if (it) it.enabled = toggle.checked;
							});
						}, "cronometrados: activar");
						const remove = el("button", {
							className: "mini",
							textContent: "✕",
							title: tr("timedRemove")
						});
						remove.type = "button";
						remove.dataset.action = "timedRemove";
						listen(remove, "click", () => {
							store.update((st) => {
								st.timedCommands.items = st.timedCommands.items.filter((x) => x.id !== item.id);
							});
						}, "cronometrados: quitar");
						const troops = Object.entries(item.units).map(([u, n]) => `${unitName(lang, u)} ${String(n)}`).join(", ");
						li.append(toggle, el("time", { textContent: formatSpellTime(item.arrivalAt) }), el("span", {
							className: "town",
							textContent: what
						}), ` · ${troops} · −${String(item.early)}/+${String(item.late)} s${item.powerId === null ? "" : ` · ${item.powerId}`}${r ? ` · ${r.state}` : ""} `, remove);
						list.append(li);
					}
					box.replaceChildren(list);
				}
				doneBox.replaceChildren(renderArchive(true, cfg.done.filter((r) => r.ok)), renderArchive(false, cfg.done.filter((r) => !r.ok)));
				renderUnits();
			};
			syncers.push(() => {
				renderTimed();
			});
			return kit.card({
				id: "timedCommands",
				icon: "⏱",
				title: tr("timedCommands"),
				desc: tr("timedCommandsDesc"),
				actions: [kit.switchOnly("timedCommands", tr("timedCommands"), (st) => st.timedCommands.enabled, (st, v) => {
					st.timedCommands.enabled = v;
				})]
			}, kit.field(tr("timedType"), typeSelect), kit.field(tr("timedFrom"), from), kit.field(tr("timedTarget"), target, targetList), kit.field(tr("timedUnits"), unitBox), kit.field(tr("timedArrival"), arrival), kit.field(tr("timedEarly"), early), kit.field(tr("timedLate"), late), kit.field(tr("timedTravel"), travel), kit.field(tr("timedPower"), power, powerList), kit.row(add), error, el("h4", {
				className: "sub",
				textContent: tr("timedList")
			}), box, doneBox);
		}
		function buildGroupPlan() {
			const profile = el("select");
			profile.dataset.field = "groupProfile";
			const target = el("input");
			target.type = "text";
			target.inputMode = "numeric";
			target.dataset.field = "groupTarget";
			const typeSelect = el("select");
			typeSelect.dataset.field = "groupType";
			const unitsSelect = el("select");
			unitsSelect.dataset.field = "groupUnits";
			const fill = (select, items) => {
				for (const [value, key] of items) {
					const option = el("option", { textContent: tr(key) });
					option.value = value;
					select.append(option);
				}
			};
			fill(typeSelect, [["attack", "timedAttack"], ["support", "timedSupport"]]);
			fill(unitsSelect, [
				["offense", "groupOffense"],
				["defense", "groupDefense"],
				["all", "groupAll"]
			]);
			listen(typeSelect, "change", () => {
				unitsSelect.value = typeSelect.value === "support" ? "defense" : "offense";
			}, "grupo: tipo");
			const arrival = el("input");
			arrival.type = "datetime-local";
			arrival.step = "1";
			arrival.dataset.field = "groupArrival";
			const margin = (field) => {
				const input = el("input");
				input.type = "number";
				input.min = String(TIMED_TOLERANCE_RANGE.min);
				input.max = String(TIMED_TOLERANCE_RANGE.max);
				input.value = "1";
				input.dataset.field = field;
				return input;
			};
			const early = margin("groupEarly");
			const late = margin("groupLate");
			const calc = el("button", {
				className: "btn",
				textContent: tr("groupCalc")
			});
			calc.type = "button";
			calc.dataset.action = "groupCalc";
			const box = el("div", { className: "farm-box" });
			box.dataset.groupPlan = "";
			let shownProfiles = null;
			syncers.push((st) => {
				const list = listProfiles(st);
				const key = JSON.stringify([list.map((p) => [p.id, profileLabel(p, tr)]), lang]);
				if (key === shownProfiles) return;
				shownProfiles = key;
				const previous = profile.value;
				profile.replaceChildren(...list.map((p) => {
					const option = el("option", { textContent: profileLabel(p, tr) });
					option.value = p.id;
					return option;
				}));
				if (list.some((p) => p.id === previous)) profile.value = previous;
			});
			const note = (text) => {
				box.replaceChildren(el("p", {
					className: "note",
					textContent: text
				}));
			};
			const showPlan = (plan, request) => {
				const type = typeSelect.value === "support" ? "support" : "attack";
				const before = Number(early.value);
				const after = Number(late.value);
				const list = el("ol", { className: "farm-results" });
				for (const row of plan.rows) {
					const li = el("li", { className: "info" });
					li.dataset.groupTown = String(row.townId);
					const troops = Object.entries(row.units).map(([u, n]) => `${unitName(lang, u)} ${String(n)}`).join(", ");
					li.append(el("time", { textContent: formatSpellTime(row.sendAt) }), el("span", {
						className: "town",
						textContent: row.name
					}), ` · ${troops} · ${tr("groupTravel")} ${formatDuration(row.travelS)}`);
					list.append(li);
				}
				for (const skip of plan.skips) {
					const li = el("li", { className: "warn" });
					li.append(el("span", {
						className: "town",
						textContent: skip.name
					}), `: ${skip.reason}`);
					list.append(li);
				}
				const children = [];
				if (plan.arrivalAt !== null) children.push(el("p", {
					className: "note",
					textContent: `${tr("groupArrivalAt")} ${formatSpellTime(plan.arrivalAt)}`
				}));
				children.push(list);
				if (plan.rows.length === 0) {
					children.push(el("p", {
						className: "note",
						textContent: tr("groupNothing")
					}));
					box.replaceChildren(...children);
					return;
				}
				const confirm = el("button", {
					className: "btn",
					textContent: `${tr("groupConfirm")} (${String(plan.rows.length)})`
				});
				confirm.type = "button";
				confirm.dataset.action = "groupConfirm";
				listen(confirm, "click", () => {
					const arrivalAt = plan.arrivalAt;
					if (arrivalAt === null) return;
					const room = 50 - store.get().timedCommands.items.length;
					if (plan.rows.length > room) {
						note(tr("timedFull"));
						return;
					}
					store.update((st) => {
						const stamp = Date.now().toString(36);
						plan.rows.forEach((row, i) => {
							st.timedCommands.items.push({
								id: `tc-${stamp}-g${String(i)}`,
								enabled: true,
								type,
								fromTownId: row.townId,
								targetTownId: request.targetTownId,
								units: { ...row.units },
								arrivalAt,
								early: before,
								late: after,
								travelSeconds: null,
								powerId: null,
								tuning: false
							});
						});
					});
					note(`${tr("groupAdded")} (${String(plan.rows.length)})`);
				}, "grupo: confirmar");
				children.push(kit.row(confirm));
				box.replaceChildren(...children);
			};
			listen(calc, "click", () => {
				const targetId = Number(target.value.trim());
				const when = arrival.value === "" ? null : new Date(arrival.value).getTime();
				const inRange = (n) => Number.isInteger(n) && n >= TIMED_TOLERANCE_RANGE.min && n <= TIMED_TOLERANCE_RANGE.max;
				if (!(profile.value !== "" && Number.isInteger(targetId) && targetId > 0 && (when === null || Number.isFinite(when)) && inRange(Number(early.value)) && inRange(Number(late.value))) || !options.planner) {
					note(tr("groupInvalid"));
					return;
				}
				const mode = unitsSelect.value;
				const request = {
					profileId: profile.value,
					targetTownId: targetId,
					units: mode === "defense" ? "defense" : mode === "all" ? "all" : "offense",
					arrivalAt: when === null ? null : Math.floor(when / 1e3)
				};
				calc.disabled = true;
				note(tr("groupCalculating"));
				options.planner.plan(request).then((plan) => {
					showPlan(plan, request);
				}).catch((err) => {
					note(`${tr("groupError")}: ${err instanceof Error ? err.message : String(err)}`);
				}).finally(() => {
					calc.disabled = false;
				});
			}, "grupo: calcular");
			return kit.card({
				id: "groupPlan",
				icon: "🗺",
				title: tr("groupPlan"),
				desc: tr("groupPlanDesc")
			}, kit.field(tr("groupProfile"), profile), kit.field(tr("timedTarget"), target), kit.field(tr("timedType"), typeSelect), kit.field(tr("timedUnits"), unitsSelect), kit.field(tr("groupArrival"), arrival), kit.field(tr("timedEarly"), early), kit.field(tr("timedLate"), late), kit.row(calc), box);
		}
		function buildSpells() {
			const target = el("input");
			target.type = "text";
			target.inputMode = "numeric";
			target.dataset.field = "spellTarget";
			const townList = el("datalist");
			townList.id = "gh-spell-towns";
			target.setAttribute("list", townList.id);
			const power = el("input");
			power.type = "text";
			power.dataset.field = "spellPower";
			const powerList = el("datalist");
			powerList.id = "gh-spell-powers";
			power.setAttribute("list", powerList.id);
			for (const p of options.spells?.powers() ?? []) {
				const option = el("option", { textContent: p.name ?? p.id });
				option.value = p.id;
				powerList.append(option);
			}
			const at = el("input");
			at.type = "datetime-local";
			at.step = "1";
			at.dataset.field = "spellAt";
			const repeat = el("input");
			repeat.type = "number";
			repeat.min = String(SPELL_REPEAT_RANGE.min);
			repeat.max = String(SPELL_REPEAT_RANGE.max);
			repeat.value = "0";
			repeat.dataset.field = "spellRepeat";
			const error = el("p", { className: "note" });
			error.hidden = true;
			const add = el("button", {
				className: "btn",
				textContent: tr("spellAdd")
			});
			add.type = "button";
			add.dataset.action = "spellAdd";
			let shownTowns = null;
			const renderTowns = () => {
				const list = towns();
				const key = townListKey(list);
				if (key === shownTowns) return;
				shownTowns = key;
				townList.replaceChildren(...list.map(({ id, name }) => {
					const option = el("option", { textContent: name });
					option.value = String(id);
					return option;
				}));
			};
			renderTowns();
			townListRenderers.push(renderTowns);
			listen(add, "click", () => {
				const targetId = Number(target.value.trim());
				const powerId = power.value.trim();
				const when = at.value === "" ? NaN : new Date(at.value).getTime();
				const every = Number(repeat.value);
				const ok = Number.isInteger(targetId) && targetId > 0 && /^[a-z_]{1,64}$/.test(powerId) && Number.isFinite(when) && Number.isInteger(every) && every >= SPELL_REPEAT_RANGE.min && every <= SPELL_REPEAT_RANGE.max;
				const full = store.get().scheduledSpells.items.length >= 50;
				error.hidden = ok && !full;
				error.textContent = full ? tr("spellFull") : tr("spellInvalid");
				if (!ok || full) return;
				store.update((st) => {
					st.scheduledSpells.items.push({
						id: `sp-${Date.now().toString(36)}-${String(st.scheduledSpells.items.length)}`,
						enabled: true,
						targetTownId: targetId,
						powerId,
						at: Math.floor(when / 1e3),
						repeatMinutes: every
					});
				});
			}, "hechizos programados: añadir");
			const box = el("div", { className: "farm-box" });
			box.dataset.spells = "";
			renderSpells = () => {
				const items = store.get().scheduledSpells.items;
				if (items.length === 0) {
					box.replaceChildren(el("p", {
						className: "note",
						textContent: tr("spellEmpty")
					}));
					return;
				}
				const status = new Map((options.spells?.status() ?? []).map((r) => [r.id, r]));
				const names = new Map(towns().map((t) => [t.id, t.name]));
				const list = el("ol", { className: "farm-results" });
				for (const item of items) {
					const r = status.get(item.id);
					const li = el("li", { className: r?.level ?? "info" });
					li.dataset.spell = item.id;
					const next = r?.next ?? item.at;
					const target = names.get(item.targetTownId) ?? `#${String(item.targetTownId)}`;
					const every = item.repeatMinutes > 0 ? ` · ${tr("spellEvery")} ${String(item.repeatMinutes)} min` : "";
					const toggle = el("input");
					toggle.type = "checkbox";
					toggle.checked = item.enabled;
					toggle.setAttribute("aria-label", `${item.powerId} → ${target}`);
					listen(toggle, "change", () => {
						store.update((st) => {
							const it = st.scheduledSpells.items.find((x) => x.id === item.id);
							if (it) it.enabled = toggle.checked;
						});
					}, "hechizos programados: activar");
					const remove = el("button", {
						className: "mini",
						textContent: "✕",
						title: tr("spellRemove")
					});
					remove.type = "button";
					remove.dataset.action = "spellRemove";
					listen(remove, "click", () => {
						store.update((st) => {
							st.scheduledSpells.items = st.scheduledSpells.items.filter((x) => x.id !== item.id);
						});
					}, "hechizos programados: quitar");
					li.append(toggle, el("time", { textContent: formatSpellTime(next) }), el("span", {
						className: "town",
						textContent: target
					}), `: ${item.powerId}${every}${r ? ` · ${r.text}` : ""} `, remove);
					list.append(li);
				}
				box.replaceChildren(list);
			};
			syncers.push(() => {
				renderSpells();
			});
			return kit.card({
				id: "scheduledSpells",
				icon: "✨",
				title: tr("scheduledSpells"),
				desc: tr("scheduledSpellsDesc"),
				actions: [kit.switchOnly("scheduledSpells", tr("scheduledSpells"), (st) => st.scheduledSpells.enabled, (st, v) => {
					st.scheduledSpells.enabled = v;
				})]
			}, kit.field(tr("spellTarget"), target, townList), kit.field(tr("spellPower"), power, powerList), kit.field(tr("spellAt"), at), kit.field(tr("spellRepeat"), repeat), kit.row(add), error, el("h4", {
				className: "sub",
				textContent: tr("spellList")
			}), box);
		}
		function townSwitches(data, logLabel, isOn, setOn) {
			const box = el("div", { className: "town-switches" });
			box.dataset[data] = "";
			let shown = null;
			const inputs = new Map();
			const sync = (s) => {
				for (const [id, input] of inputs) input.checked = isOn(s, id);
			};
			const render = () => {
				const list = towns();
				const key = townListKey(list);
				if (key === shown) return;
				shown = key;
				inputs.clear();
				const rows = list.map(({ id, name }) => {
					const input = el("input");
					input.type = "checkbox";
					input.dataset.town = String(id);
					listen(input, "change", () => {
						store.update((st) => {
							setOn(st, id, input.checked);
						});
					}, logLabel);
					inputs.set(id, input);
					const vis = el("span", { className: "switch-vis" });
					vis.append(input, el("span", { className: "track" }));
					const label = el("label", { className: "opt" });
					label.append(el("span", { textContent: name }), vis);
					return label;
				});
				box.replaceChildren(...rows.length > 0 ? rows : [el("p", {
					className: "note",
					textContent: tr("townsEmpty")
				})]);
				sync(store.get());
			};
			render();
			syncers.push(sync);
			townListRenderers.push(render);
			return box;
		}
		function buildHide() {
			hideBox = el("div", { className: "farm-box" });
			hideBox.dataset.hide = "";
			const townBox = townSwitches("hideTowns", "cueva: ciudades", (st, id) => !st.hide.excludedTownIds.includes(id), (st, id, on) => {
				const rest = st.hide.excludedTownIds.filter((t) => t !== id);
				st.hide.excludedTownIds = on ? rest : [...rest, id];
			});
			return kit.card({
				id: "hide",
				icon: "🪙",
				title: tr("hide"),
				desc: tr("hideDesc"),
				actions: [kit.switchOnly("hide", tr("hide"), (st) => st.hide.enabled, (st, v) => {
					st.hide.enabled = v;
				})]
			}, kit.field(tr("hideAmount"), kit.numberInput("hideAmount", HIDE_AMOUNT_RANGE.min, HIDE_AMOUNT_RANGE.max, (st) => st.hide.amount, (st, v) => {
				st.hide.amount = v;
			})), el("h4", {
				className: "sub",
				textContent: tr("hideTowns")
			}), townBox, el("h4", {
				className: "sub",
				textContent: tr("hideResults")
			}), hideBox);
		}
		function renderHide() {
			renderResults(hideBox, options.hide?.status() ?? []);
		}
		function buildHeroes() {
			heroesBox = el("div", { className: "farm-box" });
			heroesBox.dataset.heroes = "";
			return kit.card({
				id: "heroes",
				icon: "🦸",
				title: tr("tileHeroes"),
				desc: tr("heroesDesc"),
				actions: [kit.switchOnly("heroDispatchCard", tr("tileHeroes"), (st) => st.masters.heroDispatch, (st, v) => {
					st.masters.heroDispatch = v;
				})]
			}, el("h4", {
				className: "sub",
				textContent: tr("heroesResults")
			}), heroesBox);
		}
		function renderHeroes() {
			renderResults(heroesBox, options.heroes?.status() ?? []);
		}
		function buildFestivals() {
			festivalsBox = el("div", { className: "farm-box" });
			festivalsBox.dataset.festivals = "";
			const townBox = townSwitches("festivalTowns", "festivales: ciudades", (st, id) => st.festivals.townIds.includes(id), (st, id, on) => {
				const rest = st.festivals.townIds.filter((t) => t !== id);
				st.festivals.townIds = on ? [...rest, id] : rest;
			});
			const allOrNone = (action, text, ids) => {
				const b = el("button", {
					className: "btn",
					textContent: text
				});
				b.type = "button";
				b.dataset.action = action;
				listen(b, "click", () => {
					store.update((st) => {
						st.festivals.townIds = ids();
					});
				}, "festivales: ciudades");
				return b;
			};
			const bulk = el("div", { className: "row" });
			bulk.append(allOrNone("festivalTownsAll", tr("festivalTownsAll"), () => towns().map((t) => t.id)), allOrNone("festivalTownsNone", tr("festivalTownsNone"), () => []));
			return kit.card({
				id: "festivals",
				icon: "🎉",
				title: tr("festivals"),
				desc: tr("festivalsDesc"),
				actions: [kit.switchOnly("festivals", tr("festivals"), (st) => st.festivals.enabled, (st, v) => {
					st.festivals.enabled = v;
				})]
			}, kit.switchRow("festivalTriumph", tr("festivalTriumph"), (st) => st.festivals.triumph, (st, v) => {
				st.festivals.triumph = v;
			}), kit.field(tr("festivalTriumphMin"), kit.numberInput("festivalTriumphMin", TRIUMPH_POINTS_RANGE.min, TRIUMPH_POINTS_RANGE.max, (st) => st.festivals.triumphMinPoints, (st, v) => {
				st.festivals.triumphMinPoints = v;
			})), kit.switchRow("festivalTheater", tr("festivalTheater"), (st) => st.festivals.theater, (st, v) => {
				st.festivals.theater = v;
			}), kit.switchRow("festivalParty", tr("festivalParty"), (st) => st.festivals.party, (st, v) => {
				st.festivals.party = v;
			}), el("p", {
				className: "note",
				textContent: tr("festivalOlympic")
			}), el("h4", {
				className: "sub",
				textContent: tr("festivalTowns")
			}), bulk, townBox, el("h4", {
				className: "sub",
				textContent: tr("festivalResults")
			}), festivalsBox);
		}
		function renderFestivals() {
			renderResults(festivalsBox, options.festivals?.status() ?? []);
		}
		function buildDefense() {
			defenseAttacksBox = el("div", { className: "farm-box" });
			defenseAttacksBox.dataset.defenseAttacks = "";
			defenseBox = el("div", { className: "farm-box" });
			defenseBox.dataset.defense = "";
			const townBox = townSwitches("militiaTowns", "defensa: ciudades", (st, id) => st.defense.militiaTownIds.includes(id), (st, id, on) => {
				const rest = st.defense.militiaTownIds.filter((t) => t !== id);
				st.defense.militiaTownIds = on ? [...rest, id] : rest;
			});
			const allOrNone = (action, text, ids) => {
				const b = el("button", {
					className: "btn",
					textContent: text
				});
				b.type = "button";
				b.dataset.action = action;
				listen(b, "click", () => {
					store.update((st) => {
						st.defense.militiaTownIds = ids();
					});
				}, "defensa: ciudades");
				return b;
			};
			const bulk = el("div", { className: "row" });
			bulk.append(allOrNone("militiaTownsAll", tr("festivalTownsAll"), () => towns().map((t) => t.id)), allOrNone("militiaTownsNone", tr("festivalTownsNone"), () => []));
			const names = (field, key) => {
				const input = el("input");
				input.type = "text";
				input.dataset.field = field;
				syncers.push((st) => {
					if (root.activeElement !== input) input.value = st.defense[key].join(", ");
				});
				listen(input, "change", () => {
					const list = cleanNames(input.value.split(","));
					store.update((st) => {
						st.defense[key] = list;
					});
					input.value = list.join(", ");
				}, "defensa: ignorados");
				return input;
			};
			return kit.card({
				id: "defense",
				icon: "🛡",
				title: tr("defense"),
				desc: tr("defenseDesc"),
				actions: [kit.switchOnly("defense", tr("defense"), (st) => st.defense.enabled, (st, v) => {
					st.defense.enabled = v;
				})]
			}, el("h4", {
				className: "sub",
				textContent: tr("defenseAttacks")
			}), defenseAttacksBox, kit.field(tr("defenseMilitiaSeconds"), kit.numberInput("militiaSeconds", MILITIA_SECONDS_RANGE.min, MILITIA_SECONDS_RANGE.max, (st) => st.defense.militiaSeconds, (st, v) => {
				st.defense.militiaSeconds = v;
			})), el("h4", {
				className: "sub",
				textContent: tr("defenseMilitiaTowns")
			}), bulk, townBox, el("h4", {
				className: "sub",
				textContent: tr("defenseIgnore")
			}), kit.field(tr("defenseIgnorePlayers"), names("ignorePlayers", "ignorePlayers")), kit.field(tr("defenseIgnoreAlliances"), names("ignoreAlliances", "ignoreAlliances")), kit.switchRow("ignoreOwnAlliance", tr("defenseIgnoreOwn"), (st) => st.defense.ignoreOwnAlliance, (st, v) => {
				st.defense.ignoreOwnAlliance = v;
			}), el("h4", {
				className: "sub",
				textContent: tr("defenseDodge")
			}), ...buildDodge(), el("h4", {
				className: "sub",
				textContent: tr("defenseSpell")
			}), ...buildAttackSpell(), el("h4", {
				className: "sub",
				textContent: tr("defenseResults")
			}), defenseBox);
		}
		function buildAttackSpell() {
			const power = el("input");
			power.type = "text";
			power.dataset.field = "defenseSpellPower";
			const powerList = el("datalist");
			powerList.id = "gh-defense-powers";
			power.setAttribute("list", powerList.id);
			for (const p of options.spells?.powers() ?? []) {
				const option = el("option", { textContent: p.name ?? p.id });
				option.value = p.id;
				powerList.append(option);
			}
			syncers.push((st) => {
				if (root.activeElement !== power) power.value = st.defense.spellPowerId ?? "";
			});
			listen(power, "change", () => {
				const value = power.value.trim();
				if (value !== "" && !/^[a-z_]{1,64}$/.test(value)) {
					power.value = store.get().defense.spellPowerId ?? "";
					return;
				}
				store.update((st) => {
					st.defense.spellPowerId = value === "" ? null : value;
				});
			}, "defensa: hechizo");
			const when = choice("defenseSpellWhen", ["midway", "end"], (v) => tr(`spellWhen_${v}`), (st) => st.defense.spellWhen, (st, v) => {
				st.defense.spellWhen = v;
			}, "defensa: hechizo");
			const secondsField = kit.field(tr("defenseSpellSeconds"), kit.numberInput("defenseSpellSeconds", ATTACK_SPELL_SECONDS_RANGE.min, ATTACK_SPELL_SECONDS_RANGE.max, (st) => st.defense.spellSeconds, (st, v) => {
				st.defense.spellSeconds = v;
			}));
			syncers.push((st) => {
				secondsField.hidden = st.defense.spellWhen !== "end";
			});
			const townBox = townSwitches("spellTowns", "defensa: hechizo", (st, id) => st.defense.spellTownIds.includes(id), (st, id, on) => {
				const rest = st.defense.spellTownIds.filter((t) => t !== id);
				st.defense.spellTownIds = on ? [...rest, id] : rest;
			});
			const bulk = el("div", { className: "row" });
			for (const [action, text, ids] of [[
				"spellTownsAll",
				tr("festivalTownsAll"),
				() => towns().map((t) => t.id)
			], [
				"spellTownsNone",
				tr("festivalTownsNone"),
				() => []
			]]) {
				const b = el("button", {
					className: "btn",
					textContent: text
				});
				b.type = "button";
				b.dataset.action = action;
				listen(b, "click", () => {
					store.update((st) => {
						st.defense.spellTownIds = ids();
					});
				}, "defensa: hechizo");
				bulk.append(b);
			}
			return [
				el("p", {
					className: "note",
					textContent: tr("defenseSpellNote")
				}),
				kit.switchRow("defenseSpell", tr("defenseSpellOn"), (st) => st.defense.spellEnabled, (st, v) => {
					st.defense.spellEnabled = v;
				}),
				kit.field(tr("defenseSpellPower"), power, powerList),
				kit.field(tr("defenseSpellWhen"), when),
				secondsField,
				el("h4", {
					className: "sub",
					textContent: tr("defenseSpellTowns")
				}),
				bulk,
				townBox
			];
		}
		function choice(field, values, label, get, set, logLabel) {
			const select = el("select");
			select.dataset.field = field;
			for (const value of values) {
				const option = el("option", { textContent: label(value) });
				option.value = value;
				select.append(option);
			}
			syncers.push((st) => {
				select.value = get(st);
			});
			listen(select, "change", () => {
				const value = values.find((v) => v === select.value);
				if (value === void 0) return;
				store.update((st) => {
					set(st, value);
				});
			}, logLabel);
			return select;
		}
		function buildDodge() {
			let townId = null;
			const first = syncers.length;
			let last = first;
			const resync = () => {
				const st = store.get();
				for (const sync of syncers.slice(first, last)) sync(st);
			};
			const current = (st) => st.defense.dodgeTowns.find((t) => t.townId === townId) ?? createDodgeTown(townId ?? 0);
			const edit = (st, change) => {
				if (townId === null) return;
				let entry = st.defense.dodgeTowns.find((t) => t.townId === townId);
				if (!entry) {
					entry = createDodgeTown(townId);
					st.defense.dodgeTowns.push(entry);
				}
				change(entry);
			};
			const mixed = choice("dodgeMixed", [
				"offense",
				"defense",
				"both"
			], (v) => tr(`dodgeMixed_${v}`), (st) => st.defense.mixedUnits, (st, v) => {
				st.defense.mixedUnits = v;
			}, "defensa: esquivar");
			const townSelect = el("select");
			townSelect.dataset.field = "dodgeTown";
			let shownTowns = null;
			const renderTownSelect = () => {
				const list = towns();
				const key = townListKey(list);
				if (key === shownTowns) return;
				shownTowns = key;
				townSelect.replaceChildren(...list.map(({ id, name }) => {
					const option = el("option", { textContent: name });
					option.value = String(id);
					return option;
				}));
				if (townId === null || !list.some((t) => t.id === townId)) townId = list[0]?.id ?? null;
				townSelect.value = townId === null ? "" : String(townId);
				resync();
			};
			listen(townSelect, "change", () => {
				townId = townSelect.value === "" ? null : Number(townSelect.value);
				resync();
			}, "defensa: esquivar");
			const toggle = (id, key) => kit.switchRow(id, tr(id), (st) => current(st)[key], (st, v) => {
				edit(st, (e) => {
					e[key] = v;
				});
			});
			const seconds = (id, range, key) => kit.numberInput(id, range.min, range.max, (st) => current(st)[key], (st, v) => {
				edit(st, (e) => {
					e[key] = v;
				});
			});
			const units = choice("dodgeUnits", [
				"offense",
				"defense",
				"all"
			], (v) => tr(`dodgeUnits_${v}`), (st) => current(st).units, (st, v) => {
				edit(st, (e) => {
					e.units = v;
				});
			}, "defensa: esquivar");
			const destination = choice("dodgeDestination", [
				"nearest",
				"random",
				"town"
			], (v) => tr(`dodgeDest_${v}`), (st) => current(st).destination, (st, v) => {
				edit(st, (e) => {
					e.destination = v;
				});
			}, "defensa: esquivar");
			const destId = el("input");
			destId.type = "number";
			destId.min = "1";
			destId.dataset.field = "dodgeDestinationId";
			const destField = kit.field(tr("dodgeDestinationId"), destId);
			syncers.push((st) => {
				const entry = current(st);
				destField.hidden = entry.destination !== "town";
				if (root.activeElement !== destId) destId.value = entry.destinationTownId === null ? "" : String(entry.destinationTownId);
			});
			listen(destId, "change", () => {
				const value = Math.round(Number(destId.value));
				const id = destId.value === "" || !Number.isFinite(value) || value < 1 ? null : value;
				store.update((st) => {
					edit(st, (e) => {
						e.destinationTownId = id;
					});
				});
			}, "defensa: esquivar");
			const returnMode = choice("dodgeReturn", [
				"impact",
				"beforeColony",
				"afterColony"
			], (v) => tr(`dodgeReturn_${v}`), (st) => current(st).returnMode, (st, v) => {
				edit(st, (e) => {
					e.returnMode = v;
				});
			}, "defensa: esquivar");
			const copy = el("button", {
				className: "btn",
				textContent: tr("dodgeCopyAll")
			});
			copy.type = "button";
			copy.dataset.action = "dodgeCopyAll";
			listen(copy, "click", () => {
				if (townId === null) return;
				store.update((st) => {
					const source = current(st);
					st.defense.dodgeTowns = towns().map(({ id }) => ({
						...source,
						townId: id
					}));
				});
			}, "defensa: esquivar");
			const onList = el("p", { className: "note" });
			onList.dataset.dodgeTowns = "";
			syncers.push((st) => {
				const names = towns().filter(({ id }) => st.defense.dodgeTowns.some((t) => t.townId === id && t.enabled)).map((t) => t.name);
				onList.textContent = names.length === 0 ? tr("dodgeNone") : `${tr("dodgeOn")}: ${names.join(", ")}`;
			});
			const body = [
				el("p", {
					className: "note",
					textContent: tr("defenseDodgeNote")
				}),
				kit.field(tr("dodgeMixed"), mixed),
				onList,
				kit.field(tr("dodgeTown"), townSelect),
				toggle("dodgeEnabled", "enabled"),
				toggle("dodgeLand", "land"),
				toggle("dodgeFleet", "fleet"),
				toggle("dodgeSeparate", "separate"),
				kit.field(tr("dodgeUnits"), units),
				kit.field(tr("dodgeBefore"), seconds("dodgeBefore", DODGE_BEFORE_RANGE, "secondsBefore")),
				kit.field(tr("dodgeDestination"), destination),
				destField,
				kit.field(tr("dodgeReturn"), returnMode),
				kit.field(tr("dodgeOffset"), seconds("dodgeOffset", DODGE_OFFSET_RANGE, "returnOffset")),
				toggle("dodgeBacksnipe", "backsnipe"),
				kit.field(tr("dodgeBacksnipeOffset"), seconds("dodgeBacksnipeOffset", BACKSNIPE_OFFSET_RANGE, "backsnipeOffset")),
				kit.row(copy)
			];
			last = syncers.length;
			renderTownSelect();
			townListRenderers.push(renderTownSelect);
			return body;
		}
		function renderDefense() {
			const attacks = options.defense?.attacks() ?? [];
			if (attacks.length === 0) defenseAttacksBox.replaceChildren(el("p", {
				className: "note",
				textContent: tr("defenseNoAttacks")
			}));
			else {
				const list = el("ol", { className: "farm-results" });
				for (const a of attacks) {
					const li = el("li", { className: a.ignored === null ? "warn" : "info" });
					li.dataset.attack = a.key;
					let who;
					if (!a.attacker) who = a.originTownId === null ? tr("defenseUnknown") : `#${String(a.originTownId)}`;
					else if (a.attacker.playerId === null) who = tr("defenseNoOwner");
					else {
						who = a.attacker.playerName ?? `#${String(a.attacker.playerId)}`;
						if (a.attacker.allianceName !== null) who += ` (${a.attacker.allianceName})`;
					}
					let text = ` ← ${who}`;
					if (a.colonyShip) text += ` · ${tr("defenseColony")}`;
					if (a.ignored !== null) text += ` · ${tr("defenseIgnored")}: ${a.ignored}`;
					li.append(el("time", { textContent: clockTime(a.arrivalAt) }), el("span", {
						className: "town",
						textContent: a.targetName
					}), text);
					list.append(li);
				}
				defenseAttacksBox.replaceChildren(list);
			}
			renderResults(defenseBox, options.defense?.status() ?? []);
		}
		function buildFarm() {
			const seg = el("div", { className: "seg" });
			seg.dataset.field = "farmInterval";
			const segButtons = FARM_INTERVALS.map((seconds) => {
				const button = el("button", { textContent: tr(`farm_${seconds}`) });
				button.type = "button";
				button.dataset.interval = String(seconds);
				listen(button, "click", () => {
					store.update((s) => {
						s.farmVillages.intervalSeconds = seconds;
					});
				}, "aldeas");
				return button;
			});
			seg.append(...segButtons);
			syncers.push((s) => {
				for (const button of segButtons) {
					const on = button.dataset.interval === String(s.farmVillages.intervalSeconds);
					button.classList.toggle("active", on);
					button.setAttribute("aria-pressed", String(on));
				}
			});
			const townsInput = el("input");
			townsInput.type = "text";
			townsInput.dataset.field = "farmTowns";
			listen(townsInput, "change", () => {
				const ids = townsInput.value.split(/[\s,;]+/).filter((part) => part !== "").map(Number);
				if (ids.some((id) => !Number.isInteger(id) || id <= 0)) {
					townsInput.value = formatTownIds(store.get().farmVillages.townIds);
					return;
				}
				store.update((s) => {
					s.farmVillages.townIds = ids.length === 0 ? "all" : ids;
				});
			}, "aldeas: ciudades");
			syncers.push((s) => {
				if (root.activeElement !== townsInput) townsInput.value = formatTownIds(s.farmVillages.townIds);
			});
			farmBox = el("div", { className: "farm-box" });
			farmBox.dataset.farm = "";
			farmBox.hidden = true;
			return kit.card({
				id: "farm",
				icon: "🌾",
				title: tr("farmVillages"),
				desc: tr("farmDesc"),
				actions: [kit.switchOnly("farmVillages", tr("farmVillages"), (s) => s.farmVillages.enabled, (s, v) => {
					s.farmVillages.enabled = v;
				})]
			}, kit.field(tr("farmInterval"), seg), farmBox, kit.field(tr("farmOptions"), kit.switchRow("collectLongest", tr("collectLongest"), (s) => s.farmVillages.collectLongestBeforeRest, (s, v) => {
				s.farmVillages.collectLongestBeforeRest = v;
			}), kit.row(el("span", { textContent: tr("farmMaxClaims") }), kit.numberInput("farmMaxClaims", 1, 200, (s) => s.farmVillages.maxClaimsPerCycle, (s, v) => {
				s.farmVillages.maxClaimsPerCycle = v;
			}, tr("farmMaxClaims")))), kit.field(tr("farmTowns"), townsInput));
		}
		function buildRest() {
			const bar = el("div", { className: "hours" });
			bar.dataset.hours = "";
			const cells = Array.from({ length: 24 }, (_, h) => {
				const cell = el("div", { title: `${hourLabel(h)}–${hourLabel((h + 1) % 24)}` });
				cell.dataset.hour = String(h);
				if (h % 6 === 0) cell.textContent = String(h);
				return cell;
			});
			bar.append(...cells);
			syncers.push((s) => {
				bar.classList.toggle("disabled", !s.rest.enabled);
				cells.forEach((cell, h) => {
					cell.classList.toggle("on", isRestTime({
						...s.rest,
						enabled: true
					}, new Date(2e3, 0, 1, h)));
				});
			});
			const hours = el("div", { className: "fields" });
			hours.append(kit.field(tr("restFrom"), hourSelect("restStart", (s) => s.rest.startHour, (s, v) => {
				s.rest.startHour = v;
			})), kit.field(tr("restTo"), hourSelect("restEnd", (s) => s.rest.endHour, (s, v) => {
				s.rest.endHour = v;
			})));
			return kit.card({
				id: "rest",
				icon: "🌙",
				title: tr("rest"),
				desc: tr("restNote"),
				actions: [kit.switchOnly("rest", tr("rest"), (s) => s.rest.enabled, (s, v) => {
					s.rest.enabled = v;
				})]
			}, hours, bar);
		}
		function buildFreeFinish() {
			return kit.card({
				id: "freeFinish",
				icon: "⏱",
				title: tr("freeFinish"),
				desc: tr("freeFinishDesc"),
				actions: [kit.switchOnly("freeFinish", tr("freeFinish"), (s) => s.freeFinish, (s, v) => {
					s.freeFinish = v;
				})]
			});
		}
		function buildSoon(spec) {
			const list = el("ul");
			for (const key of spec.soon?.items ?? []) list.append(el("li", { textContent: tr(key) }));
			return kit.card({
				id: spec.id,
				icon: spec.icon,
				title: `${tr(spec.key)} · ${tr("soon")}`,
				desc: tr("soonDesc"),
				className: "soon-card"
			}, list, el("p", {
				className: "note",
				textContent: spec.soon ? tr(spec.soon.phase) : ""
			}));
		}
		function buildBuild() {
			buildBox = el("div", { className: "farm-box" });
			buildBox.dataset.build = "";
			return kit.card({
				id: "build",
				icon: "🏗",
				title: tr("build"),
				desc: tr("buildDesc")
			}, buildBox);
		}
		function renderResults(box, results) {
			if (results.length === 0) {
				box.replaceChildren(el("p", {
					className: "note",
					textContent: tr("researchEmpty")
				}));
				return;
			}
			const list = el("ol", { className: "farm-results" });
			for (const r of results) {
				const li = el("li", { className: r.level });
				li.append(el("time", { textContent: formatLogTime(r.at) }), el("span", {
					className: "town",
					textContent: r.name
				}), `: ${r.text}`);
				list.append(li);
			}
			box.replaceChildren(list);
		}
		function renderBuild() {
			renderResults(buildBox, options.build?.status() ?? []);
		}
		function buildResearch() {
			researchBox = el("div", { className: "farm-box" });
			researchBox.dataset.research = "";
			return kit.card({
				id: "research",
				icon: "📜",
				title: tr("research"),
				desc: tr("researchDesc")
			}, researchBox);
		}
		function renderResearch() {
			renderResults(researchBox, options.research?.status() ?? []);
		}
		function buildRecruit() {
			recruitBox = el("div", { className: "farm-box" });
			recruitBox.dataset.recruit = "";
			return kit.card({
				id: "recruit",
				icon: "⚔",
				title: tr("recruit"),
				desc: tr("recruitDesc")
			}, recruitBox);
		}
		function renderRecruit() {
			renderResults(recruitBox, options.recruit?.status() ?? []);
		}
		function buildLog() {
			tabButtons = new Map();
			const tabs = el("div", { className: "tabs" });
			for (const tab of LOG_TABS) {
				const button = el("button", { textContent: tr(tabKey(tab)) });
				button.type = "button";
				button.dataset.tab = tab;
				listen(button, "click", () => {
					activeTab = tab;
					renderLogs(store.get());
				}, "pestaña");
				tabButtons.set(tab, button);
				tabs.append(button);
			}
			tabs.append(el("span", { className: "spacer" }), kit.button(tr("clear"), "clear", () => {
				options.onClearLog(activeTab);
			}, { className: "btn danger" }));
			logList = el("ol");
			return kit.card({
				id: "log",
				icon: "📜",
				title: tr("log"),
				desc: tr("logDesc")
			}, tabs, logList);
		}
		function buildActivity() {
			const cols = el("div", { className: "cols" });
			const left = el("div");
			const right = el("div");
			left.append(buildLog());
			right.append(buildBuild(), buildResearch(), buildRecruit());
			cols.append(left, right);
			return [cols];
		}
		function build() {
			syncers.length = 0;
			townListRenderers.length = 0;
			viewParts = new Map();
			const header = buildHeader();
			const views = {
				profiles: () => [
					buildAutomation(),
					buildTowns(),
					buildProfiles()
				],
				trade: () => [
					buildTrade(),
					buildPool(),
					buildMarketCard({
						kit,
						el,
						tr,
						lang,
						store,
						syncers,
						data: options.market
					})
				],
				island: () => [
					buildFarm(),
					buildVillageTrade(),
					buildVillageExpansion(),
					buildBandits(),
					buildRest(),
					buildFreeFinish()
				],
				culture: () => [
					buildMissions(),
					buildFestivals(),
					buildHide(),
					buildHeroes()
				],
				combat: () => [
					buildTimed(),
					buildGroupPlan(),
					buildDefense(),
					buildSpells()
				],
				cityFarms: () => {
					const view = buildCityFarmCards({
						kit,
						el,
						listen,
						tr,
						lang,
						store,
						root,
						syncers,
						townListRenderers,
						towns,
						data: options.cityFarm
					});
					renderCityFarm = view.render;
					return view.cards;
				},
				intel: () => {
					const view = buildIntelCards({
						kit,
						el,
						tr,
						store,
						syncers,
						towns,
						data: options.intel
					});
					renderIntel = view.render;
					return view.cards;
				},
				activity: buildActivity
			};
			panel.lang = lang;
			const nav = el("nav");
			nav.setAttribute("role", "tablist");
			listen(nav, "keydown", (event) => {
				const key = event.key;
				const ids = VIEWS.map((v) => v.id);
				const at = ids.indexOf(activeView);
				const next = key === "ArrowRight" ? ids[(at + 1) % ids.length] : key === "ArrowLeft" ? ids[(at - 1 + ids.length) % ids.length] : key === "Home" ? ids[0] : key === "End" ? ids[ids.length - 1] : void 0;
				if (!next) return;
				event.preventDefault();
				activeView = next;
				renderViews();
				viewParts.get(next)?.button.focus();
			}, "pestañas");
			const body = el("div", { className: "body" });
			for (const spec of VIEWS) {
				const { id, icon, key } = spec;
				const button = el("button");
				const ico = el("span", {
					className: "ico",
					textContent: icon
				});
				ico.setAttribute("aria-hidden", "true");
				button.append(ico, tr(key));
				button.type = "button";
				button.dataset.view = id;
				button.id = `gh-tab-${id}`;
				button.setAttribute("role", "tab");
				button.setAttribute("aria-controls", `gh-pane-${id}`);
				const cards = views[id]();
				if (spec.soon && cards.length === 0) {
					button.classList.add("soon");
					button.title = tr("soon");
				}
				listen(button, "click", () => {
					activeView = id;
					renderViews();
				}, "vista");
				const view = el("div", { className: "view" });
				view.dataset.viewPane = id;
				view.id = `gh-pane-${id}`;
				view.setAttribute("role", "tabpanel");
				view.setAttribute("aria-labelledby", button.id);
				view.append(...cards, ...spec.soon ? [buildSoon(spec)] : []);
				viewParts.set(id, {
					button,
					view
				});
				nav.append(button);
				body.append(view);
			}
			alertBox = el("div", { className: "alert" });
			alertBox.dataset.safety = "";
			panel.replaceChildren(header, nav, alertBox, body);
			renderViews();
			renderSafety();
			renderFarm();
			renderTowns();
			renderResearch();
			renderBuild();
			renderRecruit();
			renderTrade();
			renderVillageTrade();
			renderVillageExpansion();
			renderHide();
			renderHeroes();
			renderFestivals();
			renderDefense();
			renderBandits();
			renderMissions();
			renderSpells();
			renderTimed();
		}
		function renderViews() {
			for (const [id, { button, view }] of viewParts) {
				const on = id === activeView;
				button.classList.toggle("active", on);
				button.setAttribute("aria-selected", String(on));
				button.tabIndex = on ? 0 : -1;
				view.hidden = !on;
			}
			if (activeView === "profiles") refreshEditorLive();
			if (activeView === "intel") renderIntel();
		}
		function farmNextText(farm, status) {
			if (status.running) return tr("farmRunning");
			if (status.nextDueAt === null) return tr("farmNextNow");
			const serverNow = farm.serverNow();
			const left = serverNow === null ? null : Math.max(0, status.nextDueAt - serverNow);
			return left === null || left === 0 ? tr("farmNextNow") : `${tr("farmNextIn")} ${formatWait(left)}`;
		}
		function tickFarm() {
			const farm = options.farm;
			if (!farm || panel.hidden || !farmNextEl) return;
			const text = farmNextText(farm, farm.status());
			if (farmNextEl.textContent !== text) farmNextEl.textContent = text;
		}
		function renderFarm() {
			const farm = options.farm;
			if (!farm) {
				farmBox.replaceChildren();
				farmBox.hidden = true;
				return;
			}
			farmBox.hidden = false;
			const status = farm.status();
			const button = kit.button(tr("farmCollectNow"), "farmCollectNow", () => {
				farm.collectNow().catch((err) => {
					report("panel: recoger ahora", err);
				});
			}, { className: "primary" });
			button.disabled = status.running;
			const statusText = el("span", {
				className: "farm-status",
				textContent: `${tr("farmNext")}: `
			});
			farmNextEl = el("strong", { textContent: farmNextText(farm, status) });
			statusText.append(farmNextEl);
			const nextRow = el("div", { className: "farm-next" });
			nextRow.append(statusText, button);
			const children = [nextRow];
			if (status.lastResults.length > 0) {
				const list = el("ol", { className: "farm-results" });
				for (const r of status.lastResults) {
					const li = el("li", { className: r.level });
					li.append(el("time", { textContent: formatLogTime(r.at) }), el("span", {
						className: "town",
						textContent: r.name
					}), `: ${r.text}`);
					list.append(li);
				}
				children.push(el("span", {
					className: "lbl",
					textContent: tr("farmLastResults")
				}), list);
			}
			farmBox.replaceChildren(...children);
		}
		function renderSafety() {
			const safety = options.safety;
			const stop = safety?.stopped ?? null;
			fab.classList.toggle("stopped", stop !== null);
			alertBox.classList.remove("wait");
			safetyPop.hidden = !(safety && stop);
			if (safety && stop) {
				const content = () => {
					const resume = el("button", { textContent: tr("safetyResume") });
					resume.type = "button";
					resume.dataset.action = "resume";
					listen(resume, "click", () => {
						safety.resume();
					}, "reanudar");
					return [
						el("p", { textContent: `${tr("safetyStopped")}: ${tr(`stop_${stop.kind}`)}` }),
						el("p", { textContent: tr("safetyHint") }),
						resume
					];
				};
				safetyPop.replaceChildren(...content());
				alertBox.replaceChildren(...content());
				alertBox.hidden = false;
				return;
			}
			safetyPop.replaceChildren();
			const waitMs = safety?.cooldownRemainingMs() ?? 0;
			if (waitMs > 0) {
				alertBox.classList.add("wait");
				alertBox.replaceChildren(el("p", { textContent: `${tr("safetyCooldown")} ${Math.ceil(waitMs / 1e3)} s` }));
				alertBox.hidden = false;
				setTimeout(contain("panel: espera", renderSafety, report), waitMs + 100);
				return;
			}
			alertBox.replaceChildren();
			alertBox.hidden = true;
		}
		function renderLogs(s) {
			for (const [tab, button] of tabButtons) {
				const on = tab === activeTab;
				button.classList.toggle("active", on);
				button.setAttribute("aria-pressed", String(on));
			}
			const entries = s.logs.filter((e) => e.tab === activeTab).slice(-maxVisible);
			if (entries.length === 0) {
				logList.replaceChildren(el("li", {
					className: "empty",
					textContent: tr("logEmpty")
				}));
				return;
			}
			const items = entries.reverse().map((entry) => {
				const li = el("li", { className: entry.level });
				if (entry.muted) li.classList.add("muted");
				li.append(el("time", { textContent: formatLogTime(entry.ts) }), formatLogText(entry));
				return li;
			});
			logList.replaceChildren(...items);
		}
		function render(s) {
			if (s.language !== lang) {
				lang = s.language;
				kit.keepFocus(build);
			} else if (s.townProfiles !== shownTownProfiles || s.townQueues !== shownTownQueues) {
				const profilesChanged = s.townProfiles !== shownTownProfiles;
				renderTowns();
				if (profilesChanged) kit.keepFocus(renderEditor);
			}
			for (const sync of syncers) sync(s);
			renderLogs(s);
		}
		listen(fab, "click", () => {
			setOpen(panel.hidden !== false);
		}, "botón");
		listen(panel, "keydown", (event) => {
			if (event.key !== "Escape" || event.defaultPrevented) return;
			setOpen(false);
		}, "teclado");
		build();
		const unsubscribe = store.subscribe(render);
		const unsubscribeFarm = options.farm?.subscribe(contain("panel: aldeas", renderFarm, report)) ?? (() => void 0);
		const farmTimer = options.farm ? setInterval(contain("panel: aldeas", tickFarm, report), 1e3) : null;
		const refreshProfilesView = () => {
			if (!panel.hidden && activeView === "profiles") refreshEditorLive();
		};
		const unsubscribeResearch = options.research?.subscribe(contain("panel: investigación", () => {
			renderResearch();
			refreshProfilesView();
		}, report)) ?? (() => void 0);
		const unsubscribeBuild = options.build?.subscribe(contain("panel: construcción", () => {
			renderBuild();
			refreshProfilesView();
		}, report)) ?? (() => void 0);
		const unsubscribeTrade = options.trade?.subscribe(contain("panel: comercio", renderTrade, report)) ?? (() => void 0);
		const unsubscribeVillageTrade = options.villageTrade?.subscribe(contain("panel: aldeas", renderVillageTrade, report)) ?? (() => void 0);
		const unsubscribeFestivals = options.festivals?.subscribe(contain("panel: festivales", renderFestivals, report)) ?? (() => void 0);
		const unsubscribeDefense = options.defense?.subscribe(contain("panel: defensa", renderDefense, report)) ?? (() => void 0);
		const unsubscribeBandits = options.bandits?.subscribe(contain("panel: bandidos", renderBandits, report)) ?? (() => void 0);
		const unsubscribeMissions = options.missions?.subscribe(contain("panel: misiones", renderMissions, report)) ?? (() => void 0);
		const unsubscribeSpells = options.spells?.subscribe(contain("panel: hechizos", () => {
			renderSpells();
		}, report)) ?? (() => void 0);
		const unsubscribeTimed = options.timed?.subscribe(contain("panel: cronometrados", () => {
			renderTimed();
		}, report)) ?? (() => void 0);
		const unsubscribeHide = options.hide?.subscribe(contain("panel: cueva", renderHide, report)) ?? (() => void 0);
		const unsubscribeHeroes = options.heroes?.subscribe(contain("panel: héroes", renderHeroes, report)) ?? (() => void 0);
		const unsubscribeCityFarm = options.cityFarm?.subscribe(contain("panel: farmeo de ciudades", () => {
			renderCityFarm();
		}, report)) ?? (() => void 0);
		const unsubscribeIntel = options.intel?.subscribe(contain("panel: intel", () => {
			renderIntel();
		}, report)) ?? (() => void 0);
		const unsubscribeVillageExpansion = options.villageExpansion?.subscribe(contain("panel: expansión", renderVillageExpansion, report)) ?? (() => void 0);
		let gameTown = options.profiles?.currentTownId?.() ?? null;
		const townTimer = options.towns || options.profiles?.currentTownId ? setInterval(contain("panel: ciudad", () => {
			const listChanged = townListKey(towns()) !== shownTowns;
			if (listChanged) {
				renderTowns();
				renderPoolTargets();
				for (const render of townListRenderers) render();
			}
			const now = options.profiles?.currentTownId?.() ?? null;
			if (now === gameTown && !listChanged) return;
			gameTown = now;
			refreshProfilesView();
		}, report), 1e3) : null;
		const unsubscribeRecruit = options.recruit?.subscribe(contain("panel: reclutamiento", () => {
			renderRecruit();
			refreshProfilesView();
		}, report)) ?? (() => void 0);
		const unsubscribeSafety = options.safety?.subscribe(contain("panel: seguridad", () => {
			renderSafety();
		}, report)) ?? (() => void 0);
		render(store.get());
		doc.body.append(host);
		return {
			host,
			root,
			isOpen: () => !panel.hidden,
			open: () => {
				setOpen(true);
			},
			close: () => {
				setOpen(false);
			},
			toggle: () => {
				setOpen(panel.hidden !== false);
			},
			destroy() {
				unsubscribe();
				unsubscribeSafety();
				unsubscribeFarm();
				unsubscribeResearch();
				unsubscribeBuild();
				unsubscribeRecruit();
				unsubscribeTrade();
				unsubscribeVillageTrade();
				unsubscribeVillageExpansion();
				unsubscribeHide();
				unsubscribeHeroes();
				unsubscribeFestivals();
				unsubscribeDefense();
				unsubscribeBandits();
				unsubscribeMissions();
				unsubscribeSpells();
				unsubscribeTimed();
				unsubscribeCityFarm();
				unsubscribeIntel();
				if (farmTimer !== null) clearInterval(farmTimer);
				if (townTimer !== null) clearInterval(townTimer);
				host.remove();
			}
		};
	}
	var WINDOW_SELECTOR$1 = ".gpwindow_content,.window_content,.js-window-main-container";
	var OWN$1 = "gh-ts";
	var SCAN_DEBOUNCE_MS$1 = 200;
	var MIN_UNIT_INPUTS = 5;
	function townInfoTab(url, data, origin) {
		let parsed;
		try {
			parsed = new URL(url, origin);
		} catch {
			return null;
		}
		if (!parsed.pathname.endsWith("/game/town_info")) return null;
		const action = parsed.searchParams.get("action");
		if (action !== "attack" && action !== "support") return null;
		let json = parsed.searchParams.get("json");
		if (json === null && typeof data === "string") json = new URLSearchParams(data).get("json");
		if (json === null) return null;
		try {
			const body = JSON.parse(json);
			const id = isRecord$4(body) ? Number(body.id) : NaN;
			return Number.isInteger(id) && id > 0 ? {
				type: action,
				targetTownId: id
			} : null;
		} catch {
			return null;
		}
	}
	function nextClockTime(h, m, s, nowMs) {
		const at = new Date(nowMs);
		at.setHours(h, m, s, 0);
		if (at.getTime() <= nowMs) at.setDate(at.getDate() + 1);
		return Math.floor(at.getTime() / 1e3);
	}
	function unitInputs(root) {
		const out = new Map();
		for (const unit of UNIT_IDS) {
			const input = root.querySelector(`input[name="${unit}"]`);
			if (input && !input.closest(`.${OWN$1}-bar`)) out.set(unit, input);
		}
		return out;
	}
	function sameUnits(a, b) {
		const ka = Object.keys(a);
		const kb = Object.keys(b);
		return ka.length === kb.length && ka.every((u) => a[u] === b[u]);
	}
	function isAttackWindow(inputs) {
		const units = [...inputs.keys()];
		return units.length >= MIN_UNIT_INPUTS && units.some(isNavalUnit) && units.some((u) => !isNavalUnit(u));
	}
	var STYLE$1 = `
.${OWN$1}-bar{position:relative;display:flex;align-items:center;justify-content:flex-end;gap:6px;flex-wrap:wrap;margin:8px 4px 2px;padding:6px 4px 0;border-top:1px solid rgba(120,90,40,.35);font:13px/1.2 Arial,sans-serif;color:#3b2a12}
.${OWN$1}-bar input{width:44px;height:22px;padding:0 4px;border:1px solid #b9a37a;border-radius:3px;background:#fff;text-align:center;font:13px Arial,sans-serif}
.${OWN$1}-bar input[aria-invalid=true]{outline:2px solid #c44}
.${OWN$1}-bar button{height:26px;padding:0 14px;border:1px solid #2c5f9e;border-radius:4px;background:linear-gradient(#5b9be0,#3474c4);color:#fff;font:bold 13px Arial,sans-serif;cursor:pointer}
.${OWN$1}-bar button:disabled{opacity:.5;cursor:default}
.${OWN$1}-note{position:absolute;left:4px;right:4px;bottom:calc(100% + 6px);z-index:10;padding:7px 30px 7px 10px;border:1px solid #b9a37a;border-radius:4px;background:#fff8dc;box-shadow:0 2px 6px rgba(0,0,0,.3);font:13px/1.35 Arial,sans-serif;color:#3b2a12;text-align:left}
.${OWN$1}-note[hidden]{display:none}
.${OWN$1}-note[data-level=error]{border-color:#c44;color:#a22}
.${OWN$1}-bar .${OWN$1}-close{position:absolute;top:3px;right:4px;width:22px;height:22px;padding:0;border:0;background:none;color:inherit;font:bold 16px/22px Arial,sans-serif}
`;
	function createScheduleBar(options) {
		const doc = options.doc ?? document;
		const { store } = options;
		const report = options.onError ?? createErrorReporter(null);
		const now = options.now ?? Date.now;
		const setTimer = options.setTimeout ?? ((fn, ms) => setTimeout(fn, ms));
		const clearTimer = options.clearTimeout ?? ((id) => {
			clearTimeout(id);
		});
		const tr = (key) => t(store.get().language, key);
		let last = null;
		const win = options.win;
		if (win && typeof win.jQuery === "function" && win.document !== void 0) try {
			const target = win.jQuery(win.document);
			if (isRecord$4(target) && typeof target.ajaxComplete === "function") target.ajaxComplete(contain("programar: petición", (_e, _xhr, settings) => {
				if (typeof settings.url !== "string") return;
				const tab = townInfoTab(settings.url, settings.data, win.location.origin);
				if (tab && options.ownRequests?.consume("town_info", tab.type, tab.targetTownId)) return;
				if (tab) {
					last = tab;
					schedule();
				}
			}, report));
		} catch {}
		const el = (tag, className, text) => {
			const node = doc.createElement(tag);
			if (className) node.className = className;
			if (text !== void 0) node.textContent = text;
			return node;
		};
		let style = null;
		const ensureStyle = () => {
			if (style?.isConnected) return;
			style = el("style", void 0, STYLE$1);
			style.dataset.gh = OWN$1;
			doc.head.appendChild(style);
		};
		const isolate = (node) => {
			for (const type of [
				"mousedown",
				"keydown",
				"keyup",
				"keypress"
			]) node.addEventListener(type, (e) => {
				e.stopPropagation();
			});
		};
		function buildBar(root) {
			const bar = el("div", `${OWN$1}-bar`);
			isolate(bar);
			const field = (name, max) => {
				const input = el("input");
				input.type = "number";
				input.min = "0";
				input.max = String(max);
				input.value = "0";
				input.dataset.ghTime = name;
				input.setAttribute("aria-label", name);
				return input;
			};
			const hh = field("hh", 23);
			const mm = field("mm", 59);
			const ss = field("ss", 59);
			const button = el("button", void 0, tr("tsSchedule"));
			button.type = "button";
			button.dataset.ghAction = "schedule";
			const farm = el("button", void 0, tr("tsAddFarm"));
			farm.type = "button";
			farm.dataset.ghAction = "farm";
			const note = el("div", `${OWN$1}-note`);
			note.hidden = true;
			note.setAttribute("role", "status");
			const msg = el("span", `${OWN$1}-msg`);
			const close = el("button", `${OWN$1}-close`, "×");
			close.type = "button";
			close.setAttribute("aria-label", tr("close"));
			close.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				note.hidden = true;
			});
			note.append(msg, close);
			const say = (text, level) => {
				msg.textContent = text;
				note.dataset.level = level;
				note.hidden = false;
			};
			button.addEventListener("click", contain("programar", (e) => {
				e.preventDefault();
				e.stopPropagation();
				schedule1(root, [
					hh,
					mm,
					ss
				], say);
			}, report));
			farm.addEventListener("click", contain("añadir a farmlist", (e) => {
				e.preventDefault();
				e.stopPropagation();
				addToFarm(root, say);
			}, report));
			bar.append(farm, el("span", void 0, tr("tsArriveAt")), hh, ":", mm, ":", ss, button, note);
			return bar;
		}
		function typedUnits(root) {
			const units = {};
			for (const [unit, input] of unitInputs(root)) {
				const n = Number(input.value.trim() === "" ? 0 : input.value);
				if (Number.isInteger(n) && n > 0) units[unit] = n;
			}
			return units;
		}
		function missing(settings, moduleOn, module, tab, lead) {
			const off = [];
			if (!moduleOn) off.push(`${tr(module)} (${tr("tsTab")} ${tr(tab)})`);
			if (!settings.enabled) off.push(`${tr("switchOn")} (${tr("tsHeader")})`);
			const parts = [];
			if (off.length > 0) parts.push(`${tr(lead)} ${off.join(` ${tr("tsAnd")} `)}.`);
			if (settings.dryRun) parts.push(tr("tsDryRun"));
			return parts.join(" ");
		}
		function addToFarm(root, say) {
			const units = typedUnits(root);
			const from = options.currentTownId();
			const tab = last;
			if (from === null || tab === null || tab.targetTownId === from) {
				say(tr("tsNoTab"), "error");
				return;
			}
			if (tab.type !== "attack") {
				say(tr("tsFarmOnlyAttack"), "error");
				return;
			}
			const settings = store.get();
			const cfg = settings.cityFarm;
			if (cfg.targets.some((x) => x.fromTownId === from && x.targetTownId === tab.targetTownId)) {
				say(tr("cfDuplicate"), "error");
				return;
			}
			if (cfg.targets.length >= 300) {
				say(tr("cfFull"), "error");
				return;
			}
			const typed = Object.keys(units).length > 0;
			const found = typed ? cfg.templates.find((x) => sameUnits(x.units, units)) : cfg.templates[0];
			if (!found && !typed) {
				say(tr("tsFarmNoUnits"), "error");
				return;
			}
			if (!found && cfg.templates.length >= 50) {
				say(tr("raidFull"), "error");
				return;
			}
			const lang = settings.language;
			const described = Object.entries(units).map(([u, n]) => `${unitName(lang, u)} ${String(n)}`).join(", ");
			const name = found?.name ?? (described.length > 40 ? `${described.slice(0, 39)}…` : described);
			const stamp = now().toString(36);
			store.update((st) => {
				let templateId = found?.id;
				if (templateId === void 0) {
					templateId = `rt-${stamp}-w${String(st.cityFarm.templates.length)}`;
					st.cityFarm.templates.push({
						id: templateId,
						name,
						units
					});
				}
				st.cityFarm.targets.push({
					id: `cf-${stamp}-w${String(st.cityFarm.targets.length)}`,
					enabled: true,
					targetTownId: tab.targetTownId,
					fromTownId: from,
					templateId,
					ownerId: null,
					ownerChanged: false,
					sends: 0,
					lastSentAt: null
				});
			});
			const todo = missing(settings, cfg.enabled, "cityFarm", "tabCityFarms", "tsFarmTurnOn");
			say(`#${String(tab.targetTownId)}: ${tr("tsFarmAdded")} «${name}».${todo ? ` ${todo}` : ""}`, "info");
		}
		function schedule1(root, time, say) {
			const parts = time.map((input) => Number(input.value));
			const limits = [
				23,
				59,
				59
			];
			if (time.map((input, i) => {
				const n = parts[i] ?? NaN;
				const ok = Number.isInteger(n) && n >= 0 && n <= (limits[i] ?? 0);
				input.setAttribute("aria-invalid", String(!ok));
				return ok;
			}).includes(false)) {
				say(tr("tsBadTime"), "error");
				return;
			}
			const units = typedUnits(root);
			const from = options.currentTownId();
			const tab = last;
			if (Object.keys(units).length === 0) {
				say(tr("tsNoUnits"), "error");
				return;
			}
			if (from === null || tab === null || tab.targetTownId === from) {
				say(tr("tsNoTab"), "error");
				return;
			}
			const settings = store.get();
			if (settings.timedCommands.items.length >= 50) {
				say(tr("timedFull"), "error");
				return;
			}
			const [h = 0, m = 0, s = 0] = parts;
			const arrivalAt = nextClockTime(h, m, s, now());
			store.update((st) => {
				st.timedCommands.items.push({
					id: `tc-${now().toString(36)}-w${String(st.timedCommands.items.length)}`,
					enabled: true,
					type: tab.type,
					fromTownId: from,
					targetTownId: tab.targetTownId,
					units,
					arrivalAt,
					early: st.timedCommands.defaultEarly,
					late: st.timedCommands.defaultLate,
					travelSeconds: null,
					powerId: null,
					tuning: false
				});
			});
			const d = new Date(arrivalAt * 1e3);
			const p = (n) => String(n).padStart(2, "0");
			const when = `${p(d.getDate())}/${p(d.getMonth() + 1)} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
			const kind = tr(tab.type === "attack" ? "timedAttack" : "timedSupport");
			const todo = missing(settings, settings.timedCommands.enabled, "timedCommands", "tabCombat", "tsTurnOn");
			say(`${kind} → #${String(tab.targetTownId)}: ${tr("tsScheduled")} ${when}. ${todo || tr("tsWillSend")}`, "info");
		}
		const bars = new Map();
		function scan() {
			const seen = new Set();
			for (const root of doc.querySelectorAll(WINDOW_SELECTOR$1)) {
				if (root.querySelector(WINDOW_SELECTOR$1)) continue;
				if (!isAttackWindow(unitInputs(root))) continue;
				seen.add(root);
				if (bars.get(root)?.isConnected) continue;
				ensureStyle();
				const fresh = buildBar(root);
				root.append(fresh);
				bars.set(root, fresh);
			}
			for (const [root, bar] of bars) {
				if (seen.has(root) && root.isConnected) continue;
				bar.remove();
				bars.delete(root);
			}
		}
		let pending = null;
		const safeScan = contain("programar: ventana", scan, report);
		function schedule() {
			if (pending !== null) return;
			pending = setTimer(() => {
				pending = null;
				safeScan();
			}, SCAN_DEBOUNCE_MS$1);
		}
		const ours = (node) => node instanceof Element && (node.classList.contains(`${OWN$1}-bar`) || node.closest(`.${OWN$1}-bar`) !== null);
		const observer = new MutationObserver((records) => {
			if (records.some((r) => !ours(r.target) && [...r.addedNodes, ...r.removedNodes].some((n) => !ours(n)))) schedule();
		});
		observer.observe(doc.body, {
			childList: true,
			subtree: true
		});
		schedule();
		return {
			scan,
			lastTab: () => last,
			noteTab(tab) {
				last = tab;
			},
			stop() {
				observer.disconnect();
				if (pending !== null) clearTimer(pending);
				for (const bar of bars.values()) bar.remove();
				bars.clear();
				style?.remove();
			}
		};
	}
	function setQueueTarget(queue, building, level) {
		if (queue.some((q) => q.building === building)) return queue.map((q) => q.building === building ? {
			building,
			level
		} : { ...q });
		if (queue.length >= 40) return queue.map((q) => ({ ...q }));
		return [...queue.map((q) => ({ ...q })), {
			building,
			level
		}];
	}
	function removeQueueTarget(queue, building) {
		return queue.filter((q) => q.building !== building).map((q) => ({ ...q }));
	}
	function moveQueueTarget(queue, building, delta) {
		const out = queue.map((q) => ({ ...q }));
		const from = out.findIndex((q) => q.building === building);
		if (from < 0) return out;
		const to = Math.max(0, Math.min(out.length - 1, from + delta));
		const [item] = out.splice(from, 1);
		if (item) out.splice(to, 0, item);
		return out;
	}
	function pruneReachedTargets(queue, levels) {
		return queue.filter((q) => (levels[q.building] ?? 0) < q.level).map((q) => ({ ...q }));
	}
	var SENATE_TILE_SELECTOR = "[id^=\"building_main_\"],[id^=\"special_building_\"]";
	var TILE_ID = /^(?:building_main|special_building)_([a-z0-9_]+)$/;
	var WINDOW_SELECTOR = ".gpwindow_content,.window_content";
	var OWN = "gh-sq";
	var COLUMN_WIDTH = 150;
	var SCAN_DEBOUNCE_MS = 200;
	var REFRESH_MS = 2e3;
	var STATE_KEY = {
		reached: "sq_reached",
		queued: "sq_queued",
		pending: "sq_pending",
		blocked: "sq_blocked"
	};
	function senateTileBuilding(el) {
		const id = TILE_ID.exec(el.id)?.[1];
		return isBuildingId(id) ? id : null;
	}
	var STYLE = `
.${OWN}-ctl{position:absolute;top:1px;right:1px;z-index:5;display:flex;gap:2px;align-items:center;font:bold 11px/1 Arial,sans-serif}
.${OWN}-badge{min-width:16px;padding:2px 3px;border-radius:3px;background:#3d8b2f;color:#fff;text-align:center;border:1px solid #1f5317}
.${OWN}-badge[data-state=reached]{background:#7a7a7a;border-color:#555}
.${OWN}-badge[data-state=blocked]{background:#a33;border-color:#611}
.${OWN}-btn{min-width:18px;height:18px;padding:0 3px;border:1px solid #8a6725;border-radius:3px;background:linear-gradient(#5b4828,#342814);color:#fff3c7;font:bold 11px/16px Arial,sans-serif;cursor:pointer}
.${OWN}-btn:disabled{opacity:.45;cursor:default}
.${OWN}-pop,.${OWN}-col{position:fixed;z-index:2147483000;background:rgba(34,27,17,.97);color:#f2dfb2;border:1px solid #8a6725;border-radius:5px;box-shadow:0 3px 10px rgba(0,0,0,.5);font:11px/1.3 Arial,sans-serif}
.${OWN}-pop{padding:6px;display:flex;flex-direction:column;gap:4px;min-width:150px}
.${OWN}-pop input{width:56px}
.${OWN}-pop input[aria-invalid=true]{outline:2px solid #c44}
.${OWN}-pop .${OWN}-row{display:flex;gap:4px;align-items:center}
.${OWN}-col{width:${COLUMN_WIDTH}px;max-height:80vh;overflow:auto;padding:4px}
.${OWN}-col h3{margin:0 0 4px;font:bold 12px Arial,sans-serif;text-align:center}
.${OWN}-col ol{margin:0;padding:0;list-style:none}
.${OWN}-col li{display:flex;gap:2px;align-items:center;padding:2px 0;border-top:1px solid rgba(190,150,75,.25)}
.${OWN}-col li:first-child{border-top:0}
.${OWN}-col li span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.${OWN}-col li[data-state=reached] span{color:#9a9a9a;text-decoration:line-through}
.${OWN}-col li[data-state=queued] span{color:#9bd}
.${OWN}-col li[data-state=blocked] span{color:#e88}
.${OWN}-col li .${OWN}-btn{min-width:16px;height:16px;line-height:14px;padding:0 2px;font-size:10px}
.${OWN}-note{margin-top:4px;color:#c7ad78;font-style:italic}
`;
	function createSenateQueue(options) {
		const doc = options.doc ?? document;
		const { store } = options;
		const report = options.onError ?? createErrorReporter(null);
		const setTimer = options.setTimeout ?? ((fn, ms) => setTimeout(fn, ms));
		const clearTimer = options.clearTimeout ?? ((id) => {
			clearTimeout(id);
		});
		const setEvery = options.setInterval ?? ((fn, ms) => setInterval(fn, ms));
		const clearEvery = options.clearInterval ?? ((id) => {
			clearInterval(id);
		});
		const lang = () => store.get().language;
		const tr = (key) => t(lang(), key);
		const statusTitle = (s) => {
			const reason = s.block ? blockText(lang(), s.block) : s.reason;
			return `${tr(STATE_KEY[s.state])}${reason ? `: ${reason}` : ""}`;
		};
		const el = (tag, className, text) => {
			const node = doc.createElement(tag);
			if (className) node.className = className;
			if (text !== void 0) node.textContent = text;
			return node;
		};
		const button = (text, title, onClick) => {
			const b = el("button", `${OWN}-btn`, text);
			b.type = "button";
			b.title = title;
			b.setAttribute("aria-label", title);
			const stop = (e) => {
				e.stopPropagation();
			};
			b.addEventListener("mousedown", stop);
			b.addEventListener("click", contain("senado: botón", (e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}, report));
			return b;
		};
		let style = null;
		const ensureStyle = () => {
			if (style?.isConnected) return;
			style = el("style", void 0, STYLE);
			style.dataset.gh = OWN;
			doc.head.appendChild(style);
		};
		const queueOf = (townId) => store.get().townQueues[String(townId)] ?? [];
		const saveQueue = (townId, change) => {
			const levels = options.readState(townId)?.levels ?? {};
			store.update((draft) => {
				const key = String(townId);
				const next = pruneReachedTargets(change(draft.townQueues[key] ?? []), levels);
				draft.townQueues = Object.fromEntries(Object.entries({
					...draft.townQueues,
					[key]: next
				}).filter(([, q]) => q.length > 0));
			});
			scan();
		};
		let popover = null;
		const closePopover = () => {
			popover?.remove();
			popover = null;
		};
		function openPopover(anchor, townId, building, state) {
			closePopover();
			const current = state.levels[building] ?? 0;
			const effective = current + (state.queued[building] ?? 0);
			const max = maxLevelOf(state, building);
			const existing = queueOf(townId).find((q) => q.building === building);
			const min = current + 1;
			const pop = el("div", `${OWN}-pop`);
			pop.dataset.building = building;
			pop.append(el("b", void 0, localBuildingName(lang(), building)));
			const queuedText = effective > current ? ` (+${effective - current})` : "";
			pop.append(el("small", void 0, `${tr("sqNow")}: ${current}${queuedText} · ${tr("sqMaxShort")} ${max}`));
			const row = el("div", `${OWN}-row`);
			const label = el("label", void 0, `${tr("sqLevel")} `);
			const input = el("input");
			input.type = "number";
			input.min = String(min);
			input.max = String(max);
			input.value = String(Math.min(max, Math.max(min, existing?.level ?? effective + 1)));
			label.append(input);
			row.append(label);
			const save = () => {
				const level = Number(input.value);
				if (!Number.isInteger(level) || level < min || level > max) {
					input.setAttribute("aria-invalid", "true");
					return;
				}
				closePopover();
				saveQueue(townId, (q) => setQueueTarget(q, building, level));
			};
			row.append(button("✓", existing ? tr("sqSave") : tr("sqAdd"), save));
			if (existing) row.append(button("🗑", tr("sqRemove"), () => {
				closePopover();
				saveQueue(townId, (q) => removeQueueTarget(q, building));
			}));
			row.append(button("✕", tr("close"), closePopover));
			pop.append(row);
			pop.addEventListener("mousedown", (e) => {
				e.stopPropagation();
			});
			input.addEventListener("keydown", contain("senado: nivel", (e) => {
				e.stopPropagation();
				if (e.key === "Enter") save();
				else if (e.key === "Escape") closePopover();
			}, report));
			const rect = anchor.getBoundingClientRect();
			pop.style.left = `${Math.round(rect.left)}px`;
			pop.style.top = `${Math.round(rect.bottom + 4)}px`;
			doc.body.appendChild(pop);
			popover = pop;
			input.focus();
			input.select();
		}
		const painted = new WeakMap();
		const columns = new Map();
		function mountTile(tile, townId, building, state, status) {
			const max = maxLevelOf(state, building);
			const current = state.levels[building] ?? 0;
			const title = status ? statusTitle(status) : "";
			const sig = JSON.stringify([
				townId,
				lang(),
				current,
				max,
				status?.level,
				title
			]);
			const old = tile.querySelector(`:scope > .${OWN}-ctl`);
			if (old && painted.get(tile) === sig) return;
			old?.remove();
			painted.set(tile, sig);
			if (doc.defaultView?.getComputedStyle(tile).position === "static") tile.style.position = "relative";
			const ctl = el("div", `${OWN}-ctl`);
			ctl.dataset.building = building;
			if (status) {
				const badge = el("span", `${OWN}-badge`, String(status.level));
				badge.dataset.state = status.state;
				badge.title = title;
				ctl.append(badge);
			}
			const plus = button("+", current >= max ? tr("sqMax") : tr("sqPlus"), () => {
				const fresh = options.readState(townId);
				if (fresh) openPopover(plus, townId, building, fresh);
			});
			plus.disabled = current >= max;
			ctl.append(plus);
			tile.append(ctl);
		}
		function renderColumn(root, townId, statuses) {
			let col = columns.get(root);
			const settings = store.get();
			const hasProfile = String(townId) in settings.townProfiles;
			const off = !settings.enabled || !settings.masters.autoBuild;
			const sig = JSON.stringify([
				townId,
				lang(),
				off,
				settings.dryRun,
				hasProfile,
				statuses.map((s) => [
					s.building,
					s.level,
					statusTitle(s)
				])
			]);
			if (!col || !col.isConnected) {
				col = el("div", `${OWN}-col`);
				col.addEventListener("mousedown", (e) => {
					e.stopPropagation();
				});
				doc.body.appendChild(col);
				columns.set(root, col);
			}
			placeColumn(root, col);
			if (painted.get(col) === sig) return;
			painted.set(col, sig);
			col.dataset.town = String(townId);
			col.replaceChildren(el("h3", void 0, tr("sqTitle")));
			if (statuses.length === 0) col.append(el("div", `${OWN}-note`, tr("sqEmpty")));
			else {
				const list = el("ol");
				statuses.forEach((s, i) => {
					const li = el("li");
					li.dataset.building = s.building;
					li.dataset.state = s.state;
					const name = el("span", void 0, `${localBuildingName(lang(), s.building)} ${s.level}`);
					name.title = statusTitle(s);
					const up = button("▲", tr("sqUp"), () => {
						saveQueue(townId, (q) => moveQueueTarget(q, s.building, -1));
					});
					up.disabled = i === 0;
					const down = button("▼", tr("sqDown"), () => {
						saveQueue(townId, (q) => moveQueueTarget(q, s.building, 1));
					});
					down.disabled = i === statuses.length - 1;
					const remove = button("✕", tr("sqRemove"), () => {
						saveQueue(townId, (q) => removeQueueTarget(q, s.building));
					});
					li.append(name, up, down, remove);
					list.append(li);
				});
				col.append(list);
				if (hasProfile) col.append(el("div", `${OWN}-note`, tr("sqThen")));
			}
			if (off) col.append(el("div", `${OWN}-note`, tr("sqOff")));
			else if (settings.dryRun) col.append(el("div", `${OWN}-note`, tr("sqDryRun")));
		}
		function placeColumn(root, col) {
			const rect = root.getBoundingClientRect();
			const viewport = doc.defaultView?.innerWidth ?? 1024;
			let left = rect.right + 4;
			if (left + COLUMN_WIDTH > viewport) left = Math.max(0, rect.right - COLUMN_WIDTH - 4);
			col.style.left = `${Math.round(left)}px`;
			col.style.top = `${Math.round(Math.max(0, rect.top))}px`;
		}
		function scan() {
			const townId = options.currentTownId();
			const tiles = [...doc.querySelectorAll(SENATE_TILE_SELECTOR)].filter((n) => !n.closest(`[class^="${OWN}-"]`));
			const state = townId === null || tiles.length === 0 ? null : options.readState(townId);
			const roots = new Set();
			if (townId !== null && state) {
				ensureStyle();
				const statuses = evaluateTownQueue(queueOf(townId), state);
				const byRoot = new Map();
				for (const tile of tiles) {
					const building = senateTileBuilding(tile);
					if (!building) continue;
					const root = tile.closest(WINDOW_SELECTOR) ?? tile.parentElement;
					if (!root) continue;
					const seen = byRoot.get(root) ?? new Set();
					byRoot.set(root, seen);
					if (seen.has(building)) continue;
					seen.add(building);
					mountTile(tile, townId, building, state, statuses.find((s) => s.building === building));
				}
				for (const root of byRoot.keys()) {
					roots.add(root);
					renderColumn(root, townId, statuses);
				}
			}
			for (const [root, col] of columns) {
				if (roots.has(root) && root.isConnected) continue;
				col.remove();
				columns.delete(root);
			}
			if (roots.size === 0) {
				closePopover();
				for (const ctl of doc.querySelectorAll(`.${OWN}-ctl`)) ctl.remove();
			}
		}
		let pending = null;
		const safeScan = contain("senado", scan, report);
		const schedule = () => {
			if (pending !== null) return;
			pending = setTimer(() => {
				pending = null;
				safeScan();
			}, SCAN_DEBOUNCE_MS);
		};
		const ours = (node) => node instanceof Element && typeof node.className === "string" && node.className.startsWith(`${OWN}-`);
		const observer = new MutationObserver((records) => {
			if (records.some((r) => !ours(r.target) && !(r.target instanceof Element && r.target.closest(`[class^="${OWN}-"]`)) && [...r.addedNodes, ...r.removedNodes].some((n) => !ours(n)))) schedule();
		});
		observer.observe(doc.body, {
			childList: true,
			subtree: true
		});
		const refresh = setEvery(() => {
			if (columns.size > 0) safeScan();
		}, REFRESH_MS);
		const unsubscribe = store.subscribe(() => {
			schedule();
		});
		schedule();
		return {
			scan,
			stop() {
				observer.disconnect();
				clearEvery(refresh);
				if (pending !== null) clearTimer(pending);
				unsubscribe();
				closePopover();
				for (const col of columns.values()) col.remove();
				columns.clear();
				for (const ctl of doc.querySelectorAll(`.${OWN}-ctl`)) ctl.remove();
				style?.remove();
			}
		};
	}
	var READY_POLL_MS = 500;
	var READY_TIMEOUT_MS = 6e4;
	function waitForClient(win) {
		const started = Date.now();
		return new Promise((resolve) => {
			const check = () => {
				let ready = false;
				try {
					ready = isClientReady(win);
				} catch {}
				if (ready) resolve(true);
				else if (Date.now() - started > READY_TIMEOUT_MS) resolve(false);
				else setTimeout(check, READY_POLL_MS);
			};
			check();
		});
	}
	async function main() {
		const win = window;
		const logger = new Logger();
		if (!await waitForClient(win)) {
			try {
				readGameContext(win);
			} catch (err) {
				console.error("[grepo-helper] el cliente del juego no está listo:", err);
			}
			return;
		}
		const report = createErrorReporter(logger);
		const ctx = readGameContext(win);
		const { settings, warnings, fresh } = loadSettings(ctx.host, ctx.playerId);
		const store = new SettingsStore(settings, ctx.host, ctx.playerId);
		logger.attach(store);
		if (fresh) logger.info("ajustes nuevos para este mundo y jugador");
		for (const w of warnings) logger.warn(w);
		const safety = new SafetyGuard({
			logger,
			isDryRun: () => store.get().dryRun
		});
		if (!observePageAjax(win, safety)) logger.warn("no se pueden observar las respuestas del juego (sin jQuery)", { reason: "solo se revisan las peticiones del script" });
		const ownRequests = createOwnRequests();
		const api = createGameApi({
			win,
			logger,
			safety,
			ownRequests
		});
		const farm = createFarmVillagesModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const research = createAutoResearchModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const build = createAutoBuildModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const recruit = createAutoRecruitModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const tracker = createTradeTracker({
			api,
			win
		});
		const trade = createAutoTradeModule({
			api,
			win,
			logger,
			tracker,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const villageTrade = createVillageTradeModule({
			api,
			win,
			logger,
			tracker,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const killpoints = createKillpointsLedger();
		const villageExpansion = createVillageExpansionModule({
			api,
			win,
			logger,
			ledger: killpoints,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const market = createMarketModule({
			api,
			win,
			logger,
			playerId: ctx.playerId,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const hide = createHideIronModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const heroes = createHeroDispatchModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const festivals = createFestivalsModule({
			api,
			win,
			logger,
			ledger: killpoints,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const tabId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
		const locks = "locks" in navigator ? navigator.locks : null;
		const defense = createDefenseModule({
			api,
			win,
			logger,
			playerId: ctx.playerId,
			getSettings: () => store.get(),
			update: (mutate) => {
				store.update(mutate);
			},
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null,
			claim: createTabClaims(`grepoHelper:defenseClaims:${ctx.host}:${String(ctx.playerId)}`, {
				storage: localStorage,
				locks,
				tabId
			})
		});
		const bandits = createBanditsModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const missions = createMissionsModule({
			api,
			win,
			logger,
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		const attackRate = createAttackRate();
		const cityFarm = createCityFarmModule({
			api,
			win,
			logger,
			update: (mutate) => {
				store.update(mutate);
			},
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null,
			attackRate
		});
		const activity = createPlayerActivity(localStorage, `grepoHelper:activity:${ctx.host}:${String(ctx.playerId)}`);
		const intel = createWorldIntel({
			api,
			win,
			activity
		});
		const activityTask = createActivityTask({
			api,
			activity,
			logger,
			isSafetyStopped: () => safety.stopped !== null,
			onRecord: () => {
				intel.notify();
			}
		});
		const watched = createWatchedPlayers({
			api,
			win,
			playerId: ctx.playerId,
			activity,
			history: createWatchHistory(localStorage, `grepoHelper:watch:${ctx.host}:${String(ctx.playerId)}`),
			logger,
			isSafetyStopped: () => safety.stopped !== null,
			onLoad: () => {
				intel.notify();
			}
		});
		const monitor = createAllianceMonitor({
			api,
			history: createDefenseHistory(localStorage, `grepoHelper:monitor:${ctx.host}:${String(ctx.playerId)}`),
			logger,
			isSafetyStopped: () => safety.stopped !== null
		});
		const scheduler = new Scheduler({
			getSettings: () => store.get(),
			logger,
			getTownCount: () => {
				const { townProfiles, townQueues } = store.get();
				return new Set([...Object.keys(townProfiles), ...Object.keys(townQueues)]).size;
			},
			isSafetyStopped: () => safety.stopped !== null,
			setTimeout: (fn, ms) => window.setTimeout(contain("scheduler", fn, report), ms),
			tasks: [
				defense.task,
				trade.task,
				build.freeFinishTask,
				build.task,
				research.task,
				recruit.task,
				farm.task,
				villageTrade.task,
				villageExpansion.task,
				market.task,
				missions.task,
				bandits.task,
				cityFarm.task,
				activityTask,
				watched.task,
				monitor.task,
				festivals.task,
				hide.task,
				heroes.task
			]
		});
		const spells = createScheduledSpellsModule({
			api,
			win,
			logger,
			getSettings: () => store.get(),
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null
		});
		let spellsKey = "";
		const watchSpells = (s) => {
			const key = JSON.stringify([
				s.enabled,
				s.dryRun,
				store.get().scheduledSpells
			]);
			if (key === spellsKey) return;
			spellsKey = key;
			spells.check();
		};
		store.subscribe(contain("hechizos programados", watchSpells, report));
		watchSpells(store.get());
		const timed = createTimedCommandsModule({
			api,
			win,
			logger,
			getSettings: () => store.get(),
			update: (mutate) => {
				store.update(mutate);
			},
			isDryRun: () => store.get().dryRun,
			isSafetyStopped: () => safety.stopped !== null,
			attackRate,
			claim: createTabClaims(`grepoHelper:timedClaims:${ctx.host}:${String(ctx.playerId)}`, {
				storage: localStorage,
				locks,
				tabId
			})
		});
		let timedKey = "";
		const watchTimed = (s) => {
			const { timedCommands } = store.get();
			const key = JSON.stringify([
				s.enabled,
				s.dryRun,
				timedCommands.enabled,
				timedCommands.items
			]);
			if (key === timedKey) return;
			timedKey = key;
			timed.check();
		};
		store.subscribe(contain("ataques cronometrados", watchTimed, report));
		watchTimed(store.get());
		const discord = createDiscordSender({
			fetch: (url, init) => window.fetch(url, init),
			logger
		});
		const alerts = createAlerts({
			win,
			api,
			send: (hook, text) => discord.send(hook, text),
			claim: createTabClaims(`grepoHelper:alertClaims:${ctx.host}:${String(ctx.playerId)}`, {
				storage: localStorage,
				locks,
				tabId
			}),
			settings: () => store.get(),
			world: ctx.world
		});
		logger.onLog((entry, options) => {
			alerts.onLog(entry, options);
		});
		window.setInterval(contain("alertas", () => alerts.check(), report), ALERTS_CHECK_MS);
		createPanel({
			store,
			safety,
			onError: report,
			subtitle: `${ctx.world} · ${ctx.playerId}`,
			onClearLog: (tab) => {
				logger.clear(tab);
			},
			farm: {
				status: () => farm.status(),
				subscribe: (listener) => farm.subscribe(listener),
				serverNow: () => api.serverNow(),
				collectNow: () => farm.collectNow(store.get())
			},
			towns: { list: () => ownTownIds(win).map((id) => ({
				id,
				name: townName(win, id)
			})) },
			research: {
				status: () => research.status(),
				subscribe: (listener) => research.subscribe(listener)
			},
			build: {
				status: () => build.status(),
				subscribe: (listener) => build.subscribe(listener)
			},
			recruit: {
				status: () => recruit.status(),
				subscribe: (listener) => recruit.subscribe(listener)
			},
			trade: {
				status: () => trade.status(),
				subscribe: (listener) => trade.subscribe(listener)
			},
			villageTrade: {
				status: () => villageTrade.status(),
				subscribe: (listener) => villageTrade.subscribe(listener)
			},
			villageExpansion: {
				status: () => villageExpansion.status(),
				subscribe: (listener) => villageExpansion.subscribe(listener)
			},
			spells: {
				status: () => spells.status(),
				subscribe: (listener) => spells.subscribe(listener),
				powers: () => powerList(win)
			},
			planner: createGroupPlanner({
				api,
				win,
				getSettings: () => store.get()
			}),
			timed: {
				status: () => timed.status(),
				subscribe: (listener) => timed.subscribe(listener),
				units: (townId) => townUnits(win, townId)
			},
			missions: {
				status: () => missions.status(),
				subscribe: (listener) => missions.subscribe(listener)
			},
			bandits: {
				status: () => bandits.status(),
				subscribe: (listener) => bandits.subscribe(listener)
			},
			hide: {
				status: () => hide.status(),
				subscribe: (listener) => hide.subscribe(listener)
			},
			heroes: {
				status: () => heroes.status(),
				subscribe: (listener) => heroes.subscribe(listener)
			},
			defense: {
				attacks: () => defense.attacks(),
				status: () => defense.status(),
				subscribe: (listener) => defense.subscribe(listener)
			},
			festivals: {
				status: () => festivals.status(),
				subscribe: (listener) => festivals.subscribe(listener)
			},
			cityFarm: {
				status: () => cityFarm.status(),
				subscribe: (listener) => cityFarm.subscribe(listener),
				townInfo: (townId) => cityFarm.townInfo(townId),
				lookup: (townId) => cityFarm.lookup(townId),
				island: (townId) => townIsland(win, townId),
				search: createTargetSearch({
					api,
					win,
					playerId: ctx.playerId,
					activity
				})
			},
			intel: {
				summary: () => intel.summary(),
				subscribe: (listener) => intel.subscribe(listener),
				refresh: () => intel.refresh(),
				ghosts: (radius) => intel.ghosts(radius),
				watch: {
					load: (params) => watched.load(params),
					findPlayer: (text) => watched.findPlayer(text)
				},
				monitor: {
					load: (params) => monitor.load(params),
					findAlliance: (text) => monitor.findAlliance(text),
					allianceName: (id) => monitor.allianceName(id)
				},
				alerts: { test: () => alerts.test() }
			},
			market: { preview: () => {
				const townId = readCurrentTownId(win);
				if (townId === null) return Promise.reject(new Error("no se sabe cuál es la ciudad actual"));
				return market.preview(townId, store.get());
			} },
			profiles: {
				townStatus: (townId, profile) => townProfileStatus(win, townId, profile),
				townLevels: (townId) => buildingLevels(win, townId),
				researchesDone: (townId) => researchesDone(win, townId),
				researchPoints: (id) => researchStatic(win, id)?.points ?? null,
				pointsPerLevel: () => researchPointsPerLevel(win),
				maxLevel: (building) => buildingMaxLevel(win, building),
				troopCounts: (townId) => townTroopCounts(win, townId),
				recruitPlan: (townId, profile) => townRecruitPlan(win, townId, profile),
				spellStatus: (townId, profile) => townRecruitSpells(win, townId, profile),
				researchStates: (townId, profile) => townResearchStates(win, townId, profile),
				researchAcademy: (id) => researchStatic(win, id)?.buildingDependencies.academy ?? null,
				currentTownId: () => readCurrentTownId(win)
			}
		});
		createSenateQueue({
			store,
			onError: report,
			currentTownId: () => readCurrentTownId(win),
			readState: (townId) => readBuildState(win, townId)
		});
		createScheduleBar({
			store,
			win,
			ownRequests,
			onError: report,
			currentTownId: () => readCurrentTownId(win)
		});
		scheduler.start();
		logger.info(`listo en ${ctx.world} (jugador ${ctx.playerId})`, { reason: store.get().dryRun ? "modo simulación: no se envían acciones" : "modo real" });
		window.grepoHelper = {
			api,
			store,
			scheduler,
			logger,
			safety,
			farm,
			research,
			build,
			recruit,
			trade,
			villageTrade,
			villageExpansion,
			bandits,
			missions,
			spells,
			timed,
			hide,
			heroes,
			festivals,
			defense,
			cityFarm
		};
	}
	main().catch((err) => {
		createErrorReporter(null)("arranque", err);
	});
})();
