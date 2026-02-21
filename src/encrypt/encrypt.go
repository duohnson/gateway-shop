package encrypt

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"io"
)
var TOKENS []string
func Generatekey()string{
	key:=make([]byte,32)
	rand.Read(key)
	return base64.StdEncoding.EncodeToString(key)
}
var KEY string=Generatekey()

func Encrypt(text string, keyBase64 string)(string,error){
	key,_:=base64.StdEncoding.DecodeString(keyBase64)
	
	block,err:=aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	gcm,err:=cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	nonce:=make([]byte,gcm.NonceSize())
	if _,err:=io.ReadFull(rand.Reader,nonce);err!=nil{
		return "",err
	}

	cryptertext:=gcm.Seal(nonce,nonce,[]byte(text),nil)
	return base64.StdEncoding.EncodeToString(cryptertext), nil

}

func Decrypt(encryptedText string, keyBase64 string)(string,error){
	key,_:=base64.StdEncoding.DecodeString(keyBase64)
	data,_:=base64.StdEncoding.DecodeString(encryptedText)

	block,err:=aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	gcm,err:=cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonceSize:=gcm.NonceSize()
	if len(data)< nonceSize{
		return "",errors.New("Texto ecryptado muy corto")
	}
	nonce,ciphertext:=data[:nonceSize],data[nonceSize:]
	plaintext,err:=gcm.Open(nil,nonce,ciphertext,nil)
	if err != nil {
		return "", err
	}
	return string(plaintext), nil
}
