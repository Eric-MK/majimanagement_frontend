<template>
  
    <nav>
      <ul>
        <li>
          <h1 class="text-2xl font-bold text-white"><span style="font-style: oblique;"><u>SpursMatchUp</u></span></h1>
        </li>
        <li class="centered">
          <router-link to="/adminpage" active-class="active-link">Reports</router-link>
        </li>
        <li class="centered">
          <router-link to="/tips" active-class="active-link">Tips</router-link>
        </li>
        <li class="centered">
          <router-link to="/contacts" active-class="active-link">Contacts</router-link>
        </li>
      </ul>
    </nav>
  
  </template>
  
  <style>
  nav {
    display: flex;
    justify-content: center; /* Centers the tabs */
    align-items: center; /* Vertically centers the items */
    background-color: #111827;
  }
  
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .centered {
    margin: 0 10px;
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .centered:hover {
    text-decoration: underline;
  }
  
  .active-link {
    background-color: rgb(0,0,139);
    padding: 10px;
    border-radius: 5px;
    
  }
  </style>
  