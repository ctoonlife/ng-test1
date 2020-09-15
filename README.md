# Test1

## ТЗ

1. Сделать форму с двумя слайдерами `discount` и `cashback` cо значениями от 0 до 100
2. Шаг discount = 1, шаг cashback = 0.1
3. Загрузить список максимальных значений для слайдера cashback из файла `cashback-percents.json` и данные организации из файла `org.json`
   1. до окончания загрузки данных вместо формы показывавть индикатор загрузки
   2. cashback-percents содержит список соответствий discount => cashback, что означает, что cashback не может быть больше заданного значения для соответствующего discount
4. Ограничить перемещения слайдеров по следующему алгоритму:
   1. минимальное допустимое значение discount взять из поля minDiscount данных организации, максимальное из массива cashback-percents
   2. минимальное допустимое значение cashback установить на 1, максимальное взять из массива cashback-percents
5. При перемещении слайдера discount проверять и корректировать cashback:
   1. в случае если cashback больше допустимого, устанавливать его на максимальное значение для выбранного discount
6. При перемещении слайдера cashback проверять и корректировать discount:
   1. в случае если cashback больше допустимого - устанавливать значение discount на минимально возможное для выбранного значения cashback


## Тестовая задача

1. Написать функции `changeDiscount` и `changeCashback` в компоненте `discount-percents`
   1. функции проверяют значения и реализуют ограничение перемещений слайдера
   2. при наличии изменений вызывают экшены `ChangeDiscount` и `ChangeCashback` соответственно
2. Написать обработчики экшенов `ChangeDiscount` и `ChangeCashback`
   1. обработчики должны реализовывавть логику корректировки значений cashback и discount


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
