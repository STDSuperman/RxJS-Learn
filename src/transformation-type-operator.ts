import * as Rx from 'rxjs/Rx'

function bufferTest() {
    const btn = document.createElement('button');
    btn.innerText = '你点我啊！'
    document.body.appendChild(btn);
    const click = Rx.Observable.fromEvent(btn, 'click');
    const interval = Rx.Observable.interval(1000);
    const source = interval.buffer(click);
    source.subscribe(x => console.log(x));
}

function concatMergeTest() {
    const source = Rx.Observable.interval(3000);
    const result = source.concatMap(val => Rx.Observable.interval(1000).take(2));
    result.subscribe(x => console.log(x));

}

function mapTest() {
    const source = Rx.Observable.interval(1000).take(3);
    const result = source.map(x => x * 2);
    result.subscribe(x => console.log(x));
}

function mapToTest() {
    const source = Rx.Observable.interval(1000).take(3);
    const result = source.mapTo(666);
    result.subscribe(x => console.log(x));
}

function mergeMapTest() {
    const source = Rx.Observable.interval(1000).take(3);
    const result = source.mergeMap(x => x % 2 === 0 ? Rx.Observable.interval(2000).take(2) : Rx.Observable.empty());
    result.subscribe(x => console.log(x));
}

function pluckTest() {
    const source = Rx.Observable.of({name: '张三'}, {name: '李四'});
    const result = source.pluck('name');
    result.subscribe(x => console.log(x));
}

function scanTest() {
    const source = Rx.Observable.interval(1000).take(4);
    const result = source.scan((acc, cur) => acc + cur, 0);
    result.subscribe(x => console.log(x));
}

function concatAllTest() {
    const source1 = Rx.Observable.of(1, 2);
    const source2 = source1.map(x => Rx.Observable.interval(1000).take(3));
    const result = source2.concatAll();
    result.subscribe(x => console.log(x));
}

function switchMapTest() {
    const btn = document.createElement('button');
    btn.innerText = '我要发言！'
    document.body.appendChild(btn);
    const source = Rx.Observable.fromEvent(btn, 'click');
    const result = source.switchMap(x => Rx.Observable.interval(1000).take(3));
    result.subscribe(x => console.log(x));
}
// bufferTest();
// concatMergeTest()
// mapTest();
// mapToTest()
// mergeMapTest()
// pluckTest()
// scanTest()
// concatAllTest();
switchMapTest()