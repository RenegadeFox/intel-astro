<template>
  <div class="autocomplete-wrapper">
    <input
      type="text"
      :value="textFieldValue"
      v-bind="$attrs"
      v-on="listeners"
      :class="classes"
      @input="textFieldValue = $event.target.value"
      @keyup.down="onMoveDown"
      @keyup.up="onMoveUp"
      @keyup.enter="setSelectedItem()"
      @focus="handleFocus($event.target.value)"
    />

    <img
      v-if="isLoading"
      class="loading-icon"
      src="@/assets/img/loading-small.svg"
      width="36px"
    />

    <ul v-show="isOpen" class="autocomplete-results" :class="resultsClass">
      <slot
        v-for="(item, uid) in results"
        name="results-item"
        :item="item"
        :isActive="currentlySelectedIndex === uid"
        :onSelect="setSelectedItem"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator"

@Component
export default class Autocomplete extends Vue {
  // List of items to search within
  @Prop() items!: Array<any>
  // If "items" is an Object, what property to search within
  @Prop({ default: "name" }) searchProp!: string
  // Whether or not the data is retrieve asyncronously
  @Prop({ default: false }) isAsync!: Boolean
  // Class for the results container
  @Prop() resultsClass!: String
  // Classes to add to the input field
  @Prop({ default: "text-field" }) classes!: string
  // Triggers when an item is clicked/selected
  @Prop() onSelect!: Function
  // Method to run when user types and parent uses async method
  @Prop() onChange!: Function

  currentlySelectedIndex: number = 0
  textFieldValue: String = ""
  isOpen: Boolean = false
  results: Array<String> = []
  isLoading: Boolean = false

  // Watch for the items Array to change (for async requests only)
  @Watch("items")
  onItemsUpdated(filteredResults: Array<any>) {
    // Only update the results if the data is retrieved asyncronously
    if (this.isAsync) {
      // Update the results
      this.results = filteredResults
      // Hide the loading indicator
      this.isLoading = false

      // Check if the results list is empty
      if (this.results.length > 0) {
        // Show the results list
        this.isOpen = true
      } else {
        // Otherwise, hide the results list
        this.isOpen = false
      }
    }
  }

  // Watch for the query text to change
  @Watch("textFieldValue")
  onTextFieldValueChanged(newQueryText: string, oldQueryText: string) {
    // Check if the query text is empty
    if (newQueryText === "") {
      // Hide the results list
      this.isOpen = false
      // Clear the results Array
      this.results = []
    } else if (newQueryText !== oldQueryText) {
      // Only update the results list if the query text value has changed

      // Check if the data is being retrieved asyncronously
      if (this.isAsync) {
        // Show the loading indicator
        this.isLoading = true

        // Let the parent component know that the user is typing, so it can fetch the results
        this.$emit("onChange", newQueryText)
      } else {
        // Otherwise, continue to filter the results

        // Show the results list
        this.isOpen = true

        // Filter the results based on the "queryText"
        this.results = this.getFilteredResults(
          newQueryText,
          this.items,
          this.searchProp
        )

        // Reset the currently selected item
        this.currentlySelectedIndex = 0
      }
    }
  }

  mounted(): void {
    document.addEventListener("click", this.handleClickOutside)
  }

  destroyed(): void {
    document.removeEventListener("click", this.handleClickOutside)
  }

  get currentlySelectedItem() {
    return this.results[this.currentlySelectedIndex]
  }

  get listeners() {
    return {
      // Return all native events placed on the component via the input element
      ...this.$listeners
    }
  }

  /**
   * Close the results list when user clicks outside the component
   * @param {MouseEvent} event - Mouse event Object
   */
  handleClickOutside(event: MouseEvent): void {
    // Check if the click was outside of the component
    if (!this.$el.contains(event.target as HTMLElement)) {
      // Hide the results list
      this.isOpen = false
      // Reset the currently selected index
      this.currentlySelectedIndex = 0
    }
  }

  /**
   * Show the results list (if any)
   */
  handleFocus(): void {
    // Check if the text field value is not empty
    if (this.textFieldValue !== "") {
      // Show the results list
      this.isOpen = true
    }
  }

  /**
   * Move the user's selection down one
   * @returns {void}
   */
  onMoveDown(): void {
    // Check if the currently selected item is the last in the list
    if (this.currentlySelectedIndex === this.results.length - 1) {
      // Set the currently selected index to the first item in the results Array
      this.currentlySelectedIndex = 0
    } else {
      // Otherwise, increment the currently selected index (move it down)
      this.currentlySelectedIndex++
    }
  }

  /**
   * Move the user's selection up one
   * @returns {void}
   */
  onMoveUp(): void {
    // Check if the currently selected item is the last item in the list
    if (this.currentlySelectedIndex === 0) {
      // Set the currently selected index to the first item in the results Array
      this.currentlySelectedIndex = this.results.length - 1
    } else {
      // Otherwise, decrement the currently selected index (move it up)
      this.currentlySelectedIndex--
    }
  }

  /**
   * Set the selected item in the results list
   * @param {any} item - The selected item
   * @returns {void}
   */
  setSelectedItem(item: any): void {
    const selectedItem: any = item || this.currentlySelectedItem

    // Hide the results list
    this.isOpen = false

    // Emit the "onSelect" method to the parent component
    this.$emit("onSelect", selectedItem)
  }

  /**
   * Filter the results based on the query text
   * @param {String} queryText - The text to filter by
   * @param {Array<any>} items - The starting Array to filter
   * @param {string} searchProp - The property on the items Object to search within
   * @returns {Array<any>} The filtered list
   */
  getFilteredResults(
    queryText: String,
    items: Array<any>,
    searchProp: string
  ): Array<any> {
    return items.filter((item) => {
      return item[searchProp].toLowerCase().includes(queryText.toLowerCase())
    })
  }
}
</script>

<style lang="scss" scoped>
/* Wrapper holding the text field and resutls */
.autocomplete-wrapper {
  position: relative;

  .loading-icon {
    position: absolute;
    right: 0px;
    top: 0px;
  }
}

/* List holding all the results */
.autocomplete-results {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  overflow: auto;
  width: 100%;
}
</style>
