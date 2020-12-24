import * as Rx from 'rxjs/Rx'

// // 外部产生新的事件
const myObservable = new Rx.Subject();

myObservable.subscribe((text: string) => {
    console.log(text);
});

myObservable.next('票练过')

// // 内部产生新的事件

const insideObservable = Rx.Observable.create((observable: any) => {
    observable.next('111')
    setTimeout(() => {
        observable.next('777')
    }, 3000)
})

insideObservable.subscribe((text: string) => console.log(text));




const input = document.createElement('input');
const btn = document.createElement('button');
btn.value = '提交'
document.body.appendChild(input);
document.body.appendChild(btn);

/** 数据过滤 */

Rx.Observable.fromEvent(input, 'input')
    .debounceTime(1000)
    .take(3)
    .map((item: InputEvent) => (<HTMLInputElement>item.target).value)
    .subscribe(value => console.log(value));


/** 有状态 */

Rx.Observable.fromEvent(btn, 'click')
    .scan((count: number) => count + 1, 1)
    .subscribe((val: number) => console.log(val))




// let observable = Rx.Observable.create(function subscribe(observer: any) {
//     observer.next(1)
//     observer.next(2)
// })
// observable.subscribe((v: number) => console.log(v, '---'))
// observable.subscribe((v: number) => console.log(v, '++++'))


let observable = Rx.Observable.create(function subscribe(observer: any) {
    observer.next(1)
    observer.next(2)
  })
  let subject = new Rx.Subject()
  subject.subscribe(v => console.log(v))
  subject.subscribe(v => console.log(v))
  observable.subscribe(subject)