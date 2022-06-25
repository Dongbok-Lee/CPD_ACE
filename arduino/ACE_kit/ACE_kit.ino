
#include <SoftwareSerial.h> //시리얼통신 라이브러리 호출
#include "DHT.h"
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

#define BTSerial Serial1
#define DHTPIN 17  
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27 ,16,2);  
int sensor_pin[] = {30,25,24,38,33,26,34,22,42,27,29,36,23,37,41,39,28,32,35,31,40};

//int position_pin[] = {1,2,3,4};               //4자리 결정 핀
//int segment_pin[] = {5,6,7,8,9,10,11,12};
//int position_pin2[] = {14,15,16,17};               //4자리 결정 핀
//int segment_pin2[] = {46,47,48,49,50,51,52,53}; //세그먼트 제어 핀
//const int delayTime = 10;
//
//bool digitNum[10][8] = {
//  {0,0,0,0,0,0,1,1},  //0
//  {1,0,0,1,1,1,1,1},  //1
//  {0,0,1,0,0,1,0,1},  //2
//  {0,0,0,0,1,1,0,1},  //3
//  {1,0,0,1,1,0,0,1},  //4
//  {0,1,0,0,1,0,0,1},  //5
//  {0,1,0,0,0,0,0,1},  //6
//  {0,0,0,1,1,1,1,1},  //7
//  {0,0,0,0,0,0,0,1},  //8
//  {0,0,0,0,1,0,0,1},  //9
//};

bool sensor_status[21] = {0,};

int Humidity = 0; // 습도
int Temperature = 0; // 온도

void setup(){
  Serial.begin(9600);
  dht.begin();
  BTSerial.begin(9600);


  // Turn on the blacklight and print a message.
  lcd.init();
  lcd.clear();         
  lcd.backlight();      // Make sure backlight is on
  
  // Print a message on both lines of the LCD.

  
//  for(int i = 0; i < 4; i++) {
//   pinMode(position_pin[i], OUTPUT);
//   pinMode(position_pin2[i], OUTPUT);
//  }

//  //세그먼트 제어 핀 출력용으로 설정
//  for(int i = 0; i < 7; i++) {
//    pinMode(segment_pin[i], OUTPUT);
//    pinMode(segment_pin2[i], OUTPUT);
//  }

  for(int i = 0; i< 21; i++)
    pinMode(sensor_pin[i], INPUT);

  initStatus();
}

void loop(){
  
  showTmpAndHmd();
  chkStatus();
//  
//  show(position_pin,segment_pin,3,Temperature/10);               //세 번째 자리
//  show(position_pin2,segment_pin2,3,Humidity/10);               //세 번째 자리
//  delay(delayTime);         //0.005초 일시정지
//  show(position_pin,segment_pin,4,Temperature%10);                //네 번째 자리
//  show(position_pin2,segment_pin2,4,Humidity%10);                //네 번째 자리
//  delay(delayTime);               

  
//  while(BTSerial.available()){
//    byte data = BTSerial.read();
//    Serial.write(data);
//  }
//
//  while(Serial.available()){
//    byte data = Serial.read();
//    BTSerial.write(data);
//  }
}

void showTmpAndHmd(){
  int h = dht.readHumidity();
  int t = dht.readTemperature();
  
  if(Humidity != h || Temperature != t){
    Humidity = h;
    Temperature = t;

    Serial.print("Temperature =");
    Serial.println(Temperature);
    Serial.print("Humidity =");
    Serial.println(Humidity);

  lcd.setCursor(0,0);   //Set cursor to character 2 on line 0
  lcd.print("Temperature= ");
  lcd.print(Temperature);
  lcd.print("C");
  
  lcd.setCursor(2,1);   //Move cursor to character 2 on line 1
  lcd.print("Humidity= ");
  lcd.print(Humidity);
  lcd.print("%");
  }
}

void initStatus(){
  for(int i = 0; i < 21; i++){
    bool state = digitalRead(sensor_pin[i]);

    BTSerial.write(state);
    
    if(state!= sensor_status[i]){
      sensor_status[i] = state;
    }
  }
}

void chkStatus(){
  for(int i = 0; i < 21; i++){
    bool state = digitalRead(sensor_pin[i]);
    if(state!= sensor_status[i]){
      sensor_status[i] = state;
      Serial.print("sensor ");
      Serial.print(i+1);
      Serial.print("= ");
      Serial.println(state);

      String text = String(i) + "=" + String(state);
      delay(100);
      BTSerial.print(text);
    }
  }
}

//void show(int position_pins[],int segment_pins[], int position, int number) {
//  //4자리 중 원하는 자리 선택
//  for(int i = 0; i < 4; i++) {
//    if(i + 1 == position){
//      digitalWrite(position_pins[i], LOW);
//    } else {
//      digitalWrite(position_pins[i], HIGH);
//    }
//  }
//
//  for(int j=0;j<2;j++){
//    digitalWrite(segment_pins[j], !digitNum[number][j]);
//  }
//
//}
