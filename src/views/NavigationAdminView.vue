<template>
  
    <nav>
      <ul>
        <li>
          <h1 class="text-2xl font-bold text-white"><span style="font-style: oblique;"><u>MajiManagement<sub>admin</sub></u></span></h1>
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
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  li {
    float: left;
  }

  li h1 {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 20px;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 18px;
  }

  li a:hover:not(.active-link) {
    background-color: #111;
  }

  .active-link {
    background-color: #4CAF50;
  }

  .centered {
    text-align: center;
  }
</style>

  