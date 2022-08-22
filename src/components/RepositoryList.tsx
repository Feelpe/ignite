import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';
import '../styles/input.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [search, setSearch] = useState('');
  
  const filteredRepos = search.length > 0 
    ? repositories.filter(repository => repository.name.includes(search))
    : [];

  useEffect(() => {
    fetch('https://api.github.com/users/Feelpe/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [])

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <input
        type="search"
        placeholder="Encontre um Repositório"
        className="input-repos"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />

      <ul>
        {search.length > 0 ? (
          <>
            {filteredRepos.map(repository => {
              return <RepositoryItem key={repository.name} repository={repository} />
            })}
          </>
        ) : (
          <>
            {repositories.map(repository => {
              return <RepositoryItem key={repository.name} repository={repository} />
            })}
          </>
        )}
      </ul>
    </section>
  )
}