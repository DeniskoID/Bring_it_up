export default class Difference {
  constructor(oldOfficer, newOfficer, items) {
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);
    this.oldItems = this.oldOfficer.querySelectorAll(items);
    this.newItems = this.newOfficer.querySelectorAll(items);
    this.oldCounter = 0;
    this.newCounter = 0;
  }

  handlePlusClick(counter, items) {
    if (counter !== items.length - 2) {
      items[counter].classList.add('animated', 'fadeIn');
      items[counter].style.display = 'flex';
      counter++;
    } else {
      items[counter].classList.add('animated', 'fadeIn');
      items[counter].style.display = 'flex';
      items[items.length - 1].remove();
    }
  }

  bindTriggers() {
    this.oldOfficer.querySelector('.plus').addEventListener('click', () => {
      this.handlePlusClick(this.oldCounter, this.oldItems);
      this.oldCounter++;
    });

    this.newOfficer.querySelector('.plus').addEventListener('click', () => {
      this.handlePlusClick(this.newCounter, this.newItems);
      this.newCounter++;
    });
  }

  hideItems() {
    const hideFunc = (item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
      }
    };

    this.oldItems.forEach(hideFunc);
    this.newItems.forEach(hideFunc);
  }

  init() {
    this.hideItems();
    this.bindTriggers();
  }
}
