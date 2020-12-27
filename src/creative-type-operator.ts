import * as Rx from 'rxjs/Rx'


function createTest() {
    const source = Rx.Observable.create(((observer: any) => {
        observer.next(1);
        observer.next(2);
        setTimeout(() => {
            observer.next(3);
        }, 1000)
    }))

    source.subscribe(
        {
            next(val: number) {
                console.log('A：' + val);
            }
        }
    );
    source.subscribe((val: number) => console.log('B：' + val));
}

function intervalTest() {
    const source = Rx.Observable.interval(1000);
    source.subscribe(v => console.log(v));
}

function ofTest() {
    const source = Rx.Observable.of(1, 2, 3);
    source.subscribe(v => console.log(v));
}

function repeatTest() {
    const source = Rx.Observable.of(1, 2, 3).repeat(3);
    source.subscribe(v => console.log(v));
}

function rangeTest() {
    const source = Rx.Observable.range(1, 4);
    source.subscribe(v => console.log(v));
}

function fromPromiseTest() {
    const source = Rx.Observable.fromPromise(fetch('http://localhost:3000'));
    source.subscribe(x => console.log(x), e => console.error(e));
}

// createTest();
// intervalTest();
// ofTest()
// repeatTest()
// rangeTest();
fromPromiseTest()