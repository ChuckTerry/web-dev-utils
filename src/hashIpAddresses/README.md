```diff
! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !
-     DO NOT USE FOR ANY CRYPTOGRAPHIC PURPOSES - VERY INSECURE    -
! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !

 How it works:
   Extract A, B, C, D, a, b, c, and d from the IP strings:
       Server IP => A.B.C.D        Client IP => a.b.c.d

   Multiply to form matrix     Split into 4 "Inverted L" Sections
      [ Aa  Ab  Ac  Ad ]    -->    [ 1  1  3  4 ]
      | Ba  Bb  Bc  Bd |    -->    | 1  2  2  4 |
      | Ca  Cb  Cc  Cd |    -->    | 1  2  3  3 |
      [ Da  Db  Dc  Dd ]    -->    [ 4  2  3  4 ]

   For Each Section             Compute
        W  X                      (W + X) - (Y + Z) and
        Y  -                      Push the absolute value of
        Z  -                      the result into an array

   From that Array: [ O1, O2, O3, O4 ]
      Compute (O1 + O2) - (O3 + O4)
         Return the absolute value of the result

! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !
-     DO NOT USE FOR ANY CRYPTOGRAPHIC PURPOSES - VERY INSECURE    -
! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !
```
