"use client";

import {
	Box,
	Button,
	Card,
	Grid,
	Image,
	Progress,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
);

interface Pokemon {
	name: string;
	url: string;
	image: string;
}

interface AnalysisResult {
	recommendations: {
		name: string;
		image: string;
		reason: string;
	}[];
	typeDistribution: {
		labels: string[];
		datasets: {
			data: number[];
			backgroundColor: string[];
		}[];
	};
	dominantType: string;
	balanceAdvice: string;
}

interface PokemonDetails {
	name: string;
	types: { type: { name: string } }[];
	sprites: {
		front_default: string;
	};
}

interface TypeDistribution {
	labels: string[];
	datasets: {
		data: number[];
		backgroundColor: string[];
	}[];
}

async function fetchPokemonDetails(name: string): Promise<PokemonDetails> {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
	);
	if (!response.ok) {
		throw new Error(`ポケモン ${name} の詳細情報の取得に失敗しました`);
	}
	return response.json();
}

async function analyzePreferences(
	selectedPokemon: string[],
): Promise<AnalysisResult> {
	const pokemonDetails = await Promise.all(
		selectedPokemon.map(fetchPokemonDetails),
	);

	// タイプの出現回数をカウント
	const typeCounts: { [key: string]: number } = {};
	for (const pokemon of pokemonDetails) {
		for (const typeInfo of pokemon.types) {
			const typeName = typeInfo.type.name;
			typeCounts[typeName] = (typeCounts[typeName] || 0) + 1;
		}
	}

	// タイプ分布データの作成
	const typeDistribution = {
		labels: Object.keys(typeCounts),
		datasets: [
			{
				data: Object.values(typeCounts),
				backgroundColor: Object.keys(typeCounts).map(
					() => `#${Math.floor(Math.random() * 16777215).toString(16)}`,
				),
			},
		],
	};

	// 最も多いタイプを特定
	const dominantType = Object.entries(typeCounts).reduce((a, b) =>
		a[1] > b[1] ? a : b,
	)[0];

	// バランスアドバイスの生成
	const uniqueTypes = Object.keys(typeCounts).length;
	let balanceAdvice = "";
	if (uniqueTypes <= 2) {
		balanceAdvice =
			"タイプの多様性を増やすことをお勧めします。異なるタイプのポケモンを選ぶと、より柔軟な戦略が立てられます。";
	} else if (uniqueTypes >= 5) {
		balanceAdvice =
			"多様なタイプのポケモンを選んでいますね。特定のタイプに特化することで、チームの一貫性が高まるかもしれません。";
	} else {
		balanceAdvice =
			"バランスの取れたタイプ構成です。さらに改善するには、各タイプの強みと弱みを考慮してチームを組んでみましょう。";
	}

	// おすすめポケモンの生成
	const allPokemon = await fetchRandomPokemon(20); // より多くのポケモンから選択
	const recommendations = await Promise.all(
		allPokemon
			.filter((pokemon) => !selectedPokemon.includes(pokemon.name))
			.sort(() => 0.5 - Math.random())
			.slice(0, 3)
			.map(async (pokemon) => {
				const details = await fetchPokemonDetails(pokemon.name);
				const reason = details.types.some((t) => t.type.name === dominantType)
					? `${dominantType}タイプとの相性が良いです。`
					: "タイプの多様性を高めます。";
				return {
					name: details.name,
					image: details.sprites.front_default,
					reason,
				};
			}),
	);

	return {
		recommendations,
		typeDistribution,
		dominantType,
		balanceAdvice,
	};
}

async function fetchRandomPokemon(count: number): Promise<Pokemon[]> {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
	if (!response.ok) {
		throw new Error("ポケモンデータの取得に失敗しました");
	}
	const data = await response.json();
	const shuffled = data.results.sort(() => 0.5 - Math.random());
	const selected = shuffled.slice(0, count);

	return Promise.all(
		selected.map(async (pokemon: Pokemon) => {
			const detailResponse = await fetch(pokemon.url);
			const detailData = await detailResponse.json();
			return {
				...pokemon,
				image: detailData.sprites.front_default,
			};
		}),
	);
}

function TypeDistributionCharts({
	typeDistribution,
}: { typeDistribution: TypeDistribution }) {
	const pieOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "right" as const,
			},
			title: {
				display: true,
				text: "タイプ分布（円グラフ）",
			},
		},
	};

	const barOptions = {
		indexAxis: "y" as const,
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: "right" as const,
			},
			title: {
				display: true,
				text: "タイプ分布（棒グラフ）",
			},
		},
	};

	const barData = {
		labels: typeDistribution.labels,
		datasets: [
			{
				label: "タイプ数",
				data: typeDistribution.datasets[0].data,
				backgroundColor: typeDistribution.datasets[0].backgroundColor,
			},
		],
	};

	return (
		<Box>
			<Grid>
				<Grid.Col span={6}>
					<Pie data={typeDistribution} options={pieOptions} />
				</Grid.Col>
				<Grid.Col span={6}>
					<Bar options={barOptions} data={barData} />
				</Grid.Col>
			</Grid>
		</Box>
	);
}

