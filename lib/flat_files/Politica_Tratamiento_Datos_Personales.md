# Política de Tratamiento de Datos Personales y PCI-DSS

NovaPay actúa como procesador de pagos, lo que implica el manejo de Información de Identificación Personal (PII) y datos de tarjetas de crédito.

## 1. Cumplimiento PCI-DSS
NovaPay no almacena el PAN (Primary Account Number) completo ni el CVV de ninguna tarjeta procesada. Todos los datos sensibles se tokenizan en el frontend utilizando el iFrame seguro antes de tocar nuestros servidores en AWS. El incumplimiento de esta directriz por parte de cualquier desarrollador será causal de despido inmediato.

## 2. Residencia de los Datos
Por normativa local y acuerdos de servicio, todos los datos transaccionales de comercios centroamericanos deben residir en la región `us-east-1` de AWS. No está permitido replicar bases de datos de producción a otras regiones para análisis sin un proceso previo de anonimización o enmascaramiento de datos.

## 3. Derecho al Olvido
Si un usuario final solicita la eliminación de sus datos, el equipo de Soporte (CS) escalará un ticket a Base de Datos. Se eliminará la PII (nombres, correos, teléfonos), pero el registro de la transacción financiera (monto, fecha, ID de comercio) se mantendrá por 15 años para cumplir con la ley de prevención de lavado de dinero.
