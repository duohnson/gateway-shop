package globals

import "sync"

var (
	RegistredToken = make(map[string]bool)
	Mutex          sync.RWMutex
)
