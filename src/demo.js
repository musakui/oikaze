export default /* html */ `
<div class="min-h-screen bg-background text-foreground font-sans">
	<header class="sticky top-0 z-50 bg-background/95 border-b border-border">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<h1 class="text-2xl sm:text-3xl font-bold text-foreground">oikaze</h1>
			<p class="text-muted-foreground mt-1 text-sm">
				Inspired by shadcn/ui design system
			</p>
		</div>
	</header>

	<main
		class="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-10"
	>
		<section
			class="bg-card rounded-lg border border-border p-6 hover:border-border/80 transition-colors"
		>
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Typography</h2>
				<p class="text-sm text-muted-foreground mt-1">Font sizes and styles</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="flex flex-col gap-3">
					<p class="text-xs text-muted-foreground">Extra Small Text (xs)</p>
					<p class="text-sm text-muted-foreground">Small (sm)</p>
					<p class="text-base text-foreground">Base (16px)</p>
					<p class="text-lg text-foreground">Large (18px)</p>
					<p class="text-xl font-semibold text-foreground">XL Semibold</p>
					<p class="text-2xl font-bold text-foreground">2XL Bold</p>
				</div>
				<div class="flex flex-col gap-3">
					<p class="italic text-muted-foreground">Italic style</p>
					<p class="font-medium text-foreground">Medium weight</p>
					<p class="font-semibold text-foreground">Semibold weight</p>
					<p class="uppercase text-sm tracking-wide text-muted-foreground">
						uppercase
					</p>
					<p class="capitalize text-muted-foreground">capitalized text</p>
					<p class="line-through text-muted-foreground">Strikethrough</p>
					<p class="underline decoration-wavy text-foreground">
						Wavy underline
					</p>
					<p class="uppercase tracking-wider text-muted-foreground">
						Uppercase with tracking
					</p>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Color Palette</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Primary brand colors and accents
				</p>
			</div>
			<div
				class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
			>
				<div
					class="rounded-md p-4 bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium"
				>
					Primary
				</div>
				<div
					class="rounded-md p-4 bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-medium"
				>
					Secondary
				</div>
				<div
					class="rounded-md p-4 bg-accent flex items-center justify-center text-accent-foreground text-xs font-medium"
				>
					Accent
				</div>
				<div
					class="rounded-md p-4 bg-destructive flex items-center justify-center text-destructive-foreground text-xs font-medium"
				>
					Destructive
				</div>
				<div
					class="rounded-md p-4 border border-border bg-card flex items-center justify-center text-foreground text-xs font-medium"
				>
					Card
				</div>
				<div
					class="rounded-md p-4 bg-muted flex items-center justify-center text-muted-foreground text-xs font-medium"
				>
					Muted
				</div>

				<div
					class="bg-red-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Red
				</div>
				<div
					class="bg-orange-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Orange
				</div>
				<div
					class="bg-amber-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Amber
				</div>
				<div
					class="bg-yellow-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Yellow
				</div>
				<div
					class="bg-lime-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Lime
				</div>
				<div
					class="bg-green-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Green
				</div>
				<div
					class="bg-emerald-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Emerald
				</div>
				<div
					class="bg-teal-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Teal
				</div>
				<div
					class="bg-cyan-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Cyan
				</div>
				<div
					class="bg-sky-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Sky
				</div>
				<div
					class="bg-blue-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Blue
				</div>
				<div
					class="bg-pink-500 text-white p-4 rounded-lg text-center font-medium"
				>
					Pink
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Components</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Interactive button examples
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<button
					class="h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
				>
					Primary
				</button>
				<button
					class="h-10 px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium text-sm hover:bg-secondary/80 transition-colors"
				>
					Secondary
				</button>
				<button
					class="h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-foreground rounded-md font-medium text-sm transition-colors"
				>
					Outline
				</button>
				<button
					class="h-10 px-4 py-2 hover:bg-accent text-accent-foreground rounded-md font-medium text-sm transition-colors"
				>
					Ghost
				</button>
				<button
					class="h-10 px-4 py-2 bg-destructive text-destructive-foreground rounded-md font-medium text-sm hover:bg-destructive/90 transition-colors"
				>
					Destructive
				</button>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Forms & Inputs</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Input fields and form controls
				</p>
			</div>
			<div class="flex flex-col gap-4 max-w-md">
				<div>
					<label class="text-sm font-medium text-foreground block mb-2"
						>Text input</label
					>
					<input
						type="text"
						placeholder="Type here..."
						class="w-full h-9 px-3 py-1 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
					/>
				</div>
				<div>
					<label class="text-sm font-medium text-foreground block mb-2"
						>Email input</label
					>
					<input
						type="email"
						placeholder="email@example.com"
						class="w-full h-9 px-3 py-1 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
					/>
				</div>
				<div class="flex items-center gap-2">
					<input
						type="checkbox"
						id="check"
						class="w-4 h-4 rounded-sm border border-primary"
					/>
					<label for="check" class="text-sm text-foreground"
						>Accept terms and conditions</label
					>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6 transform-gpu">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Cards & Layouts</h2>
				<p class="text-sm text-muted-foreground mt-1">Responsive grid system</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div
					class="rounded-lg border border-border bg-card p-6 hover:border-border/80 transition-colors"
				>
					<h3 class="font-semibold text-foreground">Card Title</h3>
					<p class="text-sm text-muted-foreground mt-2">
						Card description goes here with supporting text.
					</p>
				</div>
				<div
					class="rounded-lg border border-border bg-card p-6 hover:border-border/80 transition-colors"
				>
					<h3 class="font-semibold text-foreground">Card Title</h3>
					<p class="text-sm text-muted-foreground mt-2">
						Card description goes here with supporting text.
					</p>
				</div>
				<div
					class="rounded-lg border border-border bg-card p-6 hover:border-border/80 transition-colors"
				>
					<h3 class="font-semibold text-foreground">Card Title</h3>
					<p class="text-sm text-muted-foreground mt-2">
						Card description goes here with supporting text.
					</p>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Border Styles</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Rounded corners and border variations
				</p>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div
					class="p-4 border border-border rounded-md text-sm text-foreground"
				>
					Rounded Medium
				</div>
				<div
					class="p-4 border border-border rounded-lg text-sm text-foreground"
				>
					Rounded Large
				</div>
				<div
					class="p-4 border border-border rounded-full text-sm text-foreground text-center"
				>
					Rounded Full
				</div>
				<div
					class="p-4 border-2 border-border rounded-md text-sm text-foreground"
				>
					Border 2px
				</div>
				<div
					class="p-4 border-4 border-border rounded-md text-sm text-foreground"
				>
					Border 4px
				</div>
				<div
					class="p-4 border border-dashed border-border rounded-md text-sm text-foreground"
				>
					Dashed
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">
					States & Interactions
				</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Hover, focus, and disabled states
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<button
					class="h-9 px-4 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 active:scale-95 transition-all"
				>
					Active State
				</button>
				<button
					class="h-9 px-4 text-sm font-medium border border-input rounded-md hover:bg-accent text-foreground transition-colors"
					disabled
				>
					Disabled
				</button>
				<input
					type="text"
					placeholder="Focus state..."
					class="h-9 px-3 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
				/>
			</div>
			<div class="pt-3 flex flex-wrap gap-3">
				<button
					class="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
				>
					Hover Color
				</button>
				<button
					class="px-6 py-3 bg-green-500 text-white rounded-md hover:scale-110 transition-transform"
				>
					Hover Scale
				</button>
				<button
					class="px-6 py-3 bg-red-500 text-white rounded-md hover:shadow-lg transition-shadow"
				>
					Hover Shadow
				</button>
				<button
					class="px-6 py-3 bg-amber-500 text-white rounded-md transition-all"
				>
					Hover Effect
				</button>
				<button
					class="px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-all"
				>
					Hover Fill
				</button>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">
					Alerts & Notifications
				</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Info, success, warning, and error states
				</p>
			</div>
			<div class="flex flex-col gap-3">
				<div
					class="px-4 py-3 rounded-md bg-primary/10 border border-primary/30 text-sm text-foreground"
				>
					Info alert with subtle background and border
				</div>
				<div
					class="px-4 py-3 rounded-md bg-destructive/10 border border-destructive/30 text-sm text-foreground"
				>
					Error alert with destructive styling
				</div>
				<div
					class="px-4 py-3 rounded-md border border-border bg-muted text-sm text-foreground"
				>
					Default alert style
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Responsive Grid</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Adapts from mobile to desktop layout
				</p>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
				<div
					class="h-20 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-medium"
				>
					Col 1
				</div>
				<div
					class="h-20 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-medium"
				>
					Col 2
				</div>
				<div
					class="h-20 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-medium"
				>
					Col 3
				</div>
				<div
					class="h-20 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-medium"
				>
					Col 4
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Responsive Design</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Breakpoint-based styling
				</p>
			</div>
			<div class="flex flex-col gap-4">
				<div
					class="bg-red-500 sm:bg-yellow-500 md:bg-green-500 lg:bg-blue-500 xl:bg-pink-500 text-white p-6 rounded-lg text-center font-semibold"
				>
					<p>Red (mobile) → Yellow (sm) → Green (md) → Blue (lg) → Pink (xl)</p>
				</div>
				<div
					class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center font-semibold text-foreground"
				>
					Responsive Text Size
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<div class="bg-muted p-4 rounded-md text-center text-foreground">
						1 col
					</div>
					<div class="bg-muted p-4 rounded-md text-center text-foreground">
						2 cols sm+
					</div>
					<div class="bg-muted p-4 rounded-md text-center text-foreground">
						4 cols lg+
					</div>
					<div class="bg-muted p-4 rounded-md text-center text-foreground">
						4 cols lg+
					</div>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Data Table</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Structured data display
				</p>
			</div>
			<div class="border border-border rounded-md overflow-hidden">
				<table class="w-full text-sm">
					<thead class="border-b border-border bg-muted">
						<tr>
							<th class="text-left p-3 font-semibold">Name</th>
							<th class="text-left p-3 font-semibold">Status</th>
							<th class="text-left p-3 font-semibold">Date</th>
						</tr>
					</thead>
					<tbody>
						<tr
							class="border-b border-border hover:bg-muted/50 transition-colors"
						>
							<td class="p-3 text-foreground">Component Library</td>
							<td class="p-3 text-foreground">Active</td>
							<td class="p-3 text-muted-foreground">2024-01-15</td>
						</tr>
						<tr class="hover:bg-muted/50 transition-colors">
							<td class="p-3 text-foreground">Design System</td>
							<td class="p-3 text-foreground">Complete</td>
							<td class="p-3 text-muted-foreground">2024-01-14</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Spacing</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Padding and margin utilities
				</p>
			</div>
			<div class="flex flex-col gap-4">
				<div class="border-2 border-border bg-muted/30">
					<div class="p-2 bg-muted">Padding 2 (p-2)</div>
				</div>
				<div class="border-2 border-border bg-muted/30">
					<div class="p-4 bg-muted">Padding 4 (p-4)</div>
				</div>
				<div class="border-2 border-border bg-muted/30">
					<div class="p-8 bg-muted">Padding 8 (p-8)</div>
				</div>
				<div class="flex gap-2">
					<div class="px-4 py-2 bg-muted rounded-md text-foreground">
						px-4 py-2
					</div>
					<div class="px-6 py-3 bg-muted rounded-md text-foreground">
						px-6 py-3
					</div>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Flexbox</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Flexible layout utilities
				</p>
			</div>
			<div class="flex flex-col gap-6">
				<div class="flex justify-start gap-2 bg-muted p-4 rounded-md">
					<div class="bg-primary text-primary-foreground px-4 py-2 rounded-md">
						Item 1
					</div>
					<div class="bg-primary text-primary-foreground px-4 py-2 rounded-md">
						Item 2
					</div>
					<div class="bg-primary text-primary-foreground px-4 py-2 rounded-md">
						Item 3
					</div>
				</div>
				<div class="flex justify-center gap-2 bg-muted p-4 rounded-md">
					<div
						class="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
					>
						Centered
					</div>
					<div
						class="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
					>
						Items
					</div>
				</div>
				<div class="flex justify-between bg-muted p-4 rounded-md">
					<div class="bg-accent text-accent-foreground px-4 py-2 rounded-md">
						Start
					</div>
					<div class="bg-accent text-accent-foreground px-4 py-2 rounded-md">
						End
					</div>
				</div>
				<div class="flex items-center justify-center h-24 bg-muted rounded-md">
					<div class="bg-primary text-primary-foreground px-4 py-2 rounded-md">
						Centered Vertically
					</div>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Grid</h2>
				<p class="text-sm text-muted-foreground mt-1">CSS Grid layout system</p>
			</div>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<div class="bg-pink-500 text-white p-6 rounded-md text-center">1</div>
				<div class="bg-blue-500 text-white p-6 rounded-md text-center">2</div>
				<div class="bg-green-500 text-white p-6 rounded-md text-center">3</div>
				<div class="bg-orange-500 text-white p-6 rounded-md text-center">4</div>
				<div
					class="bg-red-500 text-white p-6 rounded-md text-center col-span-2"
				>
					5 (col-span-2)
				</div>
				<div class="bg-cyan-500 text-white p-6 rounded-md text-center">6</div>
				<div class="bg-amber-500 text-white p-6 rounded-md text-center">7</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Borders & Shadows</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Border styles and shadow utilities
				</p>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div
					class="p-6 border border-border rounded-md bg-card text-foreground"
				>
					border
				</div>
				<div
					class="p-6 border-2 border-border rounded-md bg-card text-foreground"
				>
					border-2
				</div>
				<div
					class="p-6 border-4 border-border rounded-md bg-card text-foreground"
				>
					border-4
				</div>
				<div
					class="p-6 border-2 border-dashed border-border rounded-md bg-card text-foreground"
				>
					dashed
				</div>
				<div
					class="p-6 border-2 border-dotted border-border rounded-md bg-card text-foreground"
				>
					dotted
				</div>
				<div
					class="p-6 bg-card shadow-sm border border-border rounded-md text-foreground"
				>
					shadow-sm
				</div>
				<div
					class="p-6 bg-card shadow-md rounded-md border border-border text-foreground"
				>
					shadow-md
				</div>
				<div
					class="p-6 bg-card shadow-lg rounded-md border border-border text-foreground"
				>
					shadow-lg
				</div>
				<div
					class="p-6 bg-card shadow-xl rounded-md border border-border text-foreground"
				>
					shadow-xl
				</div>
				<div
					class="p-6 bg-card shadow-2xl rounded-md border border-border text-foreground"
				>
					shadow-2xl
				</div>
				<div
					class="p-6 bg-card rounded-none border border-border text-foreground"
				>
					rounded-none
				</div>
				<div
					class="p-6 bg-card rounded-full border border-border text-center text-foreground"
				>
					rounded-full
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Forms</h2>
				<p class="text-sm text-muted-foreground mt-1">Form input elements</p>
			</div>
			<form class="flex flex-col gap-4 max-w-md">
				<div>
					<label class="block text-sm font-medium text-foreground mb-2"
						>Text Input</label
					>
					<input
						type="text"
						placeholder="Enter text"
						class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all placeholder:text-muted-foreground"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-foreground mb-2"
						>Email Input</label
					>
					<input
						type="email"
						placeholder="email@example.com"
						class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all placeholder:text-muted-foreground"
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-foreground mb-2"
						>Select</label
					>
					<select
						class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
					>
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-foreground mb-2"
						>Textarea</label
					>
					<textarea
						rows="4"
						placeholder="Enter message"
						class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all resize-none placeholder:text-muted-foreground"
					></textarea>
				</div>
				<div class="flex items-center gap-2">
					<input type="checkbox" class="w-4 h-4 rounded border-input" />
					<label class="text-sm text-foreground">Checkbox</label>
				</div>
				<div class="flex items-center gap-2">
					<input type="radio" name="radio" class="w-4 h-4 border-input" />
					<label class="text-sm text-foreground">Radio Option 1</label>
				</div>
				<div class="flex items-center gap-2">
					<input type="radio" name="radio" class="w-4 h-4 border-input" />
					<label class="text-sm text-foreground">Radio Option 2</label>
				</div>
			</form>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Opacity</h2>
				<p class="text-sm text-muted-foreground mt-1">Opacity utilities</p>
			</div>
			<div class="flex flex-wrap gap-4">
				<div
					class="bg-primary text-primary-foreground px-6 py-3 rounded-md opacity-100"
				>
					100%
				</div>
				<div
					class="bg-primary text-primary-foreground px-6 py-3 rounded-md opacity-75"
				>
					75%
				</div>
				<div
					class="bg-primary text-primary-foreground px-6 py-3 rounded-md opacity-50"
				>
					50%
				</div>
				<div
					class="bg-primary text-primary-foreground px-6 py-3 rounded-md opacity-25"
				>
					25%
				</div>
				<div
					class="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-100 opacity-50 transition-opacity"
				>
					Hover Me
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Position</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Absolute positioning utilities
				</p>
			</div>
			<div class="flex flex-col gap-8">
				<div class="relative h-32 bg-muted rounded-md border border-border">
					<div
						class="absolute top-0 left-0 bg-red-500 text-white px-3 py-1.5 rounded-sm text-sm"
					>
						top-left
					</div>
					<div
						class="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1.5 rounded-sm text-sm"
					>
						top-right
					</div>
					<div
						class="absolute bottom-0 left-0 bg-green-500 text-white px-3 py-1.5 rounded-sm text-sm"
					>
						bottom-left
					</div>
					<div
						class="absolute bottom-0 right-0 bg-amber-500 text-white px-3 py-1.5 rounded-sm text-sm"
					>
						bottom-right
					</div>
					<div class="absolute inset-0 flex items-center justify-center">
						<div
							class="bg-primary text-primary-foreground px-3 py-1.5 rounded-sm text-sm"
						>
							centered
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Z-Index</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Stacking order utilities
				</p>
			</div>
			<div class="relative h-48">
				<div
					class="absolute top-0 left-0 bg-red-500 text-white p-6 rounded-md z-0 w-32 h-32 flex items-center justify-center"
				>
					z-0
				</div>
				<div
					class="absolute top-8 left-8 bg-blue-500 text-white p-6 rounded-md z-10 w-32 h-32 flex items-center justify-center"
				>
					z-10
				</div>
				<div
					class="absolute top-16 left-16 bg-green-500 text-white p-6 rounded-md z-20 w-32 h-32 flex items-center justify-center"
				>
					z-20
				</div>
				<div
					class="absolute top-24 left-24 bg-amber-500 text-white p-6 rounded-md z-30 w-32 h-32 flex items-center justify-center"
				>
					z-30
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Dark Mode Support</h2>
				<p class="text-sm text-muted-foreground mt-1">
					Theme-aware color tokens
				</p>
			</div>
			<p class="text-muted-foreground mb-4">
				This section demonstrates dark mode utilities. Toggle your system dark
				mode to see the changes.
			</p>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="bg-muted p-4 rounded-md">
					<p class="text-foreground font-medium">Dark mode aware card</p>
				</div>
				<div class="bg-accent p-4 rounded-md">
					<p class="text-accent-foreground font-medium">Accent card</p>
				</div>
			</div>
		</section>

		<section class="bg-card rounded-lg border border-border p-6">
			<div class="mb-6">
				<h2 class="text-xl font-semibold text-foreground">Aspect Ratio</h2>
				<p class="text-sm text-muted-foreground mt-1">Maintain aspect ratios</p>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div
					class="aspect-square bg-pink-500 rounded-md flex items-center justify-center text-white font-semibold"
				>
					Square (1:1)
				</div>
				<div
					class="aspect-video bg-blue-500 rounded-md flex items-center justify-center text-white font-semibold"
				>
					Video (16:9)
				</div>
				<div
					class="aspect-4/3 bg-green-500 rounded-md flex items-center justify-center text-white font-semibold"
				>
					4:3
				</div>
			</div>
		</section>
	</main>
	<footer class="border-t border-border bg-card py-8 mt-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<p class="text-foreground font-medium">Component Library</p>
			<p class="text-muted-foreground text-sm mt-2">
				Built with shadcn/ui design principles
			</p>
		</div>
	</footer>
</div>
`
