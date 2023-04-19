# fiscal-code
fiscal code generator


![1](https://user-images.githubusercontent.com/105516638/233194421-456a8022-f33b-4f8f-ae73-b616c0a218b0.PNG)


The laws covering the calculation of a fiscal code were put in place by the Ministry of Economy and Finances on December 23, 1976.

For natural persons, the fiscal code is made of 16 alphanumeric characters; for legal persons (e.g. corporations) it comprises 11 numeric-only characters. While it is possible to calculate one's tax code, the only official tax code is the one provided by the tax office, which avoids cases of identical tax codes (which is a frequent case for people not born in Italy, as in this case the 4-characters town code in the codice fiscale is replaced by "Z" followed by a 3-digit country code) as well as cases where a code is incorrect, but still valid (because provided by the tax office).

The algorithm that follows is used to generate natural persons' fiscal codes.

Surname (3 letters)
the first three consonants of the surname are used. If there is more than one surname, both are considered as if they were one. If the surname has less than three consonants, then vowels will replace the blank spaces, in the same order they appear in the surname (e.g. "Rossi" would be RSS, "Masi" would be MSA). If the whole surname has less than three letters, the blank spaces are replaced with an X (e.g. "Fo" would be FOX, "Hu" would be HUX). The surname used is always the name that appears in the person's primary identification document: for native Italians, this is the carta d'identità (identity card).
It is important to note that in Italy women do not 'officially' change their surnames when they marry: therefore, a woman does not require a new fiscal code (or identity card, or passport) if she already has one at the time of her marriage. However, when a woman obtains a fiscal code after she is married (generally, this applies only to foreigners born outside Italy) then the surname that appears in her primary identification document (usually, her passport) must be used to produce the fiscal code: in many cases, this will be the surname of her husband.[2]
First name (3 letters)
the first three consonants of the name are used. If there is more than one name, both are considered as if they were one. If the name has less than three consonants, then vowels will replace the blank spaces, in the same order they appear in the name (e.g. "Marco" would be MRC, "Paola" would be PLA). If the whole name has less than three letters, the blank spaces are filled with an X (e.g. Chinese name "Na" would be NAX). Some indian immigrants in Italy are registered with a triple X instead of their first name, since their passport only indicates a single word which is used as a surname by the Italian register office. If the name has more than three consonants, the 2nd is skipped (e.g. "Riccardo" would be RCR; "Martina" would be MTN). This second-consonant skipping rule for names that have more than three consonants is only used for first names, not for surnames.
Birthdate and gender (5 alphanumeric characters)
Year of birth (two digits): the last two year of birth digits are used (e.g. "1972" would be 72);
Month of birth (one letter): each single month is associated with one letter, as shown in the table:
Letter	Month	Letter	Month	Letter	Month
A	January	E	May	P	September
B	February	H	June	R	October
C	March	L	July	S	November
D	April	M	August	T	December
Birthday and gender (2 digits): the two birthday digits are used (from 01 to 31); if the person is a woman, 40 is added (e.g. 01 would be 41, 31 would be 71).
Town of birth (4 alphanumeric characters)[3]
the so called Belfiore code is used as codice catastale (registry code), which comprises one letter, then three digits. Each single Italian town (comune) has its own code, which is mostly determined by alphabetical order (e.g. Abano Terme in the province of Padua, the 1st Italian comune in alphabetical order, has the code A001). People born in a foreign country have their own code according to the country of birth, all of them beginning with letter Z (e.g. United States code is Z404, the UK code is Z114, Australia is Z700, etc.). For the complete list of the Italian towns' registry codes, see here; for the complete list of foreign countries' registry codes see here.
Check character (one letter)
Starting from the preceding 15 characters, a check digit is determined as follows:
the eight odd characters (1st, 3rd, 5th, etc.) are set apart; same thing for the seven even ones (2nd, 4th, 6th, etc.).
after that, each single character is converted into a numeric value as shown in the tables below:
ODD CHARACTERS
Character	Value	Character	Value	Character	Value	Character	Value
0	1	9	21	I	19	R	8
1	0	A	1	J	21	S	12
2	5	B	0	K	2	T	14
3	7	C	5	L	4	U	16
4	9	D	7	M	18	V	10
5	13	E	9	N	20	W	22
6	15	F	13	O	11	X	25
7	17	G	15	P	3	Y	24
8	19	H	17	Q	6	Z	23
EVEN CHARACTERS
Character	Value	Character	Value	Character	Value	Character	Value
0	0	9	9	I	8	R	17
1	1	A	0	J	9	S	18
2	2	B	1	K	10	T	19
3	3	C	2	L	11	U	20
4	4	D	3	M	12	V	21
5	5	E	4	N	13	W	22
6	6	F	5	O	14	X	23
7	7	G	6	P	15	Y	24
8	8	H	7	Q	16	Z	25
after that, all of the values are to be added up, and the final result has to be divided by 26; the remainder (Modulo) will give the last character, according to the following table:
REMAINDER
Remainder	Letter	Remainder	Letter	Remainder	Letter	Remainder	Letter
0	A	7	H	14	O	21	V
1	B	8	I	15	P	22	W
2	C	9	J	16	Q	23	X
3	D	10	K	17	R	24	Y
4	E	11	L	18	S	25	Z
5	F	12	M	19	T		
6	G	13	N	20	U		

Should two people yield the same code, the fiscal administration replaces some of the numeric digits (starting from the rightmost one) with letters, based on this table:
Digit	Letter	Digit	Letter	Digit	Letter
0	L	4	Q	8	U
1	M	5	R	9	V
2	N	6	S		
3	P	7	T		
After such replacement is applied, the check digit is to be recalculated.
