import socket
import threading

# Create a socket object
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Define the host and port
host = 'localhost'
port = 3000

# Bind the socket to the host and port
server_socket.bind((host, port))

# Listen for incoming connections
server_socket.listen()

# Create a list to store connected clients
clients = []

# Function to handle client connections
def handle_client(client_socket, client_address):
    # Add the client to the clients list
    clients.append(client_socket)

    # Send a welcome message to the client
    client_socket.send(b'Welcome to the chat!\n')

    while True:
        try:
            # Receive data from the client
            data = client_socket.recv(1024)

            # Broadcast the received message to all connected clients
            for client in clients:
                if client != client_socket:
                    client.send(data)
        except:
            # Remove the client from the clients list if there's an error
            clients.remove(client_socket)
            client_socket.close()
            break

# Function to start the server and accept client connections
def start_server():
    print(f'Server started on {host}:{port}')

    while True:
        # Accept a client connection
        client_socket, client_address = server_socket.accept()

        # Create a new thread to handle the client connection
        client_thread = threading.Thread(target=handle_client, args=(client_socket, client_address))
        client_thread.start()

# Start the server
start_server()