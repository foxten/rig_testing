# Interactive Rig
Chicago Public Media's improved interactive data rig built with [Astro.js](https://docs.astro.build/en/getting-started/). 

- [Quick Start](#quick-start)
- [Development](#development)
- [Site Config](#site-config)
- [Features (Layouts and Components)](#features-layouts-and-components)
  - [Layouts](#layouts)
  - [Social Icons](#social-icons)
  - [Nav Routes (Optional)](#nav-routes-optional)
  - [Dynamic Image Component](#dynamic-image-component)
    - [Uploading Images](#uploading-images)
    - [Using the Component](#using-the-component)
  - [AutoComplete Form](#autocomplete-form)
  - [Line Chart](#line-chart)
  - [Newsletter Component](#newsletters)
- [Data Fetching](#data-fetching)
  - [1. Local JSON data](#1-local-json-data)
  - [2. API/HTTP Data](#2-apihttp-data)
  - [3. Connecting to the Brightspot API](#3-connecting-to-the-brightspot-api)
- [Baking Pages](#baking-pages)
- [Sample App](#sample-app)
- [ArchieML](#archie-ml)
- [Deployment](#deployment)
- [🚀 About Astro](#-about-astro)
  - [Test Your Work](#test-your-work)


# Quick Start
From Scratch
- Click the green "Use this template" button above.
- Alternatively: `npx degit wbez/data_rig my-project -m=git`
  - Note: `-m=git` is required due to this being a private repository

Pre-existing Project
- clone the repo

## Development

Astro is supported in many different IDE's so you can setup your enviornment of choice [here for editor setup](https://docs.astro.build/en/editor-setup/). This repo is configured for VS Code and uses astro's offical vs code extension for formatting.

1. Use Node 18+. Reccomend using a node version manager [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/#:~:text=Node%20Version%20Manager%20(NVM)%2C,using%20different%20versions%20of%20Node.)
```
nvm use 18
```
2. Install dependencies
```
npm i
```
3. Run the Application
```
npm run dev
```


## Site Config
Configure the core settings in the root level `config.js`. This is important for deploying to stage and production:
- org: wbez or suntimes
- enviornment: stage or prod
- s3 bucket key
- s3 bucket

`src/` directory is alias'd to `@/` for example: `../../components/something` becomes `@/components/something`

The code examples heavily use javascript's [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) as a shorthand for extracting data.

Site config is stored in `src/siteConfig.js`. This is where styles, meta data, gtm settings and more are stored. The rig tries to stay agnostic to suntimes vs wbez so this where those configurations are stored.
```js
import siteConfig from '@/utils/siteConfig'

const { styles } = siteConfig
```

This project utilizes the `<base>` tag and sets the root at the s3 key set from the `.env`. This allows relative routing for hyperlinks and relative paths for assets.
- When referring to a page, use "." as a prefix: ie `<a href="./some-page.html">Link</a>`

## Features (Layouts and Components)

### Layouts

Two basic layouts: 

- [BaseLayout](./src/layouts/BaseLayout.astro): Includes ferris integration, and options to add dynamic title, description and image for social shares.
- [StoryLayout](./src/layouts/StoryLayout.astro): Use for static or journalistic pieces. This component inherits from BaseLayout, so don't try to explictily nest the two. 

```js
---
import StoryLayout from '@/layouts/StoryLayout.astro'
---

<StoryLayout
  title={name}
  description={description}
  metaImg="https://picsum.photos/200/300"
>
[Your content goes here]
</StoryLayout>
```

### [Social Icons](./src/components/SocialIcons.astro) 
Include dynamic content and darkmode support.

### [Nav Routes](./src/data/routeData.js) (Optional)
To use:
  - Edit the `navRoutes` array in `./src/data/routeData.js`
  - If the array is empty, the secondary routes won't display
  - These are setup to be responsive and include a hamburger menu for mobile devices

### [Dynamic Image Component](./src/components/DynamicImage.astro)
We're using [AstroImageTools](https://astro-imagetools-docs.vercel.app/en/introduction) to generate responsive image sets for these projects. When deployed, the images are saved in the `_astro/` directory of the project. For more information about this library and its capabilities, view their documentation [here](https://astro-imagetools-docs.vercel.app/en/components/Img).
#### Uploading Images
- Add images to the `src/images/upload` folder and run `npm run imgs` to upload the images to the respective S3 bucket (`wbez-cdn` or `cdn.suntimes.com`). 
  - Note: Images should be smaller than 5MB. If an image is larger than this, you'll see a message in the console alerting you to this. We're operating under the assumption that the highest resolution version of the image is uploaded to AWS, so adjust the `maxSize` if your files absolutely *need* to be larger than 5MB. 
- Once the images are uploaded, the files are moved to the `src/images/archive` folder. Use the file name as the `id` when using the component. 

#### Using the Component

Import the component using the below syntax:

```js
---
import DynamicImage from "@/components/DynamicImage.astro";
---
<DynamicImage 
  imgProperties={{ 
    id: "partyppl.jpeg", 
    alt: "A DJ plays to the Silver Room Block Party crowd",
    width: 300,
    height: 200,
    aspectRatio: 1.333,
    breakpoints: [320, 520, 650],
    fit: "contain",
    kernel: "cubic",
  }}
/>
```
This component accepts a single object as a prop, and the following key value pairs as properties of the object:

- **(Required) ID:** The filename for the image. This should match the filename listed in the `src/images/archive` folder. 
- **(Required) Alt:** A string of alternate, descriptive text for the image. 
- **Width:** Width of the image. 
- **Height:** Height of the image. 
- **Aspect Ratio:** Number used to scale the image appropriately. Ignored if both width and height are provided. 
- **Breakpoints:** An array of widths used to generate image sets. The default widths are `[320, 520, 650, 845, 1080, 1300]`. If  you'd prefer to generate a set number of images for a specific range without strict widths, you can send an object instead. For example, `{ count: 4, minWidth: 320, maxWidth: 1300 }` will automatically generate four breakpoints and their four respective images.
- **Fit:** How you'd like the image to fit inside its container. Available options are `cover, contain, fill, inside, outside`.
- **Kernel:** A string describing the interpolation kernel to use when resizing/scaling the image. For a quick explainer on resizing algorithms, see [this article](https://en.wikipedia.org/wiki/Image_scaling). For more information about one of the specific options below, just click the appropriate link:
  - [`nearest`](https://en.wikipedia.org/wiki/Nearest-neighbor_interpolation) 
  - [`cubic`](https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline)
  - [`mitchell`](https://www.cs.utexas.edu/~fussell/courses/cs384g-fall2013/lectures/mitchell/Mitchell.pdf)
  - [`lanczos2`](https://en.wikipedia.org/wiki/Lanczos_resampling#Lanczos_kernel)
  - [`lanczos3`]() - See `lanczos2` link. Same kernel, but more precise.
  
Note: We'll most likely add a default configuration file for this tool once we have more data about the types of images we're using across projects. If you notice any patterns in your work, feel free to let us know so we can consider them when "finalizing" the configuration.

### [AutoComplete Form](./src/components/AutoComplete.astro)
To use, import the component into your file.

```js
---
import AutoComplete from '@/components/AutoComplete.astro';
---
<AutoCompleteForm placeholder="This is a form" options={providedOpts} />
```

The form accepts four props (two required, two optional).

 - **Placeholder:** The copy you'd like to populate the form before a user enters data.
 
 - **Options:** An array of results. As a user types, the array gets filtered and a button is generated for each matching result. Note: These 'buttons' are really links. With the data provided in the array, the form automatically creates a slug for each entry.* 

 - **(Optional) Override:** If you don't want to use the default behavior for the form, you can submit the override prop with a value of `true`. This will create actual buttons instead of links, and you'll need to add a callback function to the event handler (lines 32-35).

- **(Optional) Project Name:** The form automatically creates the links needed to navigate to a new page. If the links are being directed to a nested directory, use the `projectName` prop with the name of the subdirectory as its value. You'll get slugified links like this: `interactive.wbez.org/traffic-stops/${projectName}/slugified-title-goes-here`.
 
Please note: The form can be styled in the component's `style` tag. You'll notice that the `script` tag includes this line:
```
opt.className = `result ${this.className}`
```
This assigns the class name generated by astro to the individual result buttons. This is required. If the class name is missing, the buttons won't appear.


### [Line Chart](./src/components/charts/LineChart/LineChart.svelte)

This Svelte component combines four individual subcomponents into a single chart using [LayerCake](https://layercake.graphics/). For the time being, all of the potential props from the subcomponents aren't abstracted at the top level, but this can be adjusted in the future. There are a few comments listed in the subcomponents for styling guidance. 

```js
---
import LineChart from '@/components/charts/LineChart/LineChart.svelte';
---
  <LineChart 
    points={points}
    stroke="green" 
    fill="none"
    lineType="curved"
    client:only="svelte"
  />
```
The chart accepts four props.

- **Points**: An array of objects with the point coordinates. Each object contains an "x" and "y" value. See [points.json](./src/data/points.json) for an example.
- **Stroke**: The color of the line in your line chart. 
- **Fill**: The fill color for the area of your line chart. Set to "none" if you don't want any styling in this area. 
- **LineType**: This prop determines whether the line will be rounded or jagged. Accepts either "curved" or "straight".
- ***Note***: The `client:only="svelte"` property is required. If this line is missing, your chart won't appear. 

### [Newsletters](./src/components/AffordanceComponent.astro)

Component to flight newsletter signup forms. The newsletters are stored in `src/data/newsletters.ts`. The default newsletter is for Reset. The component takes a prop for swapping out a different newsletter (as long as the newsletter is present).
- reset
- politics
- education
- theGoods

ex:
```js
<AffordanceComponent newsletter="education" />
```


## Data Fetching
Offical docs - https://docs.astro.build/en/guides/data-fetching. These examples can be visualized in the [sample app](./src/pages/starwars/)


### 1. Local JSON data 
1. Create a directory in `src/content` that breifly describes your data collection -> `src/content/myAwesomeData`
2. Store a `.json` file of the data you wish to "bake" out or use in the newly created directory 
3. Register the data via the config file (`src/content/config.js`)
    - You can take advantage of typed schema or not in the config file
4. Utilize the helper `getLocalData.js` function to use your data throughout the app
```javascript
import getLocalData from "@/utils/getLocalData";

const starWars = await getLocalData("starWars") //name of the data collection's directory
const people = starWars
	.map((person) => ({
		...person,
		slug: slugify(person.name), //example of creating a slug from a title
	}));
```

### 2. API/HTTP Data

- HTTP calls to remote data are accessed via the fetch api and are processed at buildtime
    - You can use the [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) within astro's frontmatter. The frontmatter has built in async/await.

    - While this method will take longer to build and load during local development time, the end loading time is very quick.

```javascript
// planets.astro
---
// Example of data fetch from a remote source: -- compiles at build time
const homeworld = "https://swapi.dev/api/planets/1/";
const response = await fetch(homeworld);
const data = await response.json();
const { name, population } = data;
// Use the data below the frontmatter
---

<p>{ name } has { population } people</p>
```

### 3. Connecting to the Brightspot API

[Brightspot Rest API Docs](https://www.brightspot.com/documentation/rest-management-api)

- In most cases we want editors to control the content and copy of our pages. We can do this by connecting to Brightspot's API :tada:
    - We can access headlines, body content(received as raw HTML), SEO information, publish dates, authors, images, etc.

    - To do this we need to setup a local `.env` file. Simply fill out the `.env.sample`, reach out to the engineering team if you are unable to find the required  values.

    - To power a page or article, you will need the content id of the item in the Brightspot CMS. You can find this in the url of the entry you wish to retrieve.

    - Refer to `src/pages/brightspot-page.astro` for an example of an astro page powered by content from Brightspot's API

    - See below for an example of how to fetch data (where contentId is the ID of the CMS item you wish to fetch):

```javascript
const contentId = "0000017e-e9d8-d668-ad7e-fff8d8580000";
const data = await fetch(`${siteConfig.brightspotEndpoint}/${contentId}`, {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-Client-Id": siteConfig.brightspotClientId,
    "X-Client-Secret": siteConfig.brightspotClientSecret,
  }
}).then((response) =>
  response.json()
);
```

## Archie ML

[ArchieML Docs](http://archieml.org/)
- Create a Google Doc or Sheet
- Click Share -> Advanced -> Change... -> Anyone with this link
- In the address bar, grab the ID - eg. "...com/document/d/1IiA5a5iCjbjOYvZVgPcjGzMy5PyfCzpPF-LnQdCdFI0/edit"
paste in the ID above into google.config.js, and set the filepath to where you want the file saved
- If you want to do a Google Sheet, be sure to include the gid value in the url as well
- Running `npm run gdoc` at any point (even in new tab while server is running) will fetch the latest from all Docs and Sheets.

Example is used in the star wars app: `src/pages/starwars/archie.astro`

## Baking Pages
The best way to see how to bake pages is looking at the sample app included below. Follow the example and refer to astro's [docs on dynamic routing with static pages](https://docs.astro.build/en/core-concepts/routing/#static-ssg-mode). The key is to follow guides on static builds and stay away from server side render (SSR)

## Sample App
[Star Wars Dynamic Page](./src/pages/starwars/[slug].astro)

 The pages are under `src/pages/starwars/`
- Within this subdirectory is a landing page with links to all "baked" pages
- Dynamic pages that have been "baked" using local data from `src/content/starWars`

## 🚀 About Astro

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte components.

### Test Your Work
1. Run `npm run build && npm run preview`
  - This will show your compiled site that mimics the static behavior that the end user will experience.


## Deployment

Follow our [guide on deployments](deploy.md)