// type effectiveness data
const typeEffectiveness: { [key: string]: { [key: string]: number } } = {
	normal: { fighting: 2, ghost: 0 },
	fire: {
		water: 2,
		ground: 2,
		rock: 2,
		fire: 0.5,
		grass: 0.5,
		ice: 0.5,
		bug: 0.5,
		steel: 0.5,
		fairy: 0.5,
	},
	water: { electric: 2, grass: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
	electric: { ground: 2, electric: 0.5, flying: 0.5, steel: 0.5 },
	grass: {
		fire: 2,
		ice: 2,
		poison: 2,
		flying: 2,
		bug: 2,
		water: 0.5,
		electric: 0.5,
		grass: 0.5,
		ground: 0.5,
	},
	ice: { fire: 2, fighting: 2, rock: 2, steel: 2, ice: 0.5 },
	fighting: { flying: 2, psychic: 2, fairy: 2, bug: 0.5, rock: 0.5, dark: 0.5 },
	poison: { ground: 2, psychic: 2, poison: 0.5, grass: 0.5, fairy: 0.5 },
	ground: { water: 2, grass: 2, ice: 2, poison: 0.5, rock: 0.5 },
	flying: {
		electric: 2,
		ice: 2,
		rock: 2,
		grass: 0.5,
		fighting: 0.5,
		bug: 0.5,
		ground: 0,
	},
	psychic: { bug: 2, ghost: 2, dark: 2, fighting: 0.5, psychic: 0.5 },
	bug: { fire: 2, flying: 2, rock: 2, grass: 0.5, fighting: 0.5, ground: 0.5 },
	rock: {
		water: 2,
		grass: 2,
		fighting: 2,
		steel: 2,
		normal: 0.5,
		fire: 0.5,
		poison: 0.5,
		flying: 0.5,
	},
	ghost: { ghost: 2, dark: 2, normal: 0, fighting: 0, poison: 0.5, bug: 0.5 },
	dragon: {
		ice: 2,
		dragon: 2,
		fairy: 2,
		fire: 0.5,
		water: 0.5,
		electric: 0.5,
		grass: 0.5,
	},
	dark: { fighting: 2, bug: 2, fairy: 2, ghost: 0.5, dark: 0.5, psychic: 0 },
	steel: {
		fire: 2,
		fighting: 2,
		ground: 2,
		normal: 0.5,
		grass: 0.5,
		ice: 0.5,
		flying: 0.5,
		psychic: 0.5,
		bug: 0.5,
		rock: 0.5,
		dragon: 0.5,
		steel: 0.5,
		fairy: 0.5,
		poison: 0,
	},
	fairy: { poison: 2, steel: 2, fighting: 0.5, bug: 0.5, dark: 0.5, dragon: 0 },
};

function getTypeWeaknesses(type: string): string[] {
	return Object.entries(typeEffectiveness[type] || {})
		.filter(([_, effectiveness]) => effectiveness > 1)
		.map(([weakType]) => weakType);
}

function getTypeResistances(type: string): string[] {
	return Object.entries(typeEffectiveness[type] || {})
		.filter(([_, effectiveness]) => effectiveness < 1)
		.map(([resistType]) => resistType);
}

function getTypeImmunities(type: string): string[] {
	return Object.entries(typeEffectiveness[type] || {})
		.filter(([_, effectiveness]) => effectiveness === 0)
		.map(([immuneType]) => immuneType);
}

function TypeAnalysis({ dominantType }: { dominantType: string }) {
	const weaknesses = getTypeWeaknesses(dominantType);
	const resistances = getTypeResistances(dominantType);
	const immunities = getTypeImmunities(dominantType);

	return (
		<Box>
			<Text size="lg" mt="md">
				<strong>{dominantType}タイプ</strong>の特徴:
			</Text>
			<Text>
				弱点: {weaknesses.length > 0 ? weaknesses.join(", ") : "なし"}
			</Text>
			<Text>
				耐性: {resistances.length > 0 ? resistances.join(", ") : "なし"}
			</Text>
			{immunities.length > 0 && <Text>無効: {immunities.join(", ")}</Text>}
			<Text mt="md">
				{weaknesses.length > 0 &&
					`${weaknesses.join("、")}タイプの攻撃に注意が必要です。`}
				{resistances.length > 0 &&
					`${resistances.join("、")}タイプの攻撃に強いです。`}
				{immunities.length > 0 &&
					`${immunities.join("、")}タイプの攻撃を無効化できます。`}
			</Text>
			<Text mt="md">
				チーム構成のアドバイス:
				{weaknesses.length > 0
					? ` ${weaknesses.join("、")}タイプに強いポケモンを加えると良いでしょう。`
					: " 特に弱点がないため、バランスの取れたチーム構成が可能です。"}
				{resistances.length > 0 &&
					` ${resistances.join("、")}タイプの攻撃を活かせるポケモンと相性が良いです。`}
			</Text>
		</Box>
	);
}

export default function Page() {
	const [step, setStep] = useState<number>(0);
	const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);
	const [currentOptions, setCurrentOptions] = useState<Pokemon[]>([]);
	const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
		null,
	);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchRandomPokemon(4).then(setCurrentOptions);
	}, []);

	const handleSelectPokemon = async (pokemon: string) => {
		const newSelectedPokemon = [...selectedPokemon, pokemon];
		setSelectedPokemon(newSelectedPokemon);

		if (step < 4) {
			setLoading(true);
			const newOptions = await fetchRandomPokemon(4);
			setCurrentOptions(newOptions);
			setStep(step + 1);
			setLoading(false);
		} else {
			setLoading(true);
			const result = await analyzePreferences(newSelectedPokemon);
			setAnalysisResult(result);
			setStep(5); // 明示的に最終ステップに移動
			setLoading(false);
		}
	};

	const handleRestart = () => {
		setStep(0);
		setSelectedPokemon([]);
		setAnalysisResult(null);
		fetchRandomPokemon(4).then(setCurrentOptions);
	};

	const renderPokemonOptions = () => (
		<Grid>
			{currentOptions.map((pokemon, index) => (
				<Grid.Col span={3} key={index}>
					<Card shadow="sm" padding="lg" radius="md" withBorder>
						<Card.Section>
							<Image src={pokemon.image} height={160} alt={pokemon.name} />
						</Card.Section>
						<Text fw={500} size="lg" mt="md">
							{pokemon.name}
						</Text>
						<Button
							fullWidth
							mt="md"
							onClick={() => handleSelectPokemon(pokemon.name)}
						>
							選択
						</Button>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	);

	const renderAnalysisResult = () => (
		<Box>
			<Title order={3}>分析結果</Title>
			{analysisResult?.dominantType && (
				<Stack>
					<Text size="lg" mt="md">
						最も多いタイプ: <strong>{analysisResult.dominantType}</strong>
					</Text>
					<TypeAnalysis dominantType={analysisResult.dominantType} />
				</Stack>
			)}
			<Text size="lg" mt="md">
				{analysisResult?.balanceAdvice}
			</Text>

			<Title order={3} mt="xl">
				選択したポケモン
			</Title>
			<Grid>
				{selectedPokemon.map((pokemon, index) => (
					<Grid.Col span={3} key={index}>
						<Card shadow="sm" padding="sm" radius="md" withBorder>
							<Text fw={500}>{pokemon}</Text>
						</Card>
					</Grid.Col>
				))}
			</Grid>

			<Title order={3} mt="xl">
				タイプ分布(時間なくて３Dできませんでした。。。)
			</Title>
			<Box
				style={{
					width: "100%",
					marginTop: "2rem",
				}}
			>
				{analysisResult?.typeDistribution && (
					<TypeDistributionCharts
						typeDistribution={analysisResult.typeDistribution}
					/>
				)}
			</Box>

			<Title order={3} mt="xl">
				あなたにおすすめのポケモン
			</Title>
			<Grid>
				{analysisResult?.recommendations.map((pokemon, index) => (
					<Grid.Col span={4} key={index}>
						<Card shadow="sm" padding="lg" radius="md" withBorder>
							<Card.Section>
								<Image src={pokemon.image} height={160} alt={pokemon.name} />
							</Card.Section>
							<Text fw={500} size="lg" mt="md">
								{pokemon.name}
							</Text>
							<Text size="sm" c="dimmed" mt="xs">
								おすすめ理由: {pokemon.reason}
							</Text>
						</Card>
					</Grid.Col>
				))}
			</Grid>

			<Button onClick={handleRestart} mt="xl" fullWidth>
				最初から始める
			</Button>
		</Box>
	);

	return (
		<Stack gap="xl">
			<Title order={1} mb="md">
				ポケモンタイプ診断？のぽちぽちできるものを作ってみた。。
			</Title>
			<Title order={2} mb="md">
				ポケモン選択 {step < 5 ? `(ステップ ${step + 1}/5)` : "(結果)"}
			</Title>
			<Progress value={(step / 5) * 100} mb="md" />
			{loading ? (
				<Text>読み込み中...</Text>
			) : step < 5 ? (
				<>
					<Text>あなたが好きなポケモンを選択してください。</Text>
					{renderPokemonOptions()}
				</>
			) : (
				renderAnalysisResult()
			)}
		</Stack>
	);
}
