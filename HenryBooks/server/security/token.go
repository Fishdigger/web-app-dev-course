package security

import (
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var signingKey = []byte("keyboard-cat")

func GetToken(user string) []byte {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	claims["user"] = user
	tokenString, _ := token.SignedString(signingKey)
	return []byte(tokenString)
}

func ValidateToken(tokenString string) bool {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		_, ok := t.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", t.Header["alg"])
		}
		return signingKey, nil
	})
	if err != nil {
		return false
	}

	_, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		return true
	}
	return false
}
