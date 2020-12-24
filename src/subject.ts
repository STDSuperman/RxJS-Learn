import * as Rx from 'rxjs/Rx'

function  unicast() {
    const source = Rx.Observable.interval(1000).take(3);

    source.subscribe((value: number) => console.log('A ' + value))

    setTimeout(() => {
        source.subscribe((value: number) => console.log('B ' + value))
    }, 1000)
}

function multicast() {
    const source = Rx.Observable.interval(1000).take(3);

    const subject: any = {
        observers: [],
        subscribe(target: any) {
            this.observers.push(target);
        },
        next: function(value: any) {
            this.observers.forEach((next: any) => next(value))
        }
    }

    source.subscribe(subject);

    subject.subscribe((value: number) => console.log('A ' + value))

    setTimeout(() => {
        subject.subscribe((value: number) => console.log('B ' + value))
    }, 1000)
}

function hotObservableTest() {
    const source = Rx.Observable.interval(1000).take(3).publish();
    source.subscribe((value: number) => console.log('A：' + value));
    setTimeout(() => {
        source.subscribe((value: number) => console.log('B：' + value));
    }, 3000);
    source.connect();
}

function warmObservableTest() {
    const source = Rx.Observable.interval(1000).take(3).publish().refCount();
    setTimeout(() => {
        source.subscribe(data => { console.log("A：" + data) });
        setTimeout(() => {
            source.subscribe(data => { console.log("B：" + data) });
        }, 1000);
    }, 2000);
}

function subjectTest() {
    const subject = new Rx.Subject();

    subject.subscribe((value: number) => console.log('A：' + value))

    subject.next(1);
    subject.next(2);

    setTimeout(() => {
        subject.subscribe((value: number) => console.log('B：' + value))
    }, 1000)
}

function behaviorSubjectTest() {
    const subject = new Rx.BehaviorSubject(0);

    subject.subscribe((value: number) => console.log('A：' + value))

    subject.next(0);
    subject.next(1);
    subject.next(2);

    setTimeout(() => {
        subject.subscribe((value: number) => console.log('B：' + value))
    }, 1000)
}

function replaySubjectTest() {
    const subject = new Rx.ReplaySubject(2);

    subject.next(1);
    subject.next(2);

    subject.subscribe((value: number) => console.log('A：' + value))

    subject.next(3);
    subject.next(4);

    setTimeout(() => {
        subject.subscribe((value: number) => console.log('B：' + value))
    }, 1000)
}

function asyncSubjectTest() {
    const subject = new Rx.AsyncSubject();
    subject.next(1);
    subject.subscribe(res => {
        console.log('A:' + res);
    });
    subject.next(2);
    subject.subscribe(res => {
        console.log('B:' + res);
    });
    subject.next(3);
    subject.subscribe(res => {
        console.log('C:' + res);
    });
    subject.complete();
    subject.next(4);
}

function schedulerToAsync() {
    const source = Rx.Observable.create(function (observer: any) {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    });

    console.log('订阅前');
    source.observeOn(Rx.Scheduler.async) // 设为 async
    .subscribe({
        next: (value: number) => { console.log(value); },
        error: (err: any) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    console.log('订阅后');
}

// unicast()
// multicast()
// subjectTest();
// behaviorSubjectTest()
// replaySubjectTest()
// asyncSubjectTest()
// hotObservableTest()
// warmObservableTest()
schedulerToAsync()