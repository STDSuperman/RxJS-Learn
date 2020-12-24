import * as Rx from 'rxjs/Rx'

function filter(source: any, callback: Function) {
    return Rx.Observable.create(((observer: any) => {
        source.subscribe(
            (v: number) => callback(v) && observer.next(v),
            (err: any) => observer.error(err),
            (complete: any) => observer.complete(complete)
        );
    }))
}

function testFilter() {
    const source = Rx.Observable.interval(1000).take(3);
    filter(source, (value: any) => value < 2).subscribe((value: number) => console.log(value));
}

function filterPrototypeTest() {
    (<any>Rx.Observable).prototype.filter = function (callback: Function) {
        return Rx.Observable.create(((observer: any) => {
            this.subscribe(
                (v: number) => callback(v) && observer.next(v),
                (err: any) => observer.error(err),
                (complete: any) => observer.complete(complete)
            );
        }))
    }
    Rx.Observable.interval(1000).take(3).filter((value) => value < 2).subscribe((value) => console.log(value));
}

function staticFilterAdd() {
    (<any>Rx.Observable).myfilter5 = (source: any, callback: Function) => {
        return Rx.Observable.create(((observer: any) => {
            source.subscribe((v: number) => callback(v) && observer.next(v),
            (err: any) => observer.error(err),
            (complete: any) => observer.complete(complete)
            );
        }))
    }

    (<any>Rx.Observable)
    .myfilter5(Rx.Observable.interval(1000).take(3), (v: number) => v)
    .subscribe((v: number) => console.log(v));
}


// testFilter()
// filterPrototypeTest()
staticFilterAdd()