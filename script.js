document.addEventListener('DOMContentLoaded', function () {
    function Category(name, documents) {
        const self = this;
        self.name = ko.observable(name);
        self.documents = ko.observableArray(documents);
        self.isVisible = ko.observable(true);
        self.toggleVisibility = function () {
            self.isVisible(!self.isVisible());
        };
        self.moveItem = function(item) {
            console.log("Перемещение элемента:", item);
        };
    }

    function ViewModel() {
        const self = this;

        self.categories = ko.observableArray([
            new Category('Обязательные для всех', ['Паспорт', 'ИНН', 'Item 3']),
            new Category('Обязательные для трудоустройства', ['Трудовой договор', 'Трудовой книга']),
            new Category('Специальные', ['Книжный', 'договор'])
        ]);

        self.drop = function (arg) {
            const itemToMove = arg.item;
            const newIndex = arg.targetIndex;
            if (arg.sourceParent === arg.targetParent) {
                arg.sourceParent.remove(itemToMove);
                arg.targetParent.splice(newIndex, 0, itemToMove);
            } else {
                const sourceCategory = ko.dataFor(arg.sourceParent);
                const targetCategory = ko.dataFor(arg.targetParent);
                sourceCategory.documents.remove(itemToMove);
                targetCategory.documents.splice(newIndex, 0, itemToMove);
            }
        };

        self.moveCategory = function(category, direction) {
            const index = self.categories.indexOf(category);
            const newIndex = index + direction;
            if (newIndex >= 0 && newIndex < self.categories().length) {
                const removedItem = self.categories.splice(index, 1)[0];
                self.categories.splice(newIndex, 0, removedItem);
            }
        };
    }

    ko.applyBindings(new ViewModel());
});
