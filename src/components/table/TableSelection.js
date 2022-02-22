export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.cleare();
        this.group.push($el);
        this.current = $el;
        $el.focus().addClass(TableSelection.className);
    }

    cleare() {
        this.group.forEach((el) => el.removeClass(TableSelection.className));
        this.group = [];
    }

    selectGroup($group = []) {
        this.cleare();

        this.group = $group;
        this.group.forEach(($el) => $el.addClass(TableSelection.className));
    }
}
