//входные данные, полученные любым способом
const input = [40,60,50];
const capacity = 100;


//функция пробует найти решение, в случае ошибки просит проверить данные
//входные параметры: массив, число
function raid(resources, capacity){
    try {
        //переменная summ - сумма элементов входного массива, массив result - в него будет собираться выходной массив, 
        //summParts - сумма элементов массива, разделённых на их НОД
        let summ=0;
        let summParts=0;
        let result = []
        

        //метод принимающий любое количество чисел и возвращающий их наибольший общий делитель
        let NOD = (...rest) => {
            for (var x = rest[0], i = 1; i < rest.length; i++) {
              var y = rest[i];
              while (x && y) {
                x > y ? x %= y : y %= x;
              }
              x += y;
            }
            return x;
          }

        
        //проход по входному массиву, сбор данных
        for(let i=0; i<resources.length; i++){
            summ+=resources[i];
            summParts+=resources[i] / NOD(...resources);
        }

        //в случае если грузоподъёмность больше суммы всех элементов массива => выходной массив равен входному
        if (capacity>=summ){
            return resources;
        }


        else {

            //в случае если нод равен единице (и грузоподъёмность меньше суммы всех элементов), 
            //то для входного набора чисел не найдётся пропорционального набора, сумма элементов которого меньше входного, 
            //поэтому набег армии ничего не принесёт
            if (NOD(...resources) === 1){


                for (let item of resources){
                    result.push('0');
                }
                return result;

            }


            //если же нод не равен единице, то все входные числа можно сократить (например, [50,60,70] => [5,6,7]), 
            //сложить получившиеся числа (5+6+7=18), и разделить грузоподъёмность на это число (допустим грузоподъёмность 100 / 18 = 5.555)
            //чтобы ответ вышел в целых числах, нужно 5.555 => 5 (полученное число 5 это multiplicator)
            //остаётся только [5,6,7] * 5 => [25,30,35]
            //так сохраняется пропорция и добыча максимально большая
            else{
    
                
                if (summParts > capacity){
                    for (let item of resources){
                        result.push('0');
                    }
                    return result;
                }
                else{
                    let mulltiplicator = Math.floor(capacity / summParts);
                    for (let item of resources){
                        result.push((item / NOD(...resources)) * mulltiplicator);
                    }
                    return result;
                }
            }
        } 
    }
    catch {
        return 'пожалуйста, проверьте введённые данные';
    }
}

console.log(raid(input,capacity));
