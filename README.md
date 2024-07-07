<h1 align="center" id="title">lucia-demo</h1>

<p align="center"><img src="https://socialify.git.ci/Boby900/lucia-demo/image?font=Jost&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Plus&amp;theme=Light" alt="project-image"></p>

<p id="description">A template for setting up Lucia with Next.js and Drizzle ORM</p>

<h2>🛠️ Installation Steps:</h2>

<p>1. clone the repo</p>

```
git clone URL
```

<p>2. change the path</p>

```
cd lucia-demo
```

<p>3. install the packages</p>

```
pnpm install | bun install | npm install
```

<p>4. add env variables from neon database</p>

```
DATABASE_URL
```

<p>5. apply the migrations</p>

```
npx drizzle-kit migrate
```

<p>6. run it locally</p>

```
pnpm run dev
```

<h2>🍰 Contribution Guidelines:</h2>

I'm hoping to keep this template as slim as possible and only add auth-related features. Some future things that might be nice to add in could be MFA sign out all devices etc. I'm open to contributions but please keep that core vision of "just auth related stuff" in mind.

<h2>🛡️ License:</h2>

This project is licensed under the MIT