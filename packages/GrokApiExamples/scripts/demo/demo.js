// table manipulation
demog = grok.testData('demog', 5000);
demog.columns.remove('sex');
foo = demog.columns.addNew('foo', 'int');
demog.rows.removeAt(1, 3);
demog.rows.insertAt(2, 2);
demog.rows.addNew([555, 'studyX', 'NYC', 32, 'Spider', 'Net', 180, 80, 666]);
demog.rows.addNew().subj = 999;

// alternative ways of setting values
foo.set(1, 777);
demog.set('age', 1, 44);
//demog.currentRow.age = 33;

// bit set
demog.selection.invert();
demog.selection.set(5, false);
demog.selection.findNext(0, false);

// views
view = grok.addTableView(demog);

// viewers
hist = view.addViewer('histogram');
hist.options({'valueColumnName': 'weight'});

// markup viewer
text = '# Summary generated by JavaScript';
function summary(col) { return `## ${col.name}\nType: ${col.type}\n\nMin: ${col.min}\n\nMax: ${col.max}\n\n`; }
grok.tables.forEach(t => text = text + '\n# ' + t.name + '\n\n' + t.columns.toList().map(summary).join('\n\n'));

markup = view.addViewer('markup');
markup.options({'content': text});

// events
demog.onCurrentRowChanged((_) => grok.balloon.info('current row changed'));
grok.onEvent('d4-current-view-changed', (_) => grok.balloon.info('view changed'));

// registering functions
grok.functions.register({
    signature: 'int jsTest()',
    run: () => 42
});

grok.functions.register({
    signature: 'String jsConcat(int foo, int bar)',
    run: (foo, bar) => `${foo}_${bar}`
});

grok.balloon.info('Script executed.');