import * as Rx from 'rxjs/Rx'

function debounceTimeTest() {
    const source = Rx.Observable.interval(1000).take(6);
    const result = source.debounceTime(1000);
    result.subscribe(x => console.log(x));
}

function throttleTimeTest() {
    const source = Rx.Observable.interval(1000).take(6);
    const result = source.throttleTime(2000);
    result.subscribe(x => console.log(x));
}

function distinctTest() {
    const source = Rx.Observable.from([1, 2, 3, 2, 4, 3]);
    const result = source.distinct();
    result.subscribe(x => console.log(x));
}

function skipTest() {
    const source = Rx.Observable.from([1, 2, 3, 2, 4, 3]);
    const result = source.skip(2);
    result.subscribe(x => console.log(x));
}

function combineLatestTest() {
    const source1 = Rx.Observable.interval(1000).take(3);
    const source2 = Rx.Observable.interval(2000).take(5);
    const result = source1.combineLatest(source2, (a, b) => a + b);
    result.subscribe(x => console.log(x));
}

function zipTest() {
    const source1 = Rx.Observable.interval(1000).take(3);
    const source2 = Rx.Observable.interval(2000).take(5);
    const result = source1.zip(source2, (a, b) => a + b);
    result.subscribe(x => console.log(x));
}

function startWidth() {
    const source = Rx.Observable.interval(1000).take(3);
    const result = source.startWith(666)
    result.subscribe(x => console.log(x));
}

function switchTest() {
    const btn = document.createElement('button');
    btn.innerText = '我要发言！'
    document.body.appendChild(btn);
    const source = Rx.Observable.fromEvent(btn, 'click');
    const source2 = source.map(x => Rx.Observable.interval(1000).take(3));
    const result = source2.switch();
    result.subscribe(x => console.log(x));
}

// debounceTimeTest();
// throttleTimeTest()
// distinctTest()
// skipTest()
// combineLatestTest()
// zipTest();
// startWidth()
switchTest()