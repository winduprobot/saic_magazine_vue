import data from './rawData.json';
import css from './styles.css';
import Vue from './node_modules/vue/dist/vue';
import VueProgressiveImage from './node_modules/vue-progressive-image/dist/vue-progressive-image';

Vue.use(VueProgressiveImage);

let rawData = data.people;

rawData.map((x) => x.filename = '/sites/default/files/custom_elements/magazFall2018/images/' + x.filename)

const ImageGrid = {
  name: 'image-grid',
  props: ['gridItems'],
  data() {
    return {
      featuredItem: false
    }
  },
  methods: {
    makeFeatured(index) {
      this.featuredItem = this.gridItems[index];
    },
    isActive(item) {
      if (item == this.featuredItem) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted: function() {
    if (this.gridItems.length > 0) {
      this.makeFeatured(0)
    }
  },
  template: `
  <div class="grid-container">
    <div class="grid-message">
      <p><em>Click an image below to view more</em></p>
    </div>
    <div class="image-grid">
      <div v-for="(item, index) in gridItems"
           v-on:click="makeFeatured(index)"
           class="grid-item"
           v-bind:class="{active: isActive(item)}"
           v-bind:style="{backgroundImage: 'url(' + item.filename + ')' }">
      </div>
    </div>
    <div class="grid-featured" v-show="featuredItem">
      <div class="featured-title">
        <h4>{{ featuredItem.name }}</h4>
        <p class="personal-title">{{ featuredItem.title }}</p>
        <div class="image-source"
             v-if="featuredItem.source">Photo: <span v-html="featuredItem.source"></span>
        </div>
      </div>
      <div v-html="featuredItem.text" class="featured-text"> </div>
    </div>
  </div>
  `
};

// 80-20 item
const LandscapeRow = {
  name: 'landscape-row',
  props: {
    item: Object,
  },
  template:`
  <div class="landscape-row">
    <div class="row-img">
      <progressive-img v-bind:src="item.filename" />
    </div>
    <div class="row-text">
      <div class="featured-title">
        <h4>{{item.name}}</h4>
        <p v-if="item.title"
        class="personal-title">
        {{item.title}}
        </p>
        <p class="quote-block" v-if="item.quote">{{item.quote}}</p>
        <div class="image-source"
             v-if="item.source">Photo: <span v-html="item.source"></span>
        </div>
      </div>
      <div class="featured-text">
        <div v-html="item.text"> </div>
      </div>
    </div>
  </div>
  `
}

// 50-50 item
const HalfHalfRow = {
  name: 'half-half-row',
  props: {
    item: Object,
    position: {
      type: String,
      default: 'left'
    }
  },
  template: `
  <div class="half-row">
    <div v-if="position != 'right'"
         class="row-img">
      <progressive-img v-bind:src="item.filename" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p class="personal-title">{{item.title}}</p>
      <p class="quote-block">{{item.quote}}</p>
      <div v-html="item.text"> </div>
      <div class="image-source"
         v-if="item.source">Photo: <span v-html="item.source"></span>
      </div>
    </div>
    <div v-if="position == 'right'"
         class="row-img">
      <progressive-img v-bind:src="item.filename" />
    </div>
  </div>
  `
}

// Portrait height row
const PortraitRow = {
  name: 'portrait-row',
  props: {
    item: Object,
    position: {
      type: String,
      default: 'left'
    }
  },
  template: `
  <div class="portrait-row">
    <div class="row-img">
      <progressive-img v-bind:src="item.filename" />
    </div>
    <div class="row-text">
      <h4>{{item.name}}</h4>
      <p v-if="item.title"
         class="personal-title">
         {{item.title}}
      </p>
      <p class="quote-block">{{item.quote}}</p>
      <div v-html="item.text"> </div>
      <div class="image-source"
           v-if="item.source">Photo: <span v-html="item.source"></span>
      </div>
    </div>
  </div>
  `
}

const SelectorRow = {
  name: 'selector-row',
  props: {
    item: Object,
    options: Array
  },
  data() {
    return {
      featuredItem: false
    }
  },
  methods: {
    makeFeatured(index) {
      this.featuredItem = this.options[index];
    },
    isActive(item) {
      if (item == this.featuredItem) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted: function() {
    if (this.options.length > 0) {
      this.makeFeatured(0)
    }
  },
  template: `
  <div class="selector-row">
    <div class="row-img">
      <progressive-img v-bind:src="item.filename" />
    </div>
    <div class="selector-list row-text">
      <h4>{{item.name}}</h4>
      <ul class="selector-list-options">
        <li v-for="(option, index) in options"
            v-on:click="makeFeatured(index)"
            v-bind:class="{active: isActive(option)}">
          {{option.label}}
        </li>
      </ul>
      <div class="image-source"
           v-if="item.source">Photo: <span v-html="item.source"></span>
      </div>
    </div>
    <div v-show="featuredItem"
         class="selector-selected">
      <h5>{{featuredItem.label}}</h5>
      <div v-html="featuredItem.detail"></div>
    </div>
  </div>
  `
}

const App = {
  name: 'app',
  props: ['rawData'],
  components: {
    ImageGrid,
    LandscapeRow,
    HalfHalfRow,
    PortraitRow,
    SelectorRow
  },
  computed: {
    firstGrid: function() {
      let gridItems = this.rawData.slice(3, 7);
      gridItems.push(rawData[8]);
      gridItems.push(rawData[9]);
      gridItems.push(rawData[11]);
      gridItems.push(rawData[12]);
      gridItems.push(rawData[13]);
      return gridItems;
    },
    secondGrid: function() {
      return this.rawData.slice(14, 23)
    },
    thirdGrid: function() {
      let gridItems = this.rawData.slice(26, 29)
      gridItems.push(rawData[30]);
      gridItems.push(rawData[31]);
      gridItems.push(rawData[32]);
      gridItems.push(rawData[33]);
      gridItems.push(rawData[34]);
      gridItems.push(rawData[35]);
      return gridItems;
    },
    fourthGrid: function() {
      return this.rawData.slice(38, 44);
    }
  },
  template: `
  <div>
    <landscape-row :item="rawData[0]" />
    <landscape-row :item="rawData[1]" />
    <half-half-row :item="rawData[2]" :position="'right'"/>
    <image-grid :gridItems="firstGrid" />
    <half-half-row :item="rawData[7]" :position="'right'"/>
    <landscape-row :item="rawData[10]" />
    <image-grid :gridItems="secondGrid" />
    <half-half-row :item="rawData[23]" />
    <half-half-row :item="rawData[24]" :position="'right'"/>
    <portrait-row :item="rawData[25]" />
    <landscape-row :item="rawData[29]" />
    <image-grid :gridItems="thirdGrid" />
    <landscape-row :item="rawData[36]" />
    <selector-row :item="rawData[37]" :options="rawData[37].options"/>
    <image-grid :gridItems="fourthGrid" />
    <half-half-row :item="rawData[44]" />
    <half-half-row :item="rawData[45]" :position="'right'"/>
  </div>`
}

new Vue({
  el: '#mag-app',
  components: {App},
  data() {
    return {
      rawData
    }
  },
  template: '<app :rawData="rawData"/>'
})