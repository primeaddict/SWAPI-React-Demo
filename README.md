
# Star Wars Universe 

Website that displays characters of Star Wars Universe using [swapi.dev](https://swapi.dev/) API

### Features

- Character list view
- Character details view
- Favourites view

# Star Wars Universe Demo

https://swapi-react-demo.vercel.app/



## Run Locally



Go to the project directory

```bash
  cd swapi-react-demo
  npm install / yarn
```

Start the Application

```bash
  npm run dev
  OR
  yarn dev
```


## Roadmap

- Implementation of cache mechanism.
- Maintain data in storage to reduce API calls.
- Implementation of SSR to reduce page load time and increase Performance.
- [Page Speed](https://pagespeed.web.dev/report?url=https%3A%2F%2Fswapi-react-demo.vercel.app%2F&form_factor=desktop) 



## Tech Stack

**Client:** React

**Store:** React Redux and Redux Saga


## FAQ

#### Maintain data in application?

User redux and redux saga to maintain data in application

#### Favourite stored in store?

Favourites are stored in local storage

#### Are Favourites editable?

Yes we can change the Name, Height, And Gender of any favourite character


#### Searching a character?

For now we can search only on the current page.
