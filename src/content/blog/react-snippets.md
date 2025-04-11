---
title: "React snippets library"
description: "React snippets for reference"
pubDate: "Apr 11 2025"
updatedDate: "Apr 11 2025"
hide: false
tags:
  - React
  - Snippets
---

## Rendering component only in the client

```jsx
import { useState, useEffect } from "react";

export const useClientOnly = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export const ClientOnly = ({ children }) => {
  const hasMounted = useClientOnly();

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};
```

## Loading libraries only in the client

```jsx
const Lottie =
  typeof window === "undefined"
    ? () => <></>
    : dynamic(() => import("react-lottie"));
```

## A dumb component that activates the suspense boundary.

```jsx
let pokemon;
let pokemonPromise = fetchPokemon("pikachu").then(p => (pokemon = p));

function PokemonInfo() {
  if (!pokemon) {
    throw pokemonPromise;
  }
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  );
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <React.Suspense fallback={<div>Loading Pokemon...</div>}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  );
}
```

## A component that activates the suspense and error boundaries.

```jsx
function createResource(promise) {
  let status = "pending";
  let result = promise.then(
    resolved => {
      status = "success";
      result = resolved;
    },
    rejected => {
      status = "error";
      result = rejected;
    }
  );
  return {
    read() {
      if (status === "pending") throw result;
      if (status === "error") throw result;
      if (status === "success") return result;
      throw new Error("This should be impossible");
    },
  };
}

function createPokemonResource(pokemonName) {
  return createResource(fetchPokemon(pokemonName));
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");
  const [pokemonResource, setPokemonResource] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null);
      return;
    }
    setPokemonResource(createPokemonResource(pokemonName));
  }, [pokemonName]);

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          "Submit a pokemon"
        )}
      </div>
    </div>
  );
}
```

## A promise wrapper to use inside a component that must trigger suspense boundary

> a resource management system for React Suspense

```jsx
function createResource(promise) {
  let status = "pending";
  let result = promise.then(
    resolved => {
      status = "success";
      result = resolved;
    },
    rejected => {
      status = "error";
      result = rejected;
    }
  );
  return {
    read() {
      if (status === "pending") throw result;
      if (status === "error") throw result;
      if (status === "success") return result;
      throw new Error("This should be impossible");
    },
  };
}
```

## A component that triggers suspend boundaries using the use hook.

```jsx
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}



import { Suspense } from 'react';
import Albums from './Albums.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```
