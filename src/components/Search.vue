<template>
  <div id="search">
    <div class="search">
      <div class="search-input">
        <img src="./../assets/icon-search.png" alt="搜索">
        <form @submit.prevent="search(key)">
          <input type="text"
                 placeholder="搜索 歌曲/专辑/歌手"
                 v-model="key"
                 @focus="focus()">
        </form>
      </div>
      <div class="search-cancel"
           :class="{ 'search-cancel-show' : searchShow }"
           @touchend="searchCancel()"
           @click="searchCancel()">
        取消
      </div>
    </div>
    <div class="hotkey" v-if="searchRes==null&&searchShow">
      <ul>
        <li v-for="(item,index) in hotkey" @click="search(item.k)">
          <span class="hotkey-index">{{index+1}}</span>
          <span class="hotkey-k">{{item.k}}</span>
          <span class="hotkey-n">{{item.n | searchVol}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        key: '',
        hotkey: null,
        searchRes: null,
        searchShow: false
      }
    },
    methods: {
      search: function (key) {
        this.key = key
        this.$store.dispatch('search', key).then((response) => {
          this.searchRes = response.data.data
        })
      },
      focus: function () {
        this.searchShow = true
        this.$emit('searchshow')
      },
      searchCancel: function () {
        this.searchShow = false
        this.key = ''
        this.searchRes = null
        this.$emit('searchhide')
      }
    },
    filters: {
      searchVol: num => Math.round(num / 1000) / 10 + '万'
    },
    created: function () {
      if (localStorage.searchHistory) {
        this.searchHistory = JSON.parse(localStorage.searchHistory)
      }
      this.$store.dispatch('getHotKey').then((response) => {
        this.hotkey = response.data.data.hotkey.slice(0, 5)
      })
    }
  }
</script>

<style scoped>

  .search {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 1;
  }

  .search-input {
    width: 100%;
    background: #eee;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search-input img {
    height: 30px;
    width: 30px;
    display: inline-block;
    margin: 0 5px;
  }

  .search-input form,
  .search-input input {
    width: 100%;
    height: 100%;
    border: none;
    background: #eee;
    font-size: medium;
    flex-grow: 1;
    border-radius: 5px;
    outline: none;
  }

  .search-cancel {
    height: 40px;
    width: 0px;
    margin: 10px auto;
    line-height: 40px;
    overflow: hidden;
    transition: width 0.3s;
    cursor:pointer;
  }

  .search-cancel-show {
    width: 55px;
  }

  .hotkey {
    margin-top: 60px;
    margin-bottom: 50px;
    background: #eeeeee;
    display: flex;
    flex-direction: column;
  }

  .hotkey ul {
    list-style: none;
    background: #fff;
  }

  .hotkey ul li {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    cursor: pointer;
  }

  .hotkey ul li .hotkey-index {
    padding-right: 10px;
  }

  .hotkey ul li .hotkey-k {
    flex-grow: 1;
  }

  @media screen and (min-width: 68vh) {
    .search {
      width: 68vh;
    }
  }


</style>
