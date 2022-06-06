---
sidebar_label: Auto Encoders
description: Encoder-Decoder
---

# Auto Encoders

Given an input

- Encode it into a compact representation.
- Then decode it, getting the original back.

Like a _deep learning_ method for **dimension reduction**.

- Unlike PCA or LDA, it can learn a highly non-linear representation.
- Like PCA, the compressed representation can be used to reconstruct the original signal.

:::caution

- We don't have the **interpretability** that PCA has.
- Cannot change the size of the compressed representation. For example, in PCA we can reconstruct the signal by just using the first few components. However, we are not allowed to do this unless we re-train the model.

:::

:::info

Typically seen as **unsupervised learning**

- No explicit ground truth signal or label.
- ⚒️Target label is the **same** as the input.

:::

## Applications

- DeepFake
- Noise deduction
- Image colorization

- As a way to pre-train a network. Let's say we're looking at an image classification problem, but don't have much labelled data. One thing we could do is construct an auto-encoder and train this. The take the encoder only, add a classification layer, and fine-tune this sub-network. If we did this, we would **not** have the bottleneck we have here, as our aim is no longer compression.

  - This sort of approach could also be done in a single network, using multi-task learning.

- To detect abnormalities. If we train our network to reconstruct normal samples, and then present with an abnormal sample, it should struggle to reconstruct it correctly. We can use the reconstruction error as a measure to detect when a sample is abnormal.

## Learning Objective

Because it tries to reconstruct the original signal. We can use the **mean squared error**.

$$

L_{recon} = \sum^N_i{(x_i - \hat{x}_i)^2}


$$

- $x_i$ is the input signal
- $\hat{x}_i$ is the reconstructed signal
- $N$ is the size of the signal

This can be seen as a many-to-many regression problem. Regress N outputs from N inputs.

## Python

Fashion MNIST example.

```python title="Load the MINIST data"
(x_train, _), (x_test, y_test) = fashion_mnist.load_data()

x_train = x_train.astype('float32') / 255.
x_test = x_test.astype('float32') / 255.
x_train = numpy.reshape(x_train, (len(x_train), 28, 28, 1))
x_test = numpy.reshape(x_test, (len(x_test), 28, 28, 1))
```

```python title="Build the network"
input_img = Input(shape=(28, 28, 1))

# encoder
x = Conv2D(16, (3, 3), activation='relu', padding='same')(input_img)
x = MaxPooling2D((2, 2), padding='same')(x)
x = Conv2D(8, (3, 3), activation='relu', padding='same')(x)
x = MaxPooling2D((2, 2), padding='same')(x)
x = Conv2D(4, (3, 3), activation='relu', padding='same')(x)

# compressed representation
encoded = MaxPooling2D((2, 2), padding='same', name='bottleneck')(x)
# at this point the representation is (4, 4, 4) i.e. 64-dimensional

# decoder
x = Conv2D(8, (3, 3), activation='relu', padding='same')(encoded)
x = UpSampling2D((2, 2))(x)
x = Conv2D(8, (3, 3), activation='relu', padding='same')(x)
x = UpSampling2D((2, 2))(x)
x = Conv2D(16, (3, 3), activation='relu')(x)
x = UpSampling2D((2, 2))(x)
decoded = Conv2D(1, (3, 3), activation='sigmoid', padding='same')(x)

autoencoder = Model(input_img, decoded)
autoencoder.compile(optimizer='adam', loss='mean_squared_error')
print(autoencoder.summary())
plot_model(autoencoder, show_shapes=True)
```

```python title="Train the network"
history = autoencoder.fit(x_train, x_train,
                epochs=25,
                batch_size=128,
                shuffle=True,
                validation_data=(x_test, x_test), verbose=False)
plot_history(history.history)
```
